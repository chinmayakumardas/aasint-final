'use client';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser, registerUser, updateUser } from '@/redux/slices/authSlice'; // Import the necessary async thunks

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const dispatch = useDispatch();
  
  // Fetching users from Redux store
  const { users, loading, error } = useSelector((state) => state.auth);

  // Fetch all users when the component mounts
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    // Dispatch a delete user action with the user's ID
    dispatch(deleteUser(userId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.role || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    // Dispatch action to create a new user
    dispatch(registerUser(formData));
    setFormData({ username: '', email: '', role: '', password: '' });
    setIsDialogOpen(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData({ ...users[index] });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Dispatch action to update the user data
    dispatch(updateUser(editIndex, formData));
    setFormData({ username: '', email: '', role: '', password: '' });
    setIsEditDialogOpen(false);
    setEditIndex(null);
  };

  // Add a check for undefined or null `users`
  const filteredUsers = (Array.isArray(users) ? users : []).filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {/* Search and Register Section */}
      <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Register New User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                  <Label>Username</Label>
                  <Input name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div>
                  <Label>Role</Label>
                  <Select value={formData.role} onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="author">Author</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Password</Label>
                  <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
              </div>
              <Button type="submit" className="mt-4 w-full">Register</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* User List as Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          filteredUsers.map((user, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Status:</strong> {user.active ? 'Active' : 'Inactive'}</p>
              <div className="mt-4 space-x-2">
                <Button size="sm" onClick={() => handleEdit(index)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)}>Delete</Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
          {/* No need to add anything inside the trigger */}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Email</Label>
                <Input name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div>
                <Label>Username</Label>
                <Input name="username" value={formData.username} onChange={handleChange} required disabled />
              </div>

              <div>
                <Label>Role</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Password</Label>
                <Input type="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
            </div>
            <Button type="submit" className="mt-4 w-full">Update</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersList;
