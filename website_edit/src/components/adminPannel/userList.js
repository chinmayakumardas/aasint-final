// 'use client';
// import { useState, useEffect } from 'react';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllUsers, registerUser, editProfile } from '@/redux/slices/authSlice'; 
// import { toast } from 'react-toastify';
// import { FiEye, FiEyeOff } from 'react-icons/fi';

// const UsersList = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     username: '', email: '', role: '', password: '', firstName: '', lastName: '', bio: ''
//   });
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const { users } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(getAllUsers());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRoleChange = (value) => {
//     setFormData({ ...formData, role: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.username || !formData.email || !formData.role || !formData.password || !formData.firstName || !formData.lastName || !formData.bio) {
//       toast.error("Please fill in all fields");
//       return;
//     }
//     dispatch(registerUser(formData)).then(() => {
//       toast.success("User registered successfully!");
//       setIsDialogOpen(false);
//       setFormData({ username: '', email: '', role: '', password: '', firstName: '', lastName: '', bio: '' });
//     }).catch(() => {
//       toast.error("Error registering user!");
//     });
//   };

//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setFormData({ ...users[index], password: '' });
//     setIsEditDialogOpen(true);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     dispatch(editProfile(formData)).then(() => {
//       toast.success("User updated successfully!");
//       setIsEditDialogOpen(false);
//       setEditIndex(null);
//     }).catch(() => {
//       toast.error("Error updating user!");
//     });
//   };

//   const filteredUsers = (Array.isArray(users) ? users : []).filter(user =>
//     user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex items-center justify-between mb-6">
//         <Input
//           placeholder="Search by username or email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-1/2"
//         />
//         <Button onClick={() => setIsDialogOpen(true)}>Register</Button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-300 text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 border">Username</th>
//               <th className="p-3 border">Full Name</th>
//               <th className="p-3 border">Email</th>
//               <th className="p-3 border">Role</th>
//               <th className="p-3 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.length === 0 ? (
//               <tr><td colSpan="5" className="p-3 text-center">No users found</td></tr>
//             ) : (
//               filteredUsers.map((user, index) => (
//                 <tr key={index} className="border">
//                   <td className="p-3 border">{user.username}</td>
//                   <td className="p-3 border">{user.firstName} {user.lastName}</td>
//                   <td className="p-3 border">{user.email}</td>
//                   <td className="p-3 border">{user.role}</td>
//                   <td className="p-3 border">
//                     <Button size="sm" onClick={() => handleEdit(index)}>Edit</Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Register User Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Register New User</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit}>
//             <Label>Email</Label>
//             <Input name="email" value={formData.email} onChange={handleChange} required />
//             <Label>Username</Label>
//             <Input name="username" value={formData.username} onChange={handleChange} required />
//             <Label>Password</Label>
//             <Input name="password" type="password" value={formData.password} onChange={handleChange} required />
//             <Button type="submit">Register</Button>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Edit User Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit User</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleUpdate}>
//             <Label>First Name</Label>
//             <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
//             <Label>Last Name</Label>
//             <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
//             <Label>Bio</Label>
//             <Input name="bio" value={formData.bio} onChange={handleChange} required />
//             <Button type="submit">Update</Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UsersList;








// 'use client';
// import { useState, useEffect } from 'react';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllUsers, registerUser, editProfile } from '@/redux/slices/authSlice';
// import { toast } from 'react-toastify';
// import { FiEye, FiEyeOff } from 'react-icons/fi';

// const UsersList = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     role: '',
//     password: '',
//     firstName: '',
//     lastName: '',
//     bio: ''
//   });
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [editUser, setEditUser] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const { users } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(getAllUsers());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleRoleChange = (value) => {
//     setFormData({ ...formData, role: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.username || !formData.email || !formData.role || !formData.password || !formData.firstName || !formData.lastName || !formData.bio) {
//       toast.error("Please fill in all fields");
//       return;
//     }
//     try {
//       await dispatch(registerUser(formData)).unwrap();
//       toast.success("User registered successfully!");
//       setIsDialogOpen(false);
//       setFormData({ username: '', email: '', role: '', password: '', firstName: '', lastName: '', bio: '' });
//     } catch {
//       toast.error("Error registering user!");
//     }
//   };

//   const handleEdit = (user) => {
//     setEditUser(user);
//     setFormData(user);
//     setIsEditDialogOpen(true);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(editProfile(formData)).unwrap();
//       toast.success("User updated successfully!");
//       setIsEditDialogOpen(false);
//       setEditUser(null);
//     } catch {
//       toast.error("Error updating user!");
//     }
//   };

//   const filteredUsers = users?.filter(user =>
//     user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   ) || [];

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex items-center justify-between mb-6">
//         <Input
//           placeholder="Search by username or email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-1/2"
//         />
//         <Button onClick={() => setIsDialogOpen(true)}>Register</Button>
//       </div>

//       {/* Table for larger screens */}
//       <div className="hidden md:block">
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="p-2 border">Username</th>
//               <th className="p-2 border">Full Name</th>
//               <th className="p-2 border">Email</th>
//               <th className="p-2 border">Role</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user, index) => (
//               <tr key={index} className="border">
//                 <td className="p-2 border">{user.username}</td>
//                 <td className="p-2 border">{user.firstName} {user.lastName}</td>
//                 <td className="p-2 border">{user.email}</td>
//                 <td className="p-2 border">{user.role}</td>
//                 <td className="p-2 border">
//                   <Button size="sm" onClick={() => handleEdit(user)}>Edit</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Cards for small screens */}
//       <div className="md:hidden grid gap-4">
//         {filteredUsers.map((user, index) => (
//           <div key={index} className="border p-4 rounded-md shadow">
//             <p><strong>Username:</strong> {user.username}</p>
//             <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Role:</strong> {user.role}</p>
//             <Button size="sm" onClick={() => handleEdit(user)}>Edit</Button>
//           </div>
//         ))}
//       </div>

//       {/* Edit User Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit User</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleUpdate} className="grid gap-4">
//             <Label>Email</Label>
//             <Input name="email" value={formData.email} onChange={handleChange} required />
//             <Label>First Name</Label>
//             <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
//             <Label>Last Name</Label>
//             <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
//             <Label>Bio</Label>
//             <Input name="bio" value={formData.bio} onChange={handleChange} required />
//             <Label>Role</Label>
//             <Select value={formData.role} onValueChange={handleRoleChange}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="author">Author</SelectItem>
//                 <SelectItem value="admin">Admin</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button type="submit">Update</Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UsersList;





'use client';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, registerUser, editProfile } from '@/redux/slices/authSlice'; 
import { toast } from 'react-toastify'; // Importing toastify
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Importing eye icons for toggle

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
    firstName: '',
    lastName: '',
    bio: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Register modal state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Edit modal state
  const [editIndex, setEditIndex] = useState(null); // Index to track which user is being edited
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const dispatch = useDispatch();
  
  // Fetching users from Redux store
  const { users, loading, error } = useSelector((state) => state.auth);

  // Fetch all users when the component mounts
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.role || !formData.password || !formData.firstName || !formData.lastName || !formData.bio) {
      toast.error("Please fill in all fields");
      return;
    }
    // Dispatch action to create a new user
    dispatch(registerUser(formData))
      .then(() => {
        toast.success("User registered successfully!");
        setFormData({ username: '', email: '', role: '', password: '', firstName: '', lastName: '', bio: '' }); // Clear form after registration
        setIsDialogOpen(false);
      })
      .catch((err) => {
        toast.error("Error registering user!");
      });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    // Populate form data with existing user data except for fields like password or username
    setFormData({ 
     
      //username: users[index].username,
      email: users[index].email,
      firstName: users[index].firstName,
      lastName: users[index].lastName,
      bio: users[index].bio,
      role: users[index].role,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Dispatch action to update the user data (do not include password for editing)
    const updatedUser = {
      //username:formData.username,
      email:formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      bio: formData.bio,
      role: formData.role,
    };
  
    dispatch(editProfile(updatedUser))
      .then(() => {
        toast.success("User updated successfully!");
        setFormData({  role: '', firstName: '',email:'', lastName: '',username:'', bio: '' }); // Clear form after update
        setIsEditDialogOpen(false);
        setEditIndex(null);
      })
      .catch((err) => {
        toast.error("Error updating user. Please try again.");
      });
  };
  
  const handleCreate = () => {
    setFormData({ username: '', email: '', role: '', password: '', firstName: '', lastName: '', bio: '' });
    setIsDialogOpen(true);
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
        <Button variant="createBtn" onClick={handleCreate}>Register</Button>
      </div>

      {/* User List as Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          filteredUsers.map((user, index) => (
            <div key={index} className="border p-4 rounded-md shadow">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Full Name</strong> {user.firstName+" "+user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              
              <div className="mt-4 space-x-2">
                <Button variant="createBtn" size="sm" onClick={() => handleEdit(index)}>Edit</Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Register User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {/* Button to open the Register modal */}
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
                <Label>First Name</Label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>

              <div>
                <Label>Last Name</Label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>

              <div>
                <Label>Bio</Label>
                <Input name="bio" value={formData.bio} onChange={handleChange} required />
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

              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <Button variant="createBtn" type="submit" className="mt-4 ">Register</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
          {/* No need for a trigger here */}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              

              <div>
                <Label>First Name</Label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>

              <div>
                <Label>Last Name</Label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>

              <div>
                <Label>Bio</Label>
                <Input name="bio" value={formData.bio} onChange={handleChange} required />
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
            </div>
            <Button variant="createBtn" type="submit" className="mt-4 ">Update</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersList;

