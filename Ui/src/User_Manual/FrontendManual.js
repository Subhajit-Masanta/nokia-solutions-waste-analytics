import React, { useState } from 'react';
import { ManualLayout } from './ManualLayout';

const frontendSections = {
  overview: {
    title: 'Overview',
    content: (
      <div>
        <h4>Tech Stack</h4>
        <ul>
          <li><strong>React 18</strong> with Create React App, Functional components, hooks, Context API, lazy loading, and error boundaries.</li>
          <li><strong>WebSocket</strong> for real-time data streaming with JSON protocol, auto-reconnect, and throttling.</li>
          <li><strong>Chart.js</strong> for data visualizations, customization, responsive charts with dynamic theming. </li>
          <li><strong>CSS Modules</strong> with custom properties, mobile-first approach, and theme switching.</li>
        </ul>

        <h4>Key Features</h4>
        <ul>
          <li><strong>Real-time Dashboard:</strong> Live weight monitoring with WebSocket updates, Alert system with configurable thresholds and notifications.</li>
          <li><strong>Hardware Diagnostics:</strong> HX711, Load Cell, and RPi status monitoring, RPi system health (CPU, memory, thermal status).</li>
          <li><strong>Analytics:</strong> Tab-based interface with "Charts Overview" and "Meal Distribution" views, Weekly/Monthly trends with interactive line charts, Pie chart for waste category breakdown, Responsive containers adapting to screen size, Real-time data updates with smooth transitions</li>
          <li><strong>Modular Manual System:</strong> 4 separate manual components with shared layout, shared UI library and validation logic.</li>
        </ul>
      </div>
    ),
  },
  architecture: {
    title: 'Project Structure',
    content: (
      <div>
        <h4>Key Directories</h4>
        <ul>
          <li><strong>Dashboard/:</strong> Main dashboard components for real-time monitoring</li>
          <li><strong>Analytics/:</strong> Chart.js wrapper with custom configurations</li>
          <li><strong>Main_bar/:</strong> Top navigation and main menu components</li>
          <li><strong>Troubleshooting/:</strong> Hardware diagnostic tools and panels</li>
          <li><strong>User_Manual/:</strong> Documentation system with shared layout</li>
          <li><strong>services/:</strong> API client with retry logic and error handling</li>
        </ul>

        <h4>Component Organization</h4>
        <ul>
          <li><strong>Leftcard.js:</strong> Real-time weight display & session controls</li>
          <li><strong>Rightcard.js:</strong> Statistics & analytics summary dashboard</li>
          <li><strong>Weightlist.js:</strong> Weight measurement history with export</li>
          <li><strong>Charts.js:</strong> Data visualization with multiple chart types</li>
          <li><strong>HX711Panel.jsx:</strong> HX711 ADC diagnostics and calibration</li>
          <li><strong>LoadCellPanel.jsx:</strong> Load cell monitoring and drift detection</li>
          <li><strong>RPiPanel.jsx:</strong> Raspberry Pi status and system resources</li>
        </ul>

        <h4>State Management</h4>
        <ul>
          <li><strong>Local State:</strong> useState for component-specific data</li>
          <li><strong>WebSocket State:</strong> Real-time sensor data via custom hooks</li>
          <li><strong>API State:</strong> Cached analytics data with error handling</li>
        </ul>
      </div>
    ),
  },
  components: {
    title: 'Core Components',
    content: (
      <div>
        <h4>Dashboard Components</h4>

        <h5>LeftCard - Real-time Display</h5>
        <ul>
          <li>Live weight display with WebSocket updates</li>
          <li>Session controls (start/stop/calibrate)</li>
          <li>Connection status indicators</li>
        </ul>

        <h5>RightCard - Analytics Summary</h5>
        <ul>
          <li>Daily/weekly totals with trend calculations</li>
          <li>Waste reduction percentages</li>
          <li>Goal progress tracking</li>
        </ul>

        <h5>WeightList - Data History</h5>
        <ul>
          <li>Sortable table with session grouping</li>
          <li>Export functionality</li>
          <li>Real-time updates for new measurements</li>
        </ul>

        <h4>Charts Component</h4>
        <p>
          The Analytics section features a modern tab-based interface for comprehensive data visualization and analysis.
        </p>
        <ul>
          <li><strong>Tab Navigation:</strong> "Charts Overview" and "Meal Distribution" tabs for different visualization modes</li>
          <li><strong>Charts Overview Tab:</strong> Weekly (7-day) and Monthly (4-week) trend line charts with Material-UI integration</li>
          <li><strong>Meal Distribution Tab:</strong> Pie/Donut chart showing waste breakdown by meal type (Breakfast, Lunch, Dinner, Snacks, Supper)</li>
          <li><strong>Responsive Design:</strong> Charts automatically resize for mobile, tablet, and desktop screens</li>
          <li><strong>Real-time Updates:</strong> Live data binding with smooth animations and transitions</li>
          <li><strong>Interactive Elements:</strong> Tooltips on hover, legend toggles, and data point highlighting</li>
        </ul>

        <h4>Layout Improvements</h4>
        <ul>
          <li><strong>Full-Width Display:</strong> Content now spans the entire screen width (removed 1600px max-width constraint)</li>
          <li><strong>Adaptive Padding:</strong> Responsive spacing adjusts based on screen size using Material-UI sx props</li>
          <li><strong>Compact Design:</strong> Streamlined layout matches deployed version's efficient use of space</li>
        </ul>

        <h4>Troubleshooting Panels</h4>
        <p>All troubleshooting panels feature a unified, modern design with consistent interactions and visual feedback.</p>
        <ul>
          <li><strong>HX711Panel:</strong> ADC calibration with icon-labeled rows, loading states on "Clean" button, success toast notifications</li>
          <li><strong>LoadCellPanel:</strong> Sensor diagnostics with calibrate button showing progress, toast confirms "Calibration completed"</li>
          <li><strong>RPiPanel:</strong> Network settings (WiFi SSID/Password), System restart with loading indicator, Storage configuration</li>
          <li><strong>GeneralStatusPanel:</strong> Icon-enhanced metrics (Scale, Temp, Network, RAM), Real-time weight display, Admin unlock feature with authentication dialog</li>
        </ul>

        <h4>UI/UX Enhancements</h4>
        <ul>
          <li><strong>Visual Icons:</strong> Material-UI icons for each section (Scale, Thermostat, Public, Memory, Settings)</li>
          <li><strong>Toast Notifications:</strong> Bottom-center pop-ups for success/error feedback with auto-dismiss after 3 seconds</li>
          <li><strong>Loading States:</strong> Circular progress spinners replace button text during async operations</li>
          <li><strong>Clean Layout:</strong> Row-based design with subtle borders, hover effects, and disabled state opacity</li>
        </ul>

        <h4>Manual System</h4>
        <ul>
          <li><strong>ManualLayout:</strong> Shared sidebar navigation for all manual components</li>
          <li><strong>Section-based:</strong> Each manual has configurable sections with content</li>
          <li><strong>Router Integration:</strong> User_Manual.js handles section switching</li>
        </ul>
      </div>
    ),
  },
  integration: {
    title: 'API Integration',
    content: (
      <div>
        <h4>API Service Implementation</h4>
        <ul>
          <li>Custom API service class with automatic retry logic</li>
          <li>Exponential backoff strategy for failed requests</li>
          <li>Environment-based URL configuration</li>
          <li>Centralized error handling across all components</li>
        </ul>

        <h4>Key Endpoints Used</h4>
        <ul>
          <li><strong>/api/weekly-chart:</strong> Fetches 7-day trend data for Charts component</li>
          <li><strong>/api/monthly-chart:</strong> Monthly comparison analytics for dashboard</li>
          <li><strong>/api/weights:</strong> Real-time weight measurements for live display</li>
          <li><strong>/api/comparision:</strong> Waste reduction calculations for analytics</li>
          <li><strong>/api/health:</strong> System status data for troubleshooting panels</li>
        </ul>

        <h4>WebSocket Integration</h4>
        <ul>
          <li>Real-time data connection to backend WebSocket server</li>
          <li>Live weight updates sent directly to dashboard components</li>
          <li>Automatic reconnection handling with fallback to HTTP polling</li>
          <li>Channel-based message routing for different data types</li>
        </ul>

        <h4>Error Handling Strategy</h4>
        <ul>
          <li>Automatic retry with exponential backoff for network failures</li>
          <li>Graceful fallback to HTTP polling if WebSocket connection fails</li>
          <li>User-friendly error messages displayed in UI components</li>
          <li>Connection status indicators in real-time display components</li>
        </ul>
      </div>
    ),
  },
  backendIntegration: {
    title: 'Backend Integration',
    content: (
      <div>
        <h4>Communication Architecture</h4>
        <ul>
          <li><strong>Dual Protocol Support:</strong> HTTP REST API for standard operations, WebSocket for real-time data</li>
          <li><strong>Data Synchronization:</strong> Frontend maintains local state synchronized with backend via WebSocket events</li>
          <li><strong>Connection Management:</strong> Automatic reconnection with exponential backoff for WebSocket failures</li>
          <li><strong>Fallback Mechanisms:</strong> HTTP polling fallback when WebSocket connection is unavailable</li>
        </ul>

        <h4>Real-time Data Flow</h4>
        <ul>
          <li><strong>Weight Measurements:</strong> Live sensor data streamed via WebSocket to dashboard components</li>
          <li><strong>System Status:</strong> Hardware diagnostics pushed to troubleshooting panels in real-time</li>
          <li><strong>Session Events:</strong> Start/stop/calibration events synchronized across all connected clients</li>
          <li><strong>Alert System:</strong> Critical system alerts pushed immediately to frontend notification system</li>
        </ul>

        <h4>Data Processing Pipeline</h4>
        <ul>
          <li><strong>Raw Sensor Data:</strong> HX711 ADC readings processed and filtered on backend before transmission</li>
          <li><strong>Analytics Computation:</strong> Weekly/monthly trends calculated server-side for optimal performance</li>
          <li><strong>Data Validation:</strong> Backend validates all sensor readings before storage and transmission</li>
          <li><strong>Caching Strategy:</strong> Frequently accessed analytics data cached on backend with TTL expiration</li>
        </ul>

        <h4>Security & Authentication</h4>
        <ul>
          <li><strong>API Authentication:</strong> Token-based authentication for all HTTP API endpoints</li>
          <li><strong>WebSocket Security:</strong> Secure WebSocket connections with authentication handshake</li>
          <li><strong>Data Encryption:</strong> All sensitive data encrypted in transit using TLS/SSL</li>
          <li><strong>Rate Limiting:</strong> Backend implements rate limiting to prevent API abuse</li>
        </ul>

        <h4>Database Integration</h4>
        <ul>
          <li><strong>Time-series Data:</strong> Weight measurements stored in optimized time-series database</li>
          <li><strong>Configuration Storage:</strong> System settings and calibration data persisted in relational database</li>
          <li><strong>Session Management:</strong> User sessions and measurement groupings tracked with unique identifiers</li>
          <li><strong>Data Retention:</strong> Automated data archival and cleanup policies for long-term storage management</li>
        </ul>

        <h4>Performance Optimization</h4>
        <ul>
          <li><strong>Data Compression:</strong> WebSocket messages compressed to reduce bandwidth usage</li>
          <li><strong>Batch Processing:</strong> Multiple sensor readings batched for efficient database operations</li>
          <li><strong>Connection Pooling:</strong> Database connection pooling for optimal resource utilization</li>
          <li><strong>Load Balancing:</strong> Backend supports horizontal scaling with load balancer integration</li>
        </ul>
      </div>
    ),
  },
};

export function FrontendManual({ onBack }) {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <ManualLayout
      title="Frontend Design"
      sections={frontendSections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onBack={onBack}
    >
      <h2>{frontendSections[activeSection].title}</h2>
      {frontendSections[activeSection].content}
    </ManualLayout>
  );
}