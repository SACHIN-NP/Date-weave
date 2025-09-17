import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Profile from './Profile';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'add':
        return (
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">Add New Date</h2>
              <p className="text-muted-foreground">Plan your perfect date experience</p>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">Calendar</h2>
              <p className="text-muted-foreground">View your upcoming dates</p>
            </div>
          </div>
        );
      case 'room':
        return (
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">Room</h2>
              <p className="text-muted-foreground">Your personal dating space</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">Settings</h2>
              <p className="text-muted-foreground">Customize your preferences</p>
            </div>
          </div>
        );
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Sidebar onSectionChange={setActiveSection} activeSection={activeSection} />
      {renderContent()}
    </div>
  );
};

export default Dashboard;