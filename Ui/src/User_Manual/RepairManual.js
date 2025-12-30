import React, { useState } from 'react';
import { ManualLayout } from './ManualLayout';

const repairSections = {
  overview: {
    title: 'Repair & Maintenance Overview',
    content: (
      <div>
        <h4>Introduction to System Maintenance</h4>
        <p>
          The Waste Management System is designed with comprehensive diagnostic and maintenance capabilities to ensure optimal
          performance throughout its operational lifecycle. This repair manual provides detailed guidance for troubleshooting,
          calibration, and system configuration procedures.
        </p>
        <p>
          The system features an integrated diagnostic interface accessible through the web dashboard, providing real-time
          monitoring of hardware components, software processes, and network connectivity. Regular maintenance procedures
          help maintain measurement accuracy and prevent system downtime.
        </p>
        <p>
          Maintenance activities range from simple calibration adjustments to advanced system configuration changes. The
          modular design allows for component-specific troubleshooting without affecting overall system operation.
        </p>

        <h4>Diagnostic Panel Architecture</h4>
        <p>
          All troubleshooting panels feature a modern, clean interface with visual feedback for better user experience.
          Each section includes subtle icons, toast notifications for actions, and loading indicators for async operations.
        </p>
        <ul>
          <li><strong>General Diagnostics:</strong> System-wide status monitoring with real-time metrics, icon-enhanced rows, and instant feedback via toast notifications</li>
          <li><strong>HX711 Settings:</strong> ADC amplifier configuration with icon-labeled sections, auto-tare controls, and visual loading states</li>
          <li><strong>Load Cell Panel:</strong> Sensor calibration tools with progress indicators and success confirmation messages</li>
          <li><strong>RPi Settings:</strong> Raspberry Pi system configuration with network controls and interactive feedback</li>
        </ul>

        <h4>UI Enhancements</h4>
        <ul>
          <li><strong>Visual Icons:</strong> Each metric displays a color-coded icon (Scale, Thermometer, Network, RAM) for quick identification</li>
          <li><strong>Toast Notifications:</strong> Success and error messages appear as temporary pop-ups at the bottom of the screen</li>
          <li><strong>Loading States:</strong> Buttons show spinners during processing (e.g., "Tare Now" becomes "Calibrating...")</li>
          <li><strong>Responsive Rows:</strong> Clean, border-outlined rows with subtle hover effects and disabled state styling</li>
        </ul>

        <h4>Access Control and Security</h4>
        <p>
          Most repair and configuration functions require administrator authentication to prevent unauthorized system changes.
          Public access functions include basic monitoring and manual tare operations, while advanced settings require
          proper credentials for system security.
        </p>
      </div>
    ),
  },
  general: {
    title: 'General Diagnostics',
    content: (
      <div>
        <h4>Available Functions</h4>

        <h5>🎯 Manual Tare (Public Access)</h5>
        <ul>
          <li><strong>Purpose:</strong> Reset baseline weight to zero manually</li>
          <li><strong>When to Use:</strong> After moving the device or when readings drift</li>
          <li><strong>Action:</strong> Click "TARE NOW" button - no authentication required</li>
          <li><strong>Visual Feedback:</strong> Button shows loading spinner during operation (1.5 seconds)</li>
          <li><strong>Success Message:</strong> Green toast notification confirms "Tare completed successfully"</li>
          <li><strong>Icon:</strong> Blue scale icon appears next to the Tare section label</li>
        </ul>

        <h5>🌐 Network Configuration (Admin Only)</h5>
        <ul>
          <li><strong>IP Address Display:</strong> Shows current network IP (192.168.1.40)</li>
          <li><strong>Purpose:</strong> Network troubleshooting and remote access setup</li>
          <li><strong>Editable:</strong> Admin can modify IP address settings</li>
        </ul>

        <h5>📊 Raw ADC Value (Admin Only)</h5>
        <ul>
          <li><strong>Purpose:</strong> Direct readout from HX711 amplifier (834290)</li>
          <li><strong>Troubleshooting:</strong> Verify ADC chip is receiving sensor signals</li>
          <li><strong>Normal Range:</strong> Should fluctuate with weight changes</li>
        </ul>

        <h5>⚖️ Current Weight (Public Access)</h5>
        <ul>
          <li><strong>Purpose:</strong> Live processed reading from load cell (3.27 kg)</li>
          <li><strong>Real-time Updates:</strong> Continuously updated via WebSocket</li>
          <li><strong>Calibration Check:</strong> Compare with known weights for accuracy</li>
        </ul>

        <h5>🌡️ System Temperature (Public Access)</h5>
        <ul>
          <li><strong>Purpose:</strong> Monitor RPi core temperature (52.6 °C)</li>
          <li><strong>Normal Range:</strong> 30-60°C under normal operation</li>
          <li><strong>Warning:</strong> Temperatures above 70°C indicate cooling issues</li>
        </ul>

        <h5>💾 Memory Usage (Public Access)</h5>
        <ul>
          <li><strong>Purpose:</strong> Monitor system resources (435MB / 1GB)</li>
          <li><strong>Performance:</strong> High usage may slow system response</li>
          <li><strong>Action:</strong> Restart system if consistently above 80%</li>
        </ul>
      </div>
    ),
  },
  hx711: {
    title: 'HX711 ADC Settings',
    content: (
      <div>
        <h4>HX711 Amplifier Configuration</h4>
        <p>The HX711 is a precision 24-bit ADC designed for load cell applications. These settings control signal processing and calibration.</p>

        <h5>🧹 Clean HX711</h5>
        <ul>
          <li><strong>Function:</strong> Reset and clear HX711 data buffer</li>
          <li><strong>Purpose:</strong> Remove noise offset and stabilize readings</li>
          <li><strong>When to Use:</strong> Erratic readings or startup issues</li>
          <li><strong>Action:</strong> Click "Clean" button (requires admin auth)</li>
        </ul>

        <h5>📡 Toggle ADC Raw</h5>
        <ul>
          <li><strong>Function:</strong> Display unprocessed ADC output</li>
          <li><strong>Purpose:</strong> Debug signal issues at hardware level</li>
          <li><strong>States:</strong> Enabled/Disabled toggle switch</li>
          <li><strong>Use Case:</strong> Troubleshoot sensor connectivity problems</li>
        </ul>

        <h5>📈 Gain Factor</h5>
        <ul>
          <li><strong>Options:</strong> 32, 64, or 128 (default: 128)</li>
          <li><strong>Purpose:</strong> Amplifier gain applied to ADC readings</li>
          <li><strong>Higher Gain:</strong> Better sensitivity, more noise susceptible</li>
          <li><strong>Lower Gain:</strong> Less sensitive, more stable readings</li>
        </ul>

        <h5>⏱️ Stabilization Delay</h5>
        <ul>
          <li><strong>Default:</strong> 500ms</li>
          <li><strong>Purpose:</strong> Pause after tare or reset operations</li>
          <li><strong>Adjustment:</strong> Increase if readings take time to stabilize</li>
          <li><strong>Range:</strong> 100-2000ms typically sufficient</li>
        </ul>

        <h5>🔄 Auto-Tare Configuration</h5>
        <ul>
          <li><strong>Enable Auto-Tare:</strong> Automatic baseline correction</li>
          <li><strong>Auto-Tare Delay:</strong> Minimum time before triggering (default: 3000ms)</li>
          <li><strong>Δ Threshold:</strong> Deviation trigger point (default: 200g)</li>
          <li><strong>Logic:</strong> Auto-tare when weight deviation falls below threshold</li>
        </ul>

        <h5>✅ Apply Settings</h5>
        <ul>
          <li><strong>Function:</strong> Send updated configuration to backend</li>
          <li><strong>Required:</strong> Must click after making changes</li>
          <li><strong>Visual Feedback:</strong> Green success button with loading spinner during application</li>
          <li><strong>Confirmation:</strong> Toast notification appears: "Settings applied successfully"</li>
          <li><strong>Icon:</strong> Green checkmark icon indicates successful application</li>
          <li><strong>Verification:</strong> Monitor readings to confirm changes took effect</li>
        </ul>
      </div>
    ),
  },
  loadcell: {
    title: 'Load Cell Settings',
    content: (
      <div>
        <h4>Load Cell Calibration & Configuration</h4>
        <p>Load cell settings control the precision and accuracy of weight measurements. Proper calibration is essential for reliable readings.</p>

        <h5>⚖️ Calibration Factor</h5>
        <ul>
          <li><strong>Default:</strong> 2280.3</li>
          <li><strong>Purpose:</strong> Scaling factor to convert ADC values to grams</li>
          <li><strong>Calculation:</strong> (ADC_reading - offset) / calibration_factor = weight</li>
          <li><strong>Adjustment:</strong> Use known weights to determine accurate factor</li>
        </ul>

        <h5>📏 Reference Weight</h5>
        <ul>
          <li><strong>Default:</strong> 1000g (1 kg)</li>
          <li><strong>Purpose:</strong> Known mass used during calibration process</li>
          <li><strong>Accuracy:</strong> Use certified weights for best results</li>
          <li><strong>Recommendation:</strong> Choose weight close to typical usage range</li>
        </ul>

        <h5>📊 Sampling Speed</h5>
        <ul>
          <li><strong>Options:</strong> 1, 5, 10, 20, 50 readings per cycle</li>
          <li><strong>Default:</strong> 10 readings</li>
          <li><strong>Higher Values:</strong> More stable readings, slower response</li>
          <li><strong>Lower Values:</strong> Faster response, more noise sensitivity</li>
        </ul>

        <h5>⚠️ Error Tolerance</h5>
        <ul>
          <li><strong>Default:</strong> 5%</li>
          <li><strong>Purpose:</strong> Maximum allowed deviation from expected readings</li>
          <li><strong>Alerts:</strong> System warns when tolerance exceeded</li>
          <li><strong>Adjustment:</strong> Tighten for precision, loosen for stability</li>
        </ul>

        <h5>🔄 Reset Calibration</h5>
        <ul>
          <li><strong>Function:</strong> Wipe all calibration data and revert to defaults</li>
          <li><strong>Use Case:</strong> Complete recalibration needed</li>
          <li><strong>Warning:</strong> Irreversible action - backup settings first</li>
          <li><strong>Follow-up:</strong> Must recalibrate with known weights</li>
        </ul>

        <h5>✅ Apply Configuration</h5>
        <ul>
          <li><strong>Function:</strong> Send updated parameters to backend system</li>
          <li><strong>Required:</strong> Changes only take effect after applying</li>
          <li><strong>Verification:</strong> Test with known weights after applying</li>
        </ul>
      </div>
    ),
  },
  rpi: {
    title: 'Raspberry Pi Settings',
    content: (
      <div>
        <h4>Raspberry Pi System Configuration</h4>
        <p>RPi settings control system-level functions, network access, and hardware interfaces. Handle with care as changes affect entire system.</p>

        <h5>🌡️ System Temperature (Public)</h5>
        <ul>
          <li><strong>Current:</strong> 52.4°C (live reading)</li>
          <li><strong>Purpose:</strong> Monitor CPU thermal state</li>
          <li><strong>Normal Range:</strong> 30-60°C</li>
          <li><strong>Critical:</strong> Above 70°C requires cooling attention</li>
        </ul>

        <h5>🏷️ Device Hostname</h5>
        <ul>
          <li><strong>Current:</strong> nokia-waste-node</li>
          <li><strong>Purpose:</strong> Network identifier for this device</li>
          <li><strong>Change Impact:</strong> Affects network discovery and remote access</li>
          <li><strong>Format:</strong> Use letters, numbers, and hyphens only</li>
        </ul>

        <h5>⚡ Power Status</h5>
        <ul>
          <li><strong>Function:</strong> Software-controlled relay for device power</li>
          <li><strong>Current:</strong> On (enabled)</li>
          <li><strong>Use Case:</strong> Remote power cycling for maintenance</li>
          <li><strong>Warning:</strong> Turning off will disconnect current session</li>
        </ul>

        <h5>🔐 SSH Access</h5>
        <ul>
          <li><strong>Function:</strong> Enable/disable remote terminal access</li>
          <li><strong>Security:</strong> Only enable when remote maintenance needed</li>
          <li><strong>Default Port:</strong> 22 (standard SSH)</li>
          <li><strong>Authentication:</strong> Uses system user credentials</li>
        </ul>

        <h5>🔌 API Plugin</h5>
        <ul>
          <li><strong>Function:</strong> Allow external API connections</li>
          <li><strong>Services:</strong> Flask endpoints for data access</li>
          <li><strong>Security:</strong> Controls external application access</li>
          <li><strong>Default:</strong> Disabled for security</li>
        </ul>

        <h5>🗄️ Database Settings</h5>
        <ul>
          <li><strong>Function:</strong> Configure database connection parameters</li>
          <li><strong>Options:</strong> Credentials, schema, plugin modules</li>
          <li><strong>Action:</strong> "Configure DB" button opens detailed settings</li>
          <li><strong>Backup:</strong> Always backup before changing database settings</li>
        </ul>

        <h5>⚙️ System Configuration</h5>
        <ul>
          <li><strong>Function:</strong> View/edit system config file (config.json)</li>
          <li><strong>Contents:</strong> Hardware pins, network settings, thresholds</li>
          <li><strong>Format:</strong> JSON structure with validation</li>
          <li><strong>Caution:</strong> Invalid configuration can prevent system startup</li>
        </ul>
      </div>
    ),
  },
  troubleshooting: {
    title: 'Common Issues & Solutions',
    content: (
      <div>
        <h4>Frequent Problems and Resolutions</h4>

        <h5>❌ No Weight Readings</h5>
        <ul>
          <li><strong>Check:</strong> Load cell physical connections</li>
          <li><strong>Verify:</strong> HX711 power and data pins</li>
          <li><strong>Test:</strong> Raw ADC value in General Diagnostics</li>
          <li><strong>Action:</strong> Clean HX711 buffer, restart system</li>
        </ul>

        <h5>📊 Inaccurate Readings</h5>
        <ul>
          <li><strong>Calibrate:</strong> Use known reference weights</li>
          <li><strong>Adjust:</strong> Calibration factor in Load Cell settings</li>
          <li><strong>Check:</strong> Environmental temperature stability</li>
          <li><strong>Verify:</strong> Load cell mounting and alignment</li>
        </ul>

        <h5>🌐 Network Connection Issues</h5>
        <ul>
          <li><strong>Check:</strong> IP address in General Diagnostics</li>
          <li><strong>Verify:</strong> Physical network cable connection</li>
          <li><strong>Test:</strong> SSH access if enabled</li>
          <li><strong>Reset:</strong> Network settings in RPi configuration</li>
        </ul>

        <h5>🔥 Overheating Warnings</h5>
        <ul>
          <li><strong>Monitor:</strong> System temperature in General panel</li>
          <li><strong>Improve:</strong> Ventilation around device</li>
          <li><strong>Clean:</strong> Dust from heat sinks and fans</li>
          <li><strong>Relocate:</strong> Away from heat sources</li>
        </ul>

        <h5>💾 High Memory Usage</h5>
        <ul>
          <li><strong>Monitor:</strong> Memory usage in General Diagnostics</li>
          <li><strong>Restart:</strong> System if consistently above 80%</li>
          <li><strong>Check:</strong> Background processes consuming resources</li>
          <li><strong>Optimize:</strong> Database query frequency</li>
        </ul>

        <h5>🔄 System Unresponsive</h5>
        <ul>
          <li><strong>Power Cycle:</strong> Use Power Status toggle in RPi settings</li>
          <li><strong>Physical Reset:</strong> Unplug and reconnect power</li>
          <li><strong>Check Logs:</strong> System configuration errors</li>
          <li><strong>Restore:</strong> Backup configuration if needed</li>
        </ul>
      </div>
    ),
  },
};

export function RepairManual({ onBack }) {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <ManualLayout
      title="Repair & Maintenance"
      sections={repairSections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onBack={onBack}
    >
      <h2>{repairSections[activeSection].title}</h2>
      {repairSections[activeSection].content}
    </ManualLayout>
  );
}
