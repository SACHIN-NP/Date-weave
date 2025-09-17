import React from 'react';
import { User, Plus, Calendar, Home, Settings, LogOut, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  onSectionChange?: (section: string) => void;
  activeSection?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSectionChange, activeSection = 'profile' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
    { id: 'add', icon: Plus, label: 'Add Date', path: '/add' },
    { id: 'calendar', icon: Calendar, label: 'Calendar', path: '/calendar' },
    { id: 'room', icon: Home, label: 'Room', path: '/room' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleNavigation = (item: typeof menuItems[0]) => {
    onSectionChange?.(item.id);
    navigate(item.path);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (itemId: string) => {
    return location.pathname === menuItems.find(item => item.id === itemId)?.path || activeSection === itemId;
  };

  return (
    <nav className="w-72 bg-card/50 backdrop-blur-xl border-r border-border/50 flex flex-col h-full shadow-soft">
      {/* Header with gradient accent */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-romantic-gradient" />
        
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-romantic-gradient rounded-full flex items-center justify-center shadow-romantic">
                <img src='logo.png' className='rounded-full w-50 h-50'/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            
            return (
              <Button
                key={item.id}
                variant={active ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-12 transition-all duration-300 ${
                  active 
                    ? 'bg-romantic-gradient text-white shadow-romantic hover:shadow-glow' 
                    : 'hover:bg-primary/10 hover:translate-x-1'
                }`}
                onClick={() => handleNavigation(item)}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-border/30">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 h-12 text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-all duration-300"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </nav>
  );
};

export default Sidebar;