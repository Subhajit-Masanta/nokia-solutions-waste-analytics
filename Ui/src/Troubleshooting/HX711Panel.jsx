import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Switch, FormControlLabel, Snackbar, Alert, CircularProgress
} from '@mui/material';
import {
  Settings, ToggleOn, Tune, Timer, LockOpen, CheckCircle
} from '@mui/icons-material';

export default function HX711Panel() {
  const [auth, setAuth] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [adcRaw, setAdcRaw] = useState(false);
  const [autoTare, setAutoTare] = useState(false);
  const [tareDelay, setTareDelay] = useState('3000');
  const [tareDelta, setTareDelta] = useState('200');
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

  const handleClean = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('HX711 cleaned successfully');
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
      <h2 style={styles.title}>HX711 Settings</h2>
      <p style={styles.description}>Configure HX711 amplifier settings and calibration parameters.</p>

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

      {/* Clean HX711 */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Settings style={{ color: '#f59e0b', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Clean HX711</h4>
            <p style={styles.desc}>Reset and clear HX711 data buffer and noise offset.</p>
          </div>
        </div>
        <Button
          variant="outlined"
          color="warning"
          disabled={!auth || loading}
          onClick={handleClean}
          style={{ minWidth: '100px' }}
        >
          {loading ? <CircularProgress size={20} /> : 'Clean'}
        </Button>
      </div>

      {/* Toggle ADC Raw */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ToggleOn style={{ color: '#64748b', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Toggle ADC Raw</h4>
            <p style={styles.desc}>Display the unprocessed ADC output for debugging.</p>
          </div>
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={adcRaw}
              onChange={() => setAdcRaw(!adcRaw)}
              color="primary"
              disabled={!auth}
            />
          }
          label={adcRaw ? "Enabled" : "Disabled"}
        />
      </div>

      {/* Gain Factor */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Tune style={{ color: '#64748b', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Gain Factor</h4>
            <p style={styles.desc}>Amplifier gain applied to ADC (e.g. 32/64/128).</p>
          </div>
        </div>
        <TextField size="small" value="128" disabled={!auth} style={{ width: '100px' }} />
      </div>

      {/* Stabilization Delay */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Timer style={{ color: '#64748b', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Stabilization Delay</h4>
            <p style={styles.desc}>Pause after tare or reset (in ms).</p>
          </div>
        </div>
        <TextField
          size="small"
          value="500"
          disabled={!auth}
          style={{ width: '120px' }}
          InputProps={{ endAdornment: <span style={{ marginLeft: '4px', fontSize: '0.9rem' }}>ms</span> }}
        />
      </div>

      {/* Auto-Tare Config Block */}
      <div style={styles.sectionHeader}>Auto-Tare Configuration</div>
      <div style={styles.configPanel(auth)}>
        <FormControlLabel
          control={
            <Switch
              checked={autoTare}
              onChange={() => setAutoTare(!autoTare)}
              color="primary"
              disabled={!auth}
            />
          }
          label="Enable Auto-Tare"
          style={{ marginBottom: '16px' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <div>
            <label style={styles.configLabel}>Auto-Tare Delay</label>
            <p style={styles.configDesc}>Minimum time before auto-tare is triggered (ms).</p>
            <TextField
              size="small"
              value={tareDelay}
              disabled={!auth}
              onChange={(e) => setTareDelay(e.target.value)}
              style={{ width: '140px', marginTop: '6px' }}
              InputProps={{ endAdornment: <span style={{ marginLeft: '4px', fontSize: '0.9rem' }}>ms</span> }}
            />
          </div>

          <div>
            <label style={styles.configLabel}>Auto-Tare Δ Threshold</label>
            <p style={styles.configDesc}>Trigger auto-tare when deviation falls below (g).</p>
            <TextField
              size="small"
              value={tareDelta}
              disabled={!auth}
              onChange={(e) => setTareDelta(e.target.value)}
              style={{ width: '140px', marginTop: '6px' }}
              InputProps={{ endAdornment: <span style={{ marginLeft: '4px', fontSize: '0.9rem' }}>g</span> }}
            />
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div style={styles.row(auth)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle style={{ color: '#16a34a', fontSize: 20 }} />
          <div>
            <h4 style={styles.label}>Apply Settings</h4>
            <p style={styles.desc}>Send updated HX711 config to the backend.</p>
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
  },
  sectionHeader: {
    marginTop: '32px',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1e293b',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '8px',
    marginBottom: '16px'
  },
  configPanel: (enabled) => ({
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '12px',
    opacity: enabled ? 1 : 0.5,
    pointerEvents: enabled ? 'auto' : 'none',
    border: '1px solid #e2e8f0'
  }),
  configLabel: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: '#0f172a'
  },
  configDesc: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#64748b',
    marginTop: '2px'
  }
};
