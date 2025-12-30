import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, Snackbar, Alert, CircularProgress
} from '@mui/material';
import {
  Scale, Thermostat, Public, Memory, SettingsInputComponent, LockOpen
} from '@mui/icons-material';

export default function GeneralStatusPanel() {
  const [auth, setAuth] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleLogin = () => {
    if (username === 'kaka' && password === 'nokia') {
      setAuth(true);
      setLoginOpen(false);
      setError('');
      showToast('Authentication successful', 'success');
    } else {
      setError('Invalid credentials');
      showToast('Authentication failed', 'error');
    }
  };

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const handleTare = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Tare completed successfully');
    }, 1500);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={styles.title}>General Diagnostics</h2>
      <p style={styles.description}>Perform tare and check system signals and live stats here.</p>

      {/* Manual Tare */}
      <div style={styles.row(true)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Scale style={{ color: '#2563eb', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Manual Tare</h4>
            <p style={styles.desc}>Reset baseline weight manually.</p>
          </div>
        </div>
        <Button
          variant="contained"
          onClick={handleTare}
          disabled={loading}
          style={{ ...styles.bigButton, minWidth: '140px' }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'TARE NOW'}
        </Button>
      </div>

      {/* IP Address */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Public style={{ color: '#64748b', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>IP Address</h4>
            <p style={styles.desc}>Network IP for this Raspberry Pi node.</p>
          </div>
        </div>
        <input disabled={!auth} value="192.168.1.40" style={styles.inputField} />
      </div>

      {/* Raw ADC */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <SettingsInputComponent style={{ color: '#64748b', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Raw ADC Value</h4>
            <p style={styles.desc}>Direct readout from HX711.</p>
          </div>
        </div>
        <input disabled={!auth} value="834290" style={styles.inputField} />
      </div>

      {/* Weight */}
      <div style={styles.row(true)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Scale style={{ color: '#16a34a', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Current Weight</h4>
            <p style={styles.desc}>Live processed reading from load cell.</p>
          </div>
        </div>
        <input disabled value="3.27 kg" style={styles.inputField} />
      </div>

      {/* System Temperature */}
      <div style={styles.row(true)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Thermostat style={{ color: '#dc2626', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>System Temperature</h4>
            <p style={styles.desc}>Live core temp of RPi in °C.</p>
          </div>
        </div>
        <input disabled value="52.6 °C" style={styles.inputField} />
      </div>

      {/* Memory Usage */}
      <div style={styles.row(true)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Memory style={{ color: '#7c3aed', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Memory Usage</h4>
            <p style={styles.desc}>Used / Total memory on Pi.</p>
          </div>
        </div>
        <input disabled value="435MB / 1GB" style={styles.inputField} />
      </div>

      {/* Unlock Button */}
      {!auth && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<LockOpen />}
          onClick={() => setLoginOpen(true)}
          style={{ marginTop: '20px' }}
        >
          Unlock Protected Fields
        </Button>
      )}

      {/* Auth Dialog */}
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
        <DialogTitle>Authentication Required</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth label="Username" margin="dense"
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth type="password" label="Password" margin="dense"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const styles = {
  title: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#102e63',
    marginBottom: '12px'
  },
  description: {
    fontSize: '1rem',
    color: '#475569',
    marginBottom: '24px'
  },
  row: (enabled) => ({
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: '18px',
    borderRadius: '12px',
    opacity: enabled ? 1 : 0.5,
    pointerEvents: enabled ? 'auto' : 'none',
    minHeight: '90px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease'
  }),
  label: {
    margin: 0,
    fontSize: '1.05rem',
    color: '#0f172a',
    fontWeight: 600
  },
  desc: {
    margin: 0,
    fontSize: '0.9rem',
    color: '#64748b',
    marginTop: '2px'
  },
  inputField: {
    width: '160px',
    fontSize: '1rem',
    padding: '8px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    background: '#ffffff',
    color: '#1e293b',
    fontWeight: 500
  },
  bigButton: {
    padding: '10px 24px',
    fontSize: '0.95rem',
    fontWeight: 600,
    backgroundColor: '#102e63',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};
