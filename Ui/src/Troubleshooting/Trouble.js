import React, { useState } from 'react';
import HX711Panel from './HX711Panel';
import LoadCellPanel from './LoadCellPanel';
import RPiPanel from './RPiPanel';
import GeneralStatusPanel from './GeneralStatusPanel';
import './Troubleshooting.css';

export default function TroubleShooting() {
  const [activeSection, setActiveSection] = useState('manual');

  const renderContent = () => {
    switch (activeSection) {
      case 'manual':
        return <GeneralStatusPanel />;
      case 'hx':
        return <HX711Panel />;
      case 'loadcell':
        return <LoadCellPanel />;
      case 'rpi':
        return <RPiPanel />;
      default:
        return <GeneralStatusPanel />;
    }
  };

  return (
    <div className="trouble-wrapper">
      {/* Sidebar Menu */}
      <div className="trouble-nav">
        <h2>
          Welcome to the Troubleshooting Panel
        </h2>
        <p>
          Please choose the component that's causing issues:
        </p>
        {['manual', 'hx', 'loadcell', 'rpi'].map(section => (
          <button
            key={section}
            className={activeSection === section ? 'active' : ''}
            onClick={() => setActiveSection(section)}
          >
            {section === 'manual' ? 'General' :
              section === 'hx' ? 'HX711' :
                section === 'loadcell' ? 'Load Cell' :
                  'RPi Settings'}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="trouble-panel">
        {renderContent()}
      </div>
    </div>
  );
}
