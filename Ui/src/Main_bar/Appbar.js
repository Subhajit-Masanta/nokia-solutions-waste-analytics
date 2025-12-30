import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import appLogo from '../utils/nokialogo.png';

const AppBarComponent = ({ onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(timerId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const logo = {
    height: isMobile ? '36px' : '44px',
    width: isMobile ? '90px' : '120px',
    objectFit: 'contain',
    display: 'flex',
    alignItems: 'center',
  };

  const logoContainer = {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '8px' : '12px',
    flexShrink: 0
  };

  const menuButton = {
    color: 'white',
    padding: isMobile ? '6px' : '8px',
  };

  const title = {
    fontSize: isMobile ? (window.innerWidth < 480 ? '14px' : '16px') : '35px',
    fontWeight: 600,
    flexGrow: 1,
    textAlign: 'center',
    color: ' #ffffffcc',
    letterSpacing: isMobile ? '0.5px' : '1px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: isMobile ? 'calc(100vw - 200px)' : 'none',
    padding: isMobile ? '0 8px' : '0'
  };

  const time = {
    fontSize: isMobile ? '12px' : '20px',
    fontWeight: 500,
    color: ' #ffffffcc',
    whiteSpace: 'nowrap',
    padding: isMobile ? '4px 8px' : '8px 15px',
    flexShrink: 0
  };

  return (
    <>
      <div style={logoContainer}>
        <IconButton
          onClick={onMenuClick}
          style={menuButton}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <img src={appLogo} alt="App Logo" style={logo} />
      </div>

      <div style={title}>Waste Management Dashboard</div>
      <div style={time}> {formattedTime}</div>
    </>
  );
};

export default AppBarComponent;

