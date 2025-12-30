import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Odometer from 'react-odometerjs';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import "odometer/themes/odometer-theme-default.css";
import "./Leftcard.css";
import waste from "../utils/ohyeah.gif";
import { API } from "../services/api";

function Leftcard() {
  const [monthlyWeight, setMonthlyWeight] = useState(0);
  const [liveWeight, setLiveWeight] = useState(0);
  const [isConnected, setIsConnected] = useState(false); // WebSocket connection status
  const [error, setError] = useState(null);
  const [weightDelta, setWeightDelta] = useState(null);
  const [showDelta, setShowDelta] = useState(false);
  const wsRef = useRef(null);
  const prevWeightRef = useRef(0);

  window.odometerOptions = {
    animation: 'slide',
    duration: 2000
  };

  useEffect(() => {
    let isMounted = true;
    const fetchMonthlyWaste = async () => {
      try {
        const res = await API.getMonthlyWaste();
        const data = res.data;
        if (isMounted) {
          if (data.success && data.data && typeof data.data.total_quantity_kg === 'number') {
            setMonthlyWeight(data.data.total_quantity_kg * 1000); // convert kg to grams
            setError(null);
          } else {
            setError('Failed to load monthly waste data');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch monthly waste data');
        }
      }
    };

    fetchMonthlyWaste();
    const interval = setInterval(fetchMonthlyWaste, 2000);

    const connectWebSocket = () => {
      const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000/ws';
      wsRef.current = new WebSocket(wsUrl);
      wsRef.current.onopen = () => setIsConnected(true);
      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'weight_update') {
            // Show delta animation if weight increased
            const prev = prevWeightRef.current;
            if (data.weight > prev) {
              const delta = data.weight - prev;
              setWeightDelta(delta);
              setShowDelta(true);
              setTimeout(() => setShowDelta(false), 1500);
            }
            prevWeightRef.current = data.weight;
            setLiveWeight(data.weight);
          }
        } catch { }
      };
      wsRef.current.onclose = () => {
        setIsConnected(false);
        setTimeout(connectWebSocket, 3000);
      };
      wsRef.current.onerror = () => setIsConnected(false);
    };


    connectWebSocket();

    return () => {
      isMounted = false;
      clearInterval(interval);
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  const formatWeight = (weight) => weight >= 1000
    ? `${(weight / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })} kg`
    : `${weight.toLocaleString(undefined, { maximumFractionDigits: 0 })}g`;

  return (
    <div className="left-card">
      <div className="card-content">
        <Box mb={0}>
          {error && (
            <Alert severity="error" variant="filled" style={{ borderRadius: '8px' }}>
              {error}
            </Alert>
          )}
        </Box>
        <div className="leftcard-grid">
          {/* Monthly Section */}
          <div className="monthly-side">
            <div className="monthly-title">
              MONTHLY TOTAL
            </div>
            <img src={waste} alt="Bin" style={{ width: "200px", height: "auto", marginBottom: '16px' }} />
            <div className="monthly-value">
              {formatWeight(monthlyWeight)}
            </div>
            <div className="monthly-label">
              This Month's Waste
            </div>
          </div>

          <div className="divider" />

          {/* Live Section */}
          <div className="live-side" style={{ position: "relative" }}>
            <div className="live-title">
              LIVE WEIGHT TODAY
            </div>
            <div className={`live-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
              <div className="live-dot"></div>
              <span className="live-text">LIVE</span>
            </div>
            <div className="odometer-row" style={{ position: "relative" }}>
              <Odometer
                value={liveWeight}
                format="(,ddd)"
                className="odometer"
              />
              {showDelta && weightDelta > 0 && (
                <span className="weight-delta">
                  +{weightDelta.toFixed(2)}g
                </span>
              )}
            </div>
            <div className="live-unit">
              grams
            </div>
            <div className="live-label">
              REAL TIME WEIGHT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leftcard;