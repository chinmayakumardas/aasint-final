
// 'use client'
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserDetails, editProfile } from '@/redux/slices/authSlice';
// import { Textarea } from '@/components/ui/textarea';  
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { toast } from 'react-toastify';
// const EditProfile = () => {
//   const dispatch = useDispatch();
//   const { userDetails, error } = useSelector((state) => state.auth);
//   const email = localStorage.getItem('email');

//   useEffect(() => {
//     if (email) {
//       dispatch(getUserDetails(email));
//     }
//   }, [dispatch, email]);

//   const userData = userDetails?.data;

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     bio: '',
//     role: '',
//   });

//   useEffect(() => {
//     if (userData) {
//       setFormData({
//         firstName: userData.firstName || '',
//         lastName: userData.lastName || '',
//         bio: userData.bio || '',
//         role: userData.role || '',
//       });
//     }
//   }, [userData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
// try{
//   dispatch(editProfile({ ...formData, email }));
//   toast.success("Update Sucessfully!");
// }catch(e){
//   toast.error("Error while Updating!")
// }
//   };

//   return (
//     <div className=" ">
//       <Card className="p-6  mx-auto rounded-none h-screen w-full">
//         <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

//         {error && <p className="text-red-500">{error}</p>}

//         <form onSubmit={handleSubmit} >
//           {/* Username (Read-Only) */}
//           <div className="mb-4">
//             <Label className="block text-sm font-medium">Username</Label>
//             <Input
//               type="text"
//               name="username"
//               value={userData?.username ? `@${userData.username}` : ''}
//               readOnly
//               className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           {/* Email (Read-Only) */}
//           <div className="mb-4">
//             <Label className="block text-sm font-medium">Email</Label>
//             <Input
//               type="text"
//               name="email"
//               value={userData?.email || ''}
//               readOnly
//               className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//           {/* First Name */}
//           <div className="mb-4">
//             <Label className="block text-sm font-medium">First Name</Label>
//             <Input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Last Name */}
//           <div className="mb-4">
//             <Label className="block text-sm font-medium">Last Name</Label>
//             <Input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>

         

        
//           {/* role (Read-Only) */}
//           <div className="mb-4">
//             <Label className="block text-sm font-medium">Role</Label>
//             <Input
//               type="text"
//               name="role"
//               value={userData?.role || ''}
//               readOnly
//               className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>

//            {/* Bio */}
//            <div className="mb-4 ">
//             <Label className="block text-sm font-medium">Bio</Label>
//             <Textarea
//               name="bio"
//               value={formData.bio}
//               onChange={handleChange}
//               className="w-full p-2 border rounded h-[30vh]"
//             />
//           </div>
//           {/* Submit Button */}
//           <Button type="submit" variant="editBtn">
//             Update Profile
//           </Button>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default EditProfile;

'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, editProfile } from '@/redux/slices/authSlice';
import { Textarea } from '@/components/ui/textarea';  
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { userDetails, error } = useSelector((state) => state.auth);
  const email = localStorage.getItem('email');
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    role: '',
  });

  useEffect(() => {
    if (email) {
      dispatch(getUserDetails(email));
    }
  }, [dispatch, email]);

  useEffect(() => {
    if (userDetails?.data) {
      setFormData({
        firstName: userDetails.data.firstName || '',
        lastName: userDetails.data.lastName || '',
        bio: userDetails.data.bio || '',
        role: userDetails.data.role || '',
      });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editProfile({ ...formData, email }));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (e) {
      toast.error("Error while updating profile!");
    }
  };

  return (
    <div className="">
      <Card className="p-6 mx-auto rounded-none h-screen w-full">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label>Username</Label>
            <Input type="text" value={userDetails?.data?.username ? `@${userDetails.data.username}` : ''} readOnly className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" />
          </div>

          <div className="mb-4">
            <Label>Email</Label>
            <Input type="text" value={userDetails?.data?.email || ''} readOnly className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" />
          </div>

          <div className="mb-4">
            <Label>First Name</Label>
            <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} disabled={!isEditing} className="w-full p-2 border rounded" />
          </div>

          <div className="mb-4">
            <Label>Last Name</Label>
            <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} disabled={!isEditing} className="w-full p-2 border rounded" />
          </div>

          <div className="mb-4">
            <Label>Role</Label>
            <Input type="text" value={formData.role} readOnly className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" />
          </div>

          <div className="mb-4">
            <Label>Bio</Label>
            <Textarea name="bio" value={formData.bio} onChange={handleChange} disabled={!isEditing} className="w-full p-2 border rounded h-[30vh]" />
          </div>

          <Button type="button" onClick={() => setIsEditing(!isEditing)} variant="editBtn" className="mr-2">
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing && <Button type="submit" variant="editBtn">Update</Button>}
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;