// 'use client'
// import { useState } from 'react';
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// const UsersPage = () => {
//   const initialUsers = JSON.parse(localStorage.getItem('users')) || [];
//   const [users, setUsers] = useState(initialUsers);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     mob: '',
//     role: '',
//     dob: '',
//     password: '',
//     active: true
//   });
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);

//   const handleDelete = (index) => {
//     const updatedUsers = users.filter((_, i) => i !== index);
//     setUsers(updatedUsers);
//     localStorage.setItem('users', JSON.stringify(updatedUsers));
//   };

//   const handleActivateDeactivate = (index) => {
//     const updatedUsers = [...users];
//     updatedUsers[index].active = !updatedUsers[index].active;
//     setUsers(updatedUsers);
//     localStorage.setItem('users', JSON.stringify(updatedUsers));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleRoleChange = (value) => {
//     setFormData({ ...formData, role: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.username || !formData.email || !formData.mob || !formData.role || !formData.dob || !formData.password) {
//       alert("Please fill in all fields");
//       return;
//     }
//     const updatedUsers = [...users, formData];
//     setUsers(updatedUsers);
//     localStorage.setItem('users', JSON.stringify(updatedUsers));
//     setFormData({ username: '', email: '', mob: '', role: '', dob: '', password: '', active: true });
//     setIsDialogOpen(false);
//   };

//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setFormData(users[index]);
//     setIsEditDialogOpen(true);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     const updatedUsers = [...users];
//     updatedUsers[editIndex] = formData;
//     setUsers(updatedUsers);
//     localStorage.setItem('users', JSON.stringify(updatedUsers));
//     setFormData({ username: '', email: '', mob: '', role: '', dob: '', password: '', active: true });
//     setIsEditDialogOpen(false);
//     setEditIndex(null);
//   };

//   const filteredUsers = users.filter(user =>
//     user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">User Management</h1>

//       {/* Search and Register Section */}
//       <div className="flex items-center justify-between mb-6">
//         <Input
//           placeholder="Search by username or email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-1/2"
//         />
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>Register New User</Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Register New User</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="mt-4">
//               <div className="grid grid-cols-1 gap-4">
//                 <div>
//                   <Label>Email</Label>
//                   <Input name="email" value={formData.email} onChange={handleChange} required />
//                 </div>

//                 <div>
//                   <Label>Username</Label>
//                   <Input name="username" value={formData.username} onChange={handleChange} required />
//                 </div>

//                 <div>
//                   <Label>Mobile</Label>
//                   <Input name="mob" value={formData.mob} onChange={handleChange} required />
//                 </div>

//                 <div>
//                   <Label>Role</Label>
//                   <Select value={formData.role} onValueChange={handleRoleChange}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Role" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="author">Author</SelectItem>
//                       <SelectItem value="editor">Editor</SelectItem>
//                       <SelectItem value="admin">Admin</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label>Date of Birth</Label>
//                   <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
//                 </div>

//                 <div>
//                   <Label>Password</Label>
//                   <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
//                 </div>
//               </div>
//               <Button type="submit" className="mt-4 w-full">Register</Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Edit User Modal */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit User</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleUpdate} className="mt-4">
//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <Label>Email</Label>
//                 <Input name="email" value={formData.email} onChange={handleChange} required />
//               </div>

//               <div>
//                 <Label>Username</Label>
//                 <Input name="username" value={formData.username} onChange={handleChange} required />
//               </div>

//               <div>
//                 <Label>Mobile</Label>
//                 <Input name="mob" value={formData.mob} onChange={handleChange} required />
//               </div>

//               <div>
//                 <Label>Role</Label>
//                 <Select value={formData.role} onValueChange={handleRoleChange}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select Role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="author">Author</SelectItem>
//                     <SelectItem value="editor">Editor</SelectItem>
//                     <SelectItem value="admin">Admin</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label>Date of Birth</Label>
//                 <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
//               </div>

//               <div>
//                 <Label>Password</Label>
//                 <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
//               </div>
//             </div>
//             <Button type="submit" className="mt-4 w-full">Update User</Button>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* User Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">Username</th>
//               <th className="border border-gray-300 p-2">Email</th>
//               <th className="border border-gray-300 p-2">Mobile</th>
//               <th className="border border-gray-300 p-2">Role</th>
//               <th className="border border-gray-300 p-2">DOB</th>
//               <th className="border border-gray-300 p-2">Status</th>
//               <th className="border border-gray-300 p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user, index) => (
//               <tr key={index} className="odd:bg-white even:bg-gray-100">
//                 <td className="border border-gray-300 p-2">{user.username}</td>
//                 <td className="border border-gray-300 p-2">{user.email}</td>
//                 <td className="border border-gray-300 p-2">{user.mob}</td>
//                 <td className="border border-gray-300 p-2">{user.role}</td>
//                 <td className="border border-gray-300 p-2">{user.dob}</td>
//                 <td className="border border-gray-300 p-2">{user.active ? 'Active' : 'Inactive'}</td>
//                 <td className="border border-gray-300 p-2 flex space-x-2">
//                   <Button size="sm" onClick={() => handleEdit(index)}>Edit</Button>
//                   <Button size="sm" onClick={() => handleActivateDeactivate(index)}>
//                     {user.active ? 'Deactivate' : 'Activate'}
//                   </Button>
//                   <Button size="sm" variant="destructive" onClick={() => handleDelete(index)}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {filteredUsers.length === 0 && (
//           <p className="text-center mt-4">No users found matching the search criteria.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersPage;



// "use client";

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers } from "@/redux/slices/userSlice";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2, AlertCircle } from "lucide-react";

// const UserCard = ({ user }) => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>{user.username}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p>Email: {user.email}</p>
//         <p>Mobile: {user.mob}</p>
//         <p>Role: {user.role}</p>
//         <p>DOB: {user.dob}</p>
//         <p>Password: {user.password ? "******" : "Not Set"}</p>
//         <p>Status: {user.active ? "Active" : "Inactive"}</p>
//       </CardContent>
//     </Card>
//   );
// };

// const UserList = () => {
//   const dispatch = useDispatch();
//   const { users, loading, error } = useSelector((state) => state.users);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">User List</h1>

//       {loading && (
//         <div className="flex items-center justify-center">
//           <Loader2 className="animate-spin" size={24} />
//           <span className="ml-2">Loading users...</span>
//         </div>
//       )}

//       {error && (
//         <div className="flex items-center text-red-500">
//           <AlertCircle size={24} />
//           <span className="ml-2">{error}</span>
//         </div>
//       )}

//       {!loading && !error && users?.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {users.map((user) => (
//             <UserCard key={user.id} user={user} />
//           ))}
//         </div>
//       ) : (
//         !loading && <p>No users found.</p>
//       )}
//     </div>
//   );
// };

// export default UserList;

// src/components/UserList.js
'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, deleteUser, toggleUserStatus } from '@/redux/slices/userSlice';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const UserList = () => {
  const dispatch = useDispatch();
  //const users = useSelector((state) => state.users.users);
  const { users, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mob: '',
    role: '',
    dob: '',
    password: '',
    active: true
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.mob || !formData.role || !formData.dob || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    dispatch(addUser(formData));
    setFormData({ username: '', email: '', mob: '', role: '', dob: '', password: '', active: true });
    setIsDialogOpen(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(users[index]);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({ index: editIndex, user: formData }));
    setFormData({ username: '', email: '', mob: '', role: '', dob: '', password: '', active: true });
    setIsEditDialogOpen(false);
    setEditIndex(null);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
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
                  <Label>Mobile</Label>
                  <Input name="mob" value={formData.mob} onChange={handleChange} required />
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
                  <Label>Date of Birth</Label>
                  <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
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

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Username</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Mobile</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">DOB</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-300 p-2">{user.username}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.mob}</td>
                <td className="border border-gray-300 p-2">{user.role}</td>
                <td className="border border-gray-300 p-2">{user.dob}</td>
                <td className="border border-gray-300 p-2">{user.active ? 'Active' : 'Inactive'}</td>
                <td className="border border-gray-300 p-2 flex space-x-2">
                  <Button size="sm" onClick={() => handleEdit(index)}>Edit</Button>
                  <Button size="sm" onClick={() => dispatch(toggleUserStatus(index))}>
                    {user.active ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => dispatch(deleteUser(index))}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="text-center mt-4">No users found matching the search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;