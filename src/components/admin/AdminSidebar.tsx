
import React from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  BookOpen, 
  Settings,
  Menu,
  X,
  Home,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const navItems = [
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'news', label: 'News & Announcements', icon: MessageSquare },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'academics', label: 'Academics', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin dashboard"
    });
    navigate('/admin/login');
  };

  return (
    <div className={cn(
      "fixed left-0 top-0 h-screen bg-school-navy text-white transition-all duration-300 z-40",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="h-16 flex items-center justify-between px-4 bg-school-navy border-b border-white/10">
        <span className={cn(
          "font-bold text-lg transition-opacity",
          isCollapsed ? "opacity-0 w-0" : "opacity-100"
        )}>Academy Admin</span>
        <button 
          className="p-1 bg-white/10 rounded-full text-white hover:bg-white/20"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu size={16} /> : <X size={16} />}
        </button>
      </div>

      <div className="p-4 pt-6">
        <Link to="/" className="flex items-center mb-6 text-white hover:text-school-gold">
          <Home className={cn("shrink-0", isCollapsed ? "mx-auto" : "mr-3")} size={20} />
          {!isCollapsed && <span>View Website</span>}
        </Link>

        <div className="space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center w-full p-3 rounded-lg transition-all",
                activeTab === item.id 
                  ? "bg-white text-school-navy font-medium" 
                  : "hover:bg-white/10"
              )}
            >
              <item.icon className={cn("shrink-0", isCollapsed ? "mx-auto" : "mr-3")} size={20} />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className={cn(
        "absolute bottom-4 left-0 right-0 px-4",
        isCollapsed ? "text-center" : ""
      )}>
        <button 
          onClick={handleLogout}
          className="flex items-center w-full p-3 text-white hover:bg-white/10 rounded-lg transition-all"
        >
          <LogOut className={cn("shrink-0", isCollapsed ? "mx-auto" : "mr-3")} size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>

        <div className="bg-white/10 rounded-lg p-3 mt-4">
          <div className={cn(
            "font-medium",
            isCollapsed ? "text-xs" : "text-sm"
          )}>
            {isCollapsed ? "Admin" : "School Admin Panel"}
          </div>
          {!isCollapsed && (
            <div className="text-xs text-gray-300 mt-1">
              Version 1.0
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
