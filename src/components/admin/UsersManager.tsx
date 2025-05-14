
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, UserPlus, Edit, Trash2, Users, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UsersManager = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Sample users - in a real app, this would come from a database
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "admin",
      department: "Administration",
      status: "active"
    },
    {
      id: 2,
      name: "John Davis",
      email: "john.davis@example.com",
      role: "teacher",
      department: "Science",
      status: "active"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "staff",
      department: "Office",
      status: "active"
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "m.brown@example.com",
      role: "teacher",
      department: "Mathematics",
      status: "inactive"
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "staff",
    department: "",
    password: "",
    status: "active"
  });

  const handleSaveUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast({
        variant: "destructive",
        title: "Required fields missing",
        description: "Please fill in all required fields."
      });
      return;
    }

    if (editingId) {
      // Update existing user
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === editingId ? { 
            ...user, 
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            department: newUser.department,
            status: newUser.status
          } : user
        )
      );
      toast({
        title: "User Updated",
        description: "The user has been updated successfully."
      });
    } else {
      // Add new user
      const id = Math.max(0, ...users.map(user => user.id)) + 1;
      setUsers([
        ...users,
        {
          id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          department: newUser.department,
          status: newUser.status
        }
      ]);
      toast({
        title: "User Added",
        description: "The new user has been added successfully."
      });
    }
    
    // Reset form and close dialog
    setNewUser({
      name: "",
      email: "",
      role: "staff",
      department: "",
      password: "",
      status: "active"
    });
    setIsDialogOpen(false);
    setEditingId(null);
  };

  const handleEditUser = (user: any) => {
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      password: "",
      status: user.status
    });
    setEditingId(user.id);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    toast({
      title: "User Deleted",
      description: "The user has been removed from the system."
    });
  };

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesFilter;
  });

  // Role display mapping
  const roleDisplay: Record<string, string> = {
    'admin': 'Administrator',
    'teacher': 'Teacher',
    'staff': 'Staff Member'
  };

  // Status badge colors
  const statusColor: Record<string, string> = {
    'active': 'bg-green-100 text-green-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'suspended': 'bg-red-100 text-red-800'
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage administrators, teachers, and staff accounts.
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  className="pl-9 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" /> Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setFilterRole('all')}>
                    All Roles
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole('admin')}>
                    Administrators
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole('teacher')}>
                    Teachers
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole('staff')}>
                    Staff
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-school-navy w-full sm:w-auto">
                    <UserPlus className="h-4 w-4 mr-2" /> Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingId ? "Edit User" : "Add New User"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingId 
                        ? "Update user information and permissions." 
                        : "Create a new user account and set their role."
                      }
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="text-sm font-medium">Full Name*</label>
                        <Input
                          value={newUser.name}
                          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                          placeholder="John Smith"
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <label className="text-sm font-medium">Email Address*</label>
                        <Input
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          placeholder="john.smith@example.com"
                        />
                      </div>
                      
                      {!editingId && (
                        <div className="col-span-2">
                          <label className="text-sm font-medium">Password*</label>
                          <Input
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                            placeholder="Set a secure password"
                          />
                        </div>
                      )}
                      
                      <div>
                        <label className="text-sm font-medium">Role*</label>
                        <Select 
                          value={newUser.role} 
                          onValueChange={(value) => setNewUser({...newUser, role: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Roles</SelectLabel>
                              <SelectItem value="admin">Administrator</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="staff">Staff</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Department</label>
                        <Input
                          value={newUser.department}
                          onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                          placeholder="e.g. Science Department"
                        />
                      </div>
                      
                      {editingId && (
                        <div>
                          <label className="text-sm font-medium">Status</label>
                          <Select 
                            value={newUser.status} 
                            onValueChange={(value) => setNewUser({...newUser, status: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setIsDialogOpen(false);
                      setEditingId(null);
                      setNewUser({
                        name: "",
                        email: "",
                        role: "staff",
                        department: "",
                        password: "",
                        status: "active"
                      });
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveUser} className="bg-school-navy">
                      {editingId ? "Save Changes" : "Add User"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {users.length > 0 ? (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{roleDisplay[user.role] || user.role}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColor[user.status] || 'bg-gray-100'}`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">
                          No users found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="text-sm text-gray-500 mt-2 flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>
                  {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} 
                  {filterRole !== 'all' ? ` (filtered by ${roleDisplay[filterRole] || filterRole})` : ''}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No users yet</h3>
              <p className="mt-2 text-gray-500">
                Get started by adding your first user to the system.
              </p>
              <Button 
                className="mt-4 bg-school-navy"
                onClick={() => setIsDialogOpen(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" /> Add User
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManager;
