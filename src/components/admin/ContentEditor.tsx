
import React, { useState, useEffect } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import useAdminSync from '../../hooks/useAdminSync';

const ContentEditor = () => {
  const { toast } = useToast();
  const { getContentSections, updateContentSections } = useAdminSync();
  const [activeSection, setActiveSection] = useState("hero");
  const [sections, setSections] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load content sections when component mounts
    try {
      const contentData = getContentSections();
      setSections(contentData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading content sections:", error);
      toast({
        title: "Error",
        description: "Failed to load content sections",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, []);

  const handleSaveContent = () => {
    if (!sections) return;
    
    // Update localStorage with the current sections
    updateContentSections(sections);
    toast({
      title: "Content updated",
      description: `The ${activeSection} section has been updated successfully.`,
    });
  };

  const updateSectionField = (section, field, value) => {
    if (!sections) return;
    
    setSections(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Website Content Editor</CardTitle>
          <CardDescription>Loading content...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If data failed to load or is empty
  if (!sections) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Website Content Editor</CardTitle>
          <CardDescription>
            Could not load content sections. Please refresh the page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Website Content Editor</CardTitle>
          <CardDescription>
            Update the main content sections of your school website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="mb-4">
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
              <TabsTrigger value="about">About Section</TabsTrigger>
              <TabsTrigger value="mission">Mission & Vision</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hero">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Heading</label>
                  <Input
                    value={sections.hero.title}
                    onChange={(e) => updateSectionField('hero', 'title', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={sections.hero.description}
                    onChange={(e) => updateSectionField('hero', 'description', e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Button Text</label>
                    <Input
                      value={sections.hero.buttonText}
                      onChange={(e) => updateSectionField('hero', 'buttonText', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Button Link</label>
                    <Input
                      value={sections.hero.buttonLink}
                      onChange={(e) => updateSectionField('hero', 'buttonLink', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="about">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Section Title</label>
                  <Input
                    value={sections.about.title}
                    onChange={(e) => updateSectionField('about', 'title', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={sections.about.description}
                    onChange={(e) => updateSectionField('about', 'description', e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Statistics</label>
                  <div className="grid grid-cols-2 gap-4">
                    {sections.about.stats.map((stat, index) => (
                      <div key={index} className="border rounded p-3">
                        <Input
                          className="mb-2"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...sections.about.stats];
                            newStats[index].value = e.target.value;
                            setSections(prev => ({
                              ...prev,
                              about: {
                                ...prev.about,
                                stats: newStats
                              }
                            }));
                          }}
                          placeholder="Value"
                        />
                        <Input
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...sections.about.stats];
                            newStats[index].label = e.target.value;
                            setSections(prev => ({
                              ...prev,
                              about: {
                                ...prev.about,
                                stats: newStats
                              }
                            }));
                          }}
                          placeholder="Label"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mission">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Section Title</label>
                  <Input
                    value={sections.mission.title}
                    onChange={(e) => updateSectionField('mission', 'title', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Mission Statement</label>
                  <Textarea
                    value={sections.mission.description}
                    onChange={(e) => updateSectionField('mission', 'description', e.target.value)}
                    rows={6}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveContent} className="bg-school-navy">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentEditor;
