
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
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash2, Plus, Image } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NewsManager = () => {
  const { toast } = useToast();
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Sample news items - in a real app, this would come from a database
  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      title: "Academy Students Win Regional Science Competition",
      date: "May 2, 2025",
      excerpt: "Our high school science team took first place in the regional science olympiad, advancing to the state finals.",
      content: "Our high school science team took first place in the regional science olympiad, advancing to the state finals. The team, led by Dr. Smith, competed against 15 other schools and excelled in all categories including physics, chemistry, and biology experiments.",
      image: "https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 2,
      title: "Annual Arts Festival Showcases Student Creativity",
      date: "April 15, 2025",
      excerpt: "The Spring Arts Festival featured impressive student work across visual arts, music, theater, and dance.",
      content: "The Spring Arts Festival featured impressive student work across visual arts, music, theater, and dance. Over 200 students participated, displaying their creative talents to the school community and beyond.",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ]);

  const [newItem, setNewItem] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleSaveNews = () => {
    if (editingId) {
      // Update existing news
      setNewsItems(prevItems => 
        prevItems.map(item => 
          item.id === editingId ? { ...item, ...newItem } : item
        )
      );
      toast({
        title: "News Updated",
        description: "The news article has been updated successfully."
      });
    } else {
      // Add new news
      const id = Math.max(0, ...newsItems.map(item => item.id)) + 1;
      const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      
      setNewsItems([
        {
          id,
          title: newItem.title,
          date: formattedDate,
          excerpt: newItem.excerpt,
          content: newItem.content,
          image: newItem.image || "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        ...newsItems
      ]);
      toast({
        title: "News Added",
        description: "The news article has been published successfully."
      });
    }
    
    // Reset form
    setNewItem({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      date: new Date().toISOString().split('T')[0]
    });
    setIsAddingNews(false);
    setEditingId(null);
  };

  const handleEditNews = (id: number) => {
    const itemToEdit = newsItems.find(item => item.id === id);
    if (itemToEdit) {
      setNewItem({
        title: itemToEdit.title,
        excerpt: itemToEdit.excerpt,
        content: itemToEdit.content,
        image: itemToEdit.image,
        date: new Date().toISOString().split('T')[0]
      });
      setEditingId(id);
      setIsAddingNews(true);
    }
  };

  const handleDeleteNews = (id: number) => {
    setNewsItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "News Deleted",
      description: "The news article has been deleted successfully."
    });
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>News & Announcements</CardTitle>
            <CardDescription>
              Manage news articles and announcements for the school website.
            </CardDescription>
          </div>
          {!isAddingNews && (
            <Button 
              onClick={() => setIsAddingNews(true)}
              className="bg-school-navy"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add News
            </Button>
          )}
        </CardHeader>
        
        <CardContent>
          {isAddingNews ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {editingId ? "Edit News Article" : "Add New Article"}
              </h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  placeholder="News title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <Textarea
                  value={newItem.excerpt}
                  onChange={(e) => setNewItem({...newItem, excerpt: e.target.value})}
                  placeholder="A brief summary (shown in listings)"
                  rows={2}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Full Content</label>
                <Textarea
                  value={newItem.content}
                  onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                  placeholder="Full article content"
                  rows={6}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <div className="flex space-x-2">
                  <Input
                    value={newItem.image}
                    onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                    placeholder="URL to image"
                  />
                  <Button variant="outline" className="flex-shrink-0">
                    <Image className="h-4 w-4 mr-1" /> Upload
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended image size: 1280x720 pixels
                </p>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingNews(false);
                    setEditingId(null);
                    setNewItem({
                      title: "",
                      excerpt: "",
                      content: "",
                      image: "",
                      date: new Date().toISOString().split('T')[0]
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveNews} className="bg-school-navy">
                  {editingId ? "Update Article" : "Publish Article"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {newsItems.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No news articles yet.</p>
                  <Button 
                    variant="link" 
                    onClick={() => setIsAddingNews(true)}
                  >
                    Add your first news article
                  </Button>
                </div>
              ) : (
                newsItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex flex-col md:flex-row border rounded-lg overflow-hidden"
                  >
                    <div className="w-full md:w-1/3 h-48 bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <div className="text-sm text-gray-500">{item.date}</div>
                      </div>
                      <p className="text-gray-600 mt-2 mb-4 flex-grow">{item.excerpt}</p>
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditNews(item.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-700" 
                          onClick={() => handleDeleteNews(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsManager;
