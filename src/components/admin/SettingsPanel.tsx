
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';

const SettingsPanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  
  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    schoolName: "Academy",
    schoolTagline: "Empowering Future Leaders",
    contactEmail: "contact@academy.edu",
    contactPhone: "(123) 456-7890",
    address: "123 Academy Drive, Anytown, ST 12345"
  });
  
  // Appearance settings state
  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: "#1E2A78",
    secondaryColor: "#FFD700",
    showLogo: true,
    showSocialLinks: true,
    enableDarkMode: false,
    fontFamily: "Montserrat"
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newsUpdates: true,
    eventReminders: true,
    maintenanceAlerts: false
  });
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully."
    });
  };
  
  const handleSaveAppearance = () => {
    toast({
      title: "Settings Saved",
      description: "Appearance settings have been updated successfully."
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Settings Saved",
      description: "Notification settings have been updated successfully."
    });
  };

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic information about your school website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="schoolName">School Name</Label>
                <Input 
                  id="schoolName"
                  value={generalSettings.schoolName}
                  onChange={(e) => setGeneralSettings({...generalSettings, schoolName: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="schoolTagline">School Tagline</Label>
                <Input 
                  id="schoolTagline"
                  value={generalSettings.schoolTagline}
                  onChange={(e) => setGeneralSettings({...generalSettings, schoolTagline: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">
                  This appears on the home page hero section and in meta descriptions.
                </p>
              </div>
              
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input 
                  id="contactEmail"
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input 
                  id="contactPhone"
                  value={generalSettings.contactPhone}
                  onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="address">School Address</Label>
                <Input 
                  id="address"
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral} className="bg-school-navy">
                Save General Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how your school website looks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="h-8 w-8 rounded border"
                      style={{ backgroundColor: appearanceSettings.primaryColor }}
                    ></div>
                    <Input 
                      id="primaryColor"
                      value={appearanceSettings.primaryColor}
                      onChange={(e) => setAppearanceSettings({...appearanceSettings, primaryColor: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="h-8 w-8 rounded border"
                      style={{ backgroundColor: appearanceSettings.secondaryColor }}
                    ></div>
                    <Input 
                      id="secondaryColor"
                      value={appearanceSettings.secondaryColor}
                      onChange={(e) => setAppearanceSettings({...appearanceSettings, secondaryColor: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="fontFamily">Font Family</Label>
                <select 
                  id="fontFamily"
                  className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2"
                  value={appearanceSettings.fontFamily}
                  onChange={(e) => setAppearanceSettings({...appearanceSettings, fontFamily: e.target.value})}
                >
                  <option value="Montserrat">Montserrat</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Merriweather">Merriweather</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showLogo">Show Logo</Label>
                  <Switch 
                    id="showLogo"
                    checked={appearanceSettings.showLogo}
                    onCheckedChange={(checked) => setAppearanceSettings({...appearanceSettings, showLogo: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="showSocialLinks">Show Social Media Links</Label>
                  <Switch 
                    id="showSocialLinks"
                    checked={appearanceSettings.showSocialLinks}
                    onCheckedChange={(checked) => setAppearanceSettings({...appearanceSettings, showSocialLinks: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableDarkMode">Enable Dark Mode Option</Label>
                  <Switch 
                    id="enableDarkMode"
                    checked={appearanceSettings.enableDarkMode}
                    onCheckedChange={(checked) => setAppearanceSettings({...appearanceSettings, enableDarkMode: checked})}
                  />
                </div>
              </div>
              
              <div>
                <Label>Preview</Label>
                <div className="border rounded-md p-4 mt-1">
                  <div 
                    className="rounded-md p-4"
                    style={{ backgroundColor: appearanceSettings.primaryColor }}
                  >
                    <h3 
                      className="text-white font-bold"
                      style={{ fontFamily: appearanceSettings.fontFamily }}
                    >
                      {generalSettings.schoolName}
                    </h3>
                    <p className="text-white opacity-90">
                      {generalSettings.schoolTagline}
                    </p>
                    <button
                      className="mt-2 px-4 py-1 rounded"
                      style={{ backgroundColor: appearanceSettings.secondaryColor, color: appearanceSettings.primaryColor }}
                    >
                      Sample Button
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAppearance} className="bg-school-navy">
                Save Appearance Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how the system sends notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications" className="text-base font-medium">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive updates and alerts via email.
                    </p>
                  </div>
                  <Switch 
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newsUpdates" className="text-base font-medium">News Updates</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications when news articles are published.
                    </p>
                  </div>
                  <Switch 
                    id="newsUpdates"
                    checked={notificationSettings.newsUpdates}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newsUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="eventReminders" className="text-base font-medium">Event Reminders</Label>
                    <p className="text-sm text-gray-500">
                      Get reminders about upcoming events.
                    </p>
                  </div>
                  <Switch 
                    id="eventReminders"
                    checked={notificationSettings.eventReminders}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, eventReminders: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceAlerts" className="text-base font-medium">Maintenance Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications about system maintenance.
                    </p>
                  </div>
                  <Switch 
                    id="maintenanceAlerts"
                    checked={notificationSettings.maintenanceAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, maintenanceAlerts: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications} className="bg-school-navy">
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security options and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <div className="bg-amber-50 rounded-lg p-4 mb-4">
                  <p className="text-amber-800">
                    Security settings are not yet implemented. This section will allow you to manage 
                    authentication options, permissions, and access controls.
                  </p>
                </div>
                <Button variant="outline">Contact System Administrator</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
