import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import NotificationsPanel from "../alerts/NotificationsPanel";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onMenuClick={toggleSidebar} 
        onNotificationsClick={toggleNotifications} 
      />
      
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 pl-0 md:ml-[196px]">
          {children}
        </main>
      </div>
      
      <MobileNav />
      
      <NotificationsPanel 
        open={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)} 
      />
    </div>
  );
};

export default Layout;
