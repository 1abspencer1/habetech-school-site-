import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash2, Plus, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAdminSync, { AcademicProgram, Course } from '@/hooks/useAdminSync';

const AcademicsManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("programs");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { getAcademicPrograms, updateAcademicPrograms, getCourses, updateCourses } = useAdminSync();

  // Use the useAdminSync hook to get and update data
  const [programs, setPrograms] = useState<AcademicProgram[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  
  // Load programs and courses on component mount
  useEffect(() => {
    setPrograms(getAcademicPrograms());
    setCourses(getCourses());
  }, [getAcademicPrograms, getCourses]);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    grades: "",
    department: "",
    grade: "",
    features: [] as string[]
  });

  // Handle saving program or course
  const handleSaveItem = () => {
    if (activeTab === "programs") {
      if (!newItem.name || !newItem.description || !newItem.grades) {
        toast({
          variant: "destructive",
          title: "Required fields missing",
          description: "Please fill in all required fields."
        });
        return;
      }

      let updatedPrograms: AcademicProgram[];
      
      if (editingId) {
        // Update existing program
        updatedPrograms = programs.map(item => 
          item.id === editingId ? { 
            ...item, 
            name: newItem.name,
            description: newItem.description,
            grades: newItem.grades,
            features: newItem.features
          } : item
        );
        toast({
          title: "Program Updated",
          description: "The academic program has been updated successfully."
        });
      } else {
        // Add new program
        const id = Math.max(0, ...programs.map(item => item.id)) + 1;
        updatedPrograms = [
          ...programs,
          {
            id,
            name: newItem.name,
            description: newItem.description,
            grades: newItem.grades,
            features: newItem.features
          }
        ];
        toast({
          title: "Program Added",
          description: "The new academic program has been added successfully."
        });
      }
      
      // Update state and persist
      setPrograms(updatedPrograms);
      updateAcademicPrograms(updatedPrograms);
      
    } else if (activeTab === "courses") {
      if (!newItem.name || !newItem.description || !newItem.department) {
        toast({
          variant: "destructive",
          title: "Required fields missing",
          description: "Please fill in all required fields."
        });
        return;
      }

      let updatedCourses: Course[];
      
      if (editingId) {
        // Update existing course
        updatedCourses = courses.map(item => 
          item.id === editingId ? { 
            ...item, 
            name: newItem.name,
            description: newItem.description,
            department: newItem.department,
            grade: newItem.grade
          } : item
        );
        toast({
          title: "Course Updated",
          description: "The course has been updated successfully."
        });
      } else {
        // Add new course
        const id = Math.max(0, ...courses.map(item => item.id)) + 1;
        updatedCourses = [
          ...courses,
          {
            id,
            name: newItem.name,
            description: newItem.description,
            department: newItem.department,
            grade: newItem.grade
          }
        ];
        toast({
          title: "Course Added",
          description: "The new course has been added successfully."
        });
      }
      
      // Update state and persist
      setCourses(updatedCourses);
      updateCourses(updatedCourses);
    }
    
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setNewItem({
      name: "",
      description: "",
      grades: "",
      department: "",
      grade: "",
      features: []
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEditItem = (id: number) => {
    if (activeTab === "programs") {
      const programToEdit = programs.find(item => item.id === id);
      if (programToEdit) {
        setNewItem({
          name: programToEdit.name,
          description: programToEdit.description,
          grades: programToEdit.grades,
          features: programToEdit.features,
          department: "",
          grade: ""
        });
      }
    } else if (activeTab === "courses") {
      const courseToEdit = courses.find(item => item.id === id);
      if (courseToEdit) {
        setNewItem({
          name: courseToEdit.name,
          description: courseToEdit.description,
          department: courseToEdit.department,
          grade: courseToEdit.grade,
          grades: "",
          features: []
        });
      }
    }
    setEditingId(id);
    setIsEditing(true);
  };

  const handleDeleteItem = (id: number) => {
    if (activeTab === "programs") {
      setPrograms(prevItems => prevItems.filter(item => item.id !== id));
      toast({
        title: "Program Deleted",
        description: "The academic program has been deleted successfully."
      });
    } else if (activeTab === "courses") {
      setCourses(prevItems => prevItems.filter(item => item.id !== id));
      toast({
        title: "Course Deleted",
        description: "The course has been deleted successfully."
      });
    }
  };

  const handleAddFeature = () => {
    const featureInput = document.getElementById('feature-input') as HTMLInputElement;
    if (featureInput && featureInput.value.trim()) {
      setNewItem({
        ...newItem,
        features: [...newItem.features, featureInput.value.trim()]
      });
      featureInput.value = '';
    }
  };

  const handleRemoveFeature = (index: number) => {
    setNewItem({
      ...newItem,
      features: newItem.features.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Academic Programs Management</CardTitle>
            <CardDescription>
              Manage academic programs, courses, and curriculum information.
            </CardDescription>
          </div>
          {!isEditing && (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-school-navy"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add {activeTab === "programs" ? "Program" : "Course"}
            </Button>
          )}
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="programs" onClick={() => { if (isEditing) resetForm(); }}>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Programs</span>
              </TabsTrigger>
              <TabsTrigger value="courses" onClick={() => { if (isEditing) resetForm(); }}>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Courses</span>
              </TabsTrigger>
            </TabsList>
            
            {isEditing ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {editingId ? `Edit ${activeTab === "programs" ? "Program" : "Course"}` : `Add New ${activeTab === "programs" ? "Program" : "Course"}`}
                </h3>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Name*</label>
                  <Input
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    placeholder={`${activeTab === "programs" ? "Program" : "Course"} name`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description*</label>
                  <Textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    placeholder="Detailed description"
                    rows={4}
                  />
                </div>
                
                {activeTab === "programs" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Grade Levels*</label>
                      <Input
                        value={newItem.grades}
                        onChange={(e) => setNewItem({...newItem, grades: e.target.value})}
                        placeholder="e.g. K-5, 6-8, 9-12"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Program Features</label>
                      <div className="flex space-x-2 mb-2">
                        <Input
                          id="feature-input"
                          placeholder="Add program feature"
                          className="flex-grow"
                        />
                        <Button 
                          type="button" 
                          onClick={handleAddFeature}
                          variant="outline"
                        >
                          Add
                        </Button>
                      </div>
                      
                      {newItem.features.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {newItem.features.map((feature, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span>{feature}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-500"
                                onClick={() => handleRemoveFeature(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Department*</label>
                      <Input
                        value={newItem.department}
                        onChange={(e) => setNewItem({...newItem, department: e.target.value})}
                        placeholder="e.g. Mathematics, Science, English"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Grade Level*</label>
                      <Input
                        value={newItem.grade}
                        onChange={(e) => setNewItem({...newItem, grade: e.target.value})}
                        placeholder="e.g. Elementary, Middle School, High School"
                      />
                    </div>
                  </>
                )}
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveItem} className="bg-school-navy">
                    {editingId ? "Update" : "Save"}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Programs Tab Content */}
                <TabsContent value="programs">
                  <div className="space-y-4">
                    {programs.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No academic programs defined yet.</p>
                        <Button 
                          variant="link" 
                          onClick={() => setIsEditing(true)}
                        >
                          Add your first academic program
                        </Button>
                      </div>
                    ) : (
                      programs.map((program) => (
                        <Card key={program.id} className="bg-white shadow-sm hover:shadow transition-shadow">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{program.name}</CardTitle>
                                <p className="text-sm font-medium text-gray-500">Grades: {program.grades}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleEditItem(program.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-500" 
                                  onClick={() => handleDeleteItem(program.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 mb-4">{program.description}</p>
                            {program.features && program.features.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-2">Program Features:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {program.features.map((feature, idx) => (
                                    <li key={idx} className="text-gray-600">{feature}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </TabsContent>
                
                {/* Courses Tab Content */}
                <TabsContent value="courses">
                  <div className="space-y-4">
                    {courses.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No courses defined yet.</p>
                        <Button 
                          variant="link" 
                          onClick={() => setIsEditing(true)}
                        >
                          Add your first course
                        </Button>
                      </div>
                    ) : (
                      courses.map((course) => (
                        <div 
                          key={course.id}
                          className="border rounded-lg p-4 bg-white shadow-sm hover:shadow transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{course.name}</h3>
                              <div className="flex flex-wrap text-sm text-gray-600 mt-1">
                                <span className="mr-4">{course.department}</span>
                                <span>{course.grade}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEditItem(course.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500" 
                                onClick={() => handleDeleteItem(course.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-600 mt-2">{course.description}</p>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              </>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicsManager;
