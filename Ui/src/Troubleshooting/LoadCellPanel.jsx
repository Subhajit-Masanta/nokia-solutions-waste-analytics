import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Snackbar, Alert, CircularProgress
} from '@mui/material';
import {
  Scale, Straighten, Functions, LockOpen, CheckCircle
} from '@mui/icons-material';

export default function LoadCellPanel() {
  const [auth, setAuth] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [calibrationFactor, setCalibrationFactor] = useState('2280');
  const [offset, setOffset] = useState('8388608');
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

  const handleCalibrate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Calibration completed successfully');
    }, 2000);
  };

  const handleApply = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Settings applied successfully');
    }, 1500);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={styles.title}>Load Cell Settings</h2>
      <p style={styles.description}>Configure load cell calibration factors and offset values.</p>

      {!auth && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<LockOpen />}
          onClick={() => setLoginOpen(true)}
          style={{ marginBottom: '20px' }}
        >
          Unlock Settings
        </Button>
      )}

      {/* Calibration Factor */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Functions style={{ color: '#2563eb', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Calibration Factor</h4>
            <p style={styles.desc}>Weight multiplier from ADC raw to grams.</p>
          </div>
        </div>
        <TextField
          size="small"
          value={calibrationFactor}
          disabled={!auth}
          onChange={(e) => setCalibrationFactor(e.target.value)}
          style={{ width: '140px' }}
        />
      </div>

      {/* Offset Value */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Straighten style={{ color: '#64748b', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Offset Value</h4>
            <p style={styles.desc}>ADC reading when no load is applied.</p>
          </div>
        </div>
        <TextField
          size="small"
          value={offset}
          disabled={!auth}
          onChange={(e) => setOffset(e.target.value)}
          style={{ width: '140px' }}
        />
      </div>

      {/* Max Capacity */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Scale style={{ color: '#64748b', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Max Capacity</h4>
            <p style={styles.desc}>Maximum weight the load cell can measure.</p>
          </div>
        </div>
        <TextField
          size="small"
          value="50"
          disabled={!auth}
          style={{ width: '120px' }}
          InputProps={{ endAdornment: <span style={{ marginLeft: '4px', fontSize: '0.9rem' }}>kg</span> }}
        />
      </div>

      {/* Calibrate */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Scale style={{ color: '#f59e0b', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Run Calibration</h4>
            <p style={styles.desc}>Perform automatic calibration with known weight.</p>
          </div>
        </div>
        <Button
          variant="outlined"
          color="warning"
          disabled={!auth || loading}
          onClick={handleCalibrate}
          style={{ minWidth: '140px' }}
        >
          {loading ? <CircularProgress size={20} /> : 'Calibrate'}
        </Button>
      </div>

      {/* Apply Settings */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle style={{ color: '#16a34a', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Apply Settings</h4>
            <p style={styles.desc}>Save and apply load cell configuration.</p>
          </div>
        </div>
        <Button
          variant="contained"
          color="success"
          disabled={!auth || loading}
          onClick={handleApply}
          style={{ minWidth: '120px' }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Apply'}
        </Button>
      </div>

      {/* Auth Dialog */}
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
        <DialogTitle>Authenticate</DialogTitle>
        <DialogContent>
          <TextField autoFocus label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginTop: '10px' }} />
          <TextField type="password" label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginTop: '10px' }} />
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginOpen(false)}>Cancel</Button>
          <Button onClick={handleLogin} variant="contained">Login</Button>
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
    marginBottom: '8px'
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
  }
};
