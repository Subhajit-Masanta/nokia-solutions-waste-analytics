import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import AppBar from "./Main_bar/Appbar";
import Leftcard from "./Dashboard/Leftcard";
import Rightcard from "./Dashboard/Rightcard";
import Comparison from "./Dashboard/Comparison";
import WeightList from "./Dashboard/Weightlist";
import Scrolltext from "./Dashboard/Scrolltext";
import LeftDrawer from "./Main_bar/NavBar";
import Charts from "./Analytics/Charts";
import Trouble from "./Troubleshooting/Trouble";
import { UserManual } from './User_Manual/User_Manual';


function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  // Smooth page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 15,
      scale: 0.99
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -10,
      scale: 0.99
    }
  };

  // Ultra smooth transition settings
  const pageTransition = {
    type: "spring",
    stiffness: 60,
    damping: 15,
    mass: 0.8,
    duration: 0.6
  };

  const renderMainContent = () => {
    return (
      <motion.div
        key={currentView}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{ width: "100%", height: "100%" }}
      >
        {(() => {
          switch (currentView) {
            case 'dashboard':
              return (
                <>
                  <div className="main-top-row">
                    <div className="live_data">
                      <Leftcard />
                    </div>
                    <div className="people">
                      <Rightcard />
                    </div>
                  </div>
                  <Comparison />
                  <WeightList />
                  <Scrolltext />
                </>
              );
            case 'analytics':
              return (
                <div className="analytics-view">
                  <Charts />
                </div>
              );
            case 'troubleshooting':
              return <Trouble />;

            case 'manual':
              return <UserManual />;
            default:
              return null;
          }
        })()}
      </motion.div>
    );
  };

  return (
    <div className="App">
      <div className="header">
        <AppBar onMenuClick={() => setDrawerOpen(!drawerOpen)} />
      </div>

      <div className={`main-container ${drawerOpen ? 'drawer-open' : ''}`}>
        <div className={`main ${currentView === 'manual' ? 'user-manual-view' : ''}`}>
          {currentView === 'manual' ? (
            <div className="user-manual-container">
              <AnimatePresence mode="wait">
                {renderMainContent()}
              </AnimatePresence>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {renderMainContent()}
            </AnimatePresence>
          )}
        </div>
      </div>

      <LeftDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          setDrawerOpen(false);
        }}
      />
    </div>
  );
}

export default App;
