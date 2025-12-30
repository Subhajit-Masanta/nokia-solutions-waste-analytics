import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Snackbar, Alert, CircularProgress
} from '@mui/material';
import {
  Wifi, Storage, Refresh, Power, LockOpen, CheckCircle
} from '@mui/icons-material';

export default function RPiPanel() {
  const [auth, setAuth] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ssid, setSsid] = useState('WasteNetwork');
  const [wifiPassword, setWifiPassword] = useState('');
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

  const handleRestart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Raspberry Pi restarting...', 'info');
    }, 1500);
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
      <h2 style={styles.title}>Raspberry Pi Settings</h2>
      <p style={styles.description}>Configure network settings and system parameters for Raspberry Pi.</p>

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

      {/* WiFi SSID */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Wifi style={{ color: '#2563eb', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>WiFi SSID</h4>
            <p style={styles.desc}>Network name for WiFi connection.</p>
          </div>
        </div>
        <TextField
          size="small"
          value={ssid}
          disabled={!auth}
          onChange={(e) => setSsid(e.target.value)}
          style={{ width: '180px' }}
        />
      </div>

      {/* WiFi Password */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Wifi style={{ color: '#64748b', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>WiFi Password</h4>
            <p style={styles.desc}>Password for WiFi network authentication.</p>
          </div>
        </div>
        <TextField
          size="small"
          type="password"
          value={wifiPassword}
          disabled={!auth}
          onChange={(e) => setWifiPassword(e.target.value)}
          placeholder="Enter password"
          style={{ width: '180px' }}
        />
      </div>

      {/* Storage Path */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Storage style={{ color: '#64748b', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Storage Path</h4>
            <p style={styles.desc}>Local directory for data and logs.</p>
          </div>
        </div>
        <TextField
          size="small" value="/home/pi/waste_data"
          disabled={!auth}
          style={{ width: '200px' }}
        />
      </div>

      {/* Restart RPi */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Power style={{ color: '#dc2626', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Restart System</h4>
            <p style={styles.desc}>Reboot the Raspberry Pi to apply changes.</p>
          </div>
        </div>
        <Button
          variant="outlined"
          color="error"
          disabled={!auth || loading}
          onClick={handleRestart}
          startIcon={<Refresh />}
          style={{ minWidth: '130px' }}
        >
          {loading ? <CircularProgress size={20} /> : 'Restart'}
        </Button>
      </div>

      {/* Apply Settings */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle style={{ color: '#16a34a', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Apply Settings</h4>
            <p style={styles.desc}>Save and apply Raspberry Pi configuration.</p>
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
