
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  BookOpen, 
  Settings 
} from 'lucide-react';
import ContentEditor from '../components/admin/ContentEditor';
import NewsManager from '../components/admin/NewsManager';
import EventsManager from '../components/admin/EventsManager';
import UsersManager from '../components/admin/UsersManager';
import SettingsPanel from '../components/admin/SettingsPanel';
import AcademicsManager from '../components/admin/AcademicsManager';

interface AdminDashboardProps {
  activeTab?: string;
}

const AdminDashboard = ({ activeTab: propActiveTab = "content" }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = React.useState(propActiveTab);
  
  // Update active tab when prop changes (from sidebar)
  useEffect(() => {
    setActiveTab(propActiveTab);
  }, [propActiveTab]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-school-navy font-serif mb-6">Admin Dashboard</h1>
      
      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 bg-gray-100 p-1 rounded-md">
          <TabsTrigger value="content" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>Content</span>
          </TabsTrigger>
          <TabsTrigger value="news">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>News & Announcements</span>
          </TabsTrigger>
          <TabsTrigger value="events">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="academics">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Academics</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Tab contents */}
        <TabsContent value="content" className="mt-4">
          <ContentEditor />
        </TabsContent>
        
        <TabsContent value="news" className="mt-4">
          <NewsManager />
        </TabsContent>
        
        <TabsContent value="events" className="mt-4">
          <EventsManager />
        </TabsContent>
        
        <TabsContent value="users" className="mt-4">
          <UsersManager />
        </TabsContent>
        
        <TabsContent value="academics" className="mt-4">
          <AcademicsManager />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <SettingsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
