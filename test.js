
// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchServices, addService, editService, removeService } from "@/redux/slices/serviceSlice";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const Service = () => {
//   const dispatch = useDispatch();
//   const { services, loading, error } = useSelector((state) => state.service);

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     id: null,
//     name: "",
//     title: "",
//     category: "",
//     description: "",
//     images: null,
//   });

//   useEffect(() => {
//     dispatch(fetchServices());
//   }, [dispatch]);

//   const openModal = (service = null) => {
//     if (service) {
//       setFormData({ ...service, images: null });
//     } else {
//       setFormData({ id: null, name: "", title: "", category: "", description: "", images: null });
//     }
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setFormData({ id: null, name: "", title: "", category: "", description: "", images: null });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
//       setFormData({ ...formData, images: file });
//     } else {
//       alert("Only image files (JPG, JPEG, PNG) are allowed.");
//       e.target.value = "";
//     }
//   };

//   const handleSubmit = () => {
//     if (formData.name && formData.title && formData.category && formData.description) {
//       const serviceData = { ...formData };
//       if (formData.id) {
//         dispatch(editService({ serviceId: formData.id, serviceData }));
//       } else {
//         dispatch(addService(serviceData));
//       }
//       closeModal();
//     } else {
//       alert("All fields are required.");
//     }
//   };

//   const handleDelete = (id) => {
//     dispatch(removeService(id));
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Manage Services</h1>
//         <Button onClick={() => openModal()}>+ Create New Service</Button>
//       </div>

//       {loading && <p>Loading services...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {services.map((service) => (
//           <Card key={service.serviceId}>
//             <CardHeader>
//               <CardTitle>{service.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p><strong>Title:</strong> {service.title}</p>
//               <p><strong>Category:</strong> {service.category}</p>
//               <p><strong>Description:</strong> {service.description}</p>
//               {service.images && (
//                 <img src={service.images[0]} alt="Service" className="mt-2 w-full h-32 object-cover rounded" />
//               )}
//               <div className="flex mt-4 space-x-2">
//                 <Button size="sm" onClick={() => openModal(service)}>Edit</Button>
//                 <Button size="sm" variant="destructive" onClick={() => handleDelete(service.serviceId)}>Delete</Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{formData.id ? "Edit Service" : "Add New Service"}</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <Label>Service Name</Label>
//               <Input
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 placeholder="Service Name"
//               />
//             </div>

//             <div>
//               <Label>Title</Label>
//               <Input
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 placeholder="Service Title"
//               />
//             </div>

//             <div>
//               <Label>Category</Label>
//               <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Development">Development</SelectItem>
//                   <SelectItem value="Marketing">Marketing</SelectItem>
//                   <SelectItem value="Design">Design</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label>Description</Label>
//               <Textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 placeholder="Service Description"
//               />
//             </div>

//             <div>
//               <Label>Upload Image</Label>
//               <Input type="file" accept="image/*" onChange={handleFileChange} />
//               {formData.images && (
//                 <img
//                   src={URL.createObjectURL(formData.images)}
//                   alt="Preview"
//                   className="mt-2 w-full h-32 object-cover rounded"
//                 />
//               )}
//             </div>

//             <div className="flex justify-end space-x-2">
//               <Button variant="outline" onClick={closeModal}>Cancel</Button>
//               <Button onClick={handleSubmit}>{formData.id ? "Update" : "Create"}</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Service;



"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, addService, editService, removeService } from "@/redux/slices/serviceSlice";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Service = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);

  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    title: "",
    category: "",
    description: "",
    images: null,
  });

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const openModal = (service = null) => {
    if (service) {
      setFormData({ ...service, images: null });
    } else {
      setFormData({ id: null, name: "", title: "", category: "", description: "", images: null });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ id: null, name: "", title: "", category: "", description: "", images: null });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setFormData({ ...formData, images: file });
    } else {
      alert("Only image files (JPG, JPEG, PNG) are allowed.");
      e.target.value = "";
    }
  };

  const handleSubmit = () => {
    if (formData.name && formData.title && formData.category && formData.description) {
      const serviceData = { ...formData };
      if (formData.id) {
        dispatch(editService({ serviceId: formData.id, serviceData }));
      } else {
        dispatch(addService(serviceData));
      }
      closeModal();
    } else {
      alert("All fields are required.");
    }
  };

  const handleDelete = (id) => {
    dispatch(removeService(id));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <Button onClick={() => openModal()}>+ Create New Service</Button>
      </div>

      {loading && <p>Loading services...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.serviceId}>
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Title:</strong> {service.title}</p>
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>Description:</strong> {service.description}</p>
              {service.images && (
                <img src={service.images} alt="Service" className="mt-2 w-full h-32 object-cover rounded" />
              )}
              <div className="flex mt-4 space-x-2">
                <Button size="sm" onClick={() => openModal(service)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(service.serviceId)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formData.id ? "Edit Service" : "Add New Service"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Service Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Service Name"
              />
            </div>

            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Service Title"
              />
            </div>

            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service Description"
              />
            </div>

            <div>
              <Label>Upload Image</Label>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {formData.images && (
                <img
                  src={URL.createObjectURL(formData.images)}
                  alt="Preview"
                  className="mt-2 w-full h-32 object-cover rounded"
                />
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              <Button onClick={handleSubmit}>{formData.id ? "Update" : "Create"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Service;

// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchServices, addService, editService, removeService } from "@/redux/slices/serviceSlice";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const Service = () => {
//   const dispatch = useDispatch();
//   const { services, loading, error } = useSelector((state) => state.service);

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     serviceId: null,
//     name: "",
//     title: "",
//     category: "",
//     description: "",
//     images: null,
//   });

//   useEffect(() => {
//     dispatch(fetchServices());
//   }, [dispatch,services]);

//   const openModal = (service = null) => {
//     if (service) {
//       setFormData({ ...service, images: null });
//     } else {
//       setFormData({ serviceId: null, name: "", title: "", category: "", description: "", images: null });
//     }
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setFormData({ serviceId: null, name: "", title: "", category: "", description: "", images: null });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
//       setFormData({ ...formData, images: file });
//     } else {
//       alert("Only image files (JPG, JPEG, PNG) are allowed.");
//       e.target.value = "";
//     }
//   };

//   const handleSubmit = () => {
//     if (formData.name && formData.title && formData.category && formData.description) {
//       const serviceData = { ...formData };
//       if (formData.serviceId) {
//         dispatch(editService({ serviceId: formData.serviceId, serviceData }));
//       } else {
//         dispatch(addService(serviceData));
//       }
//       closeModal();
//     } else {
//       alert("All fields are required.");
//     }
//   };

//   const handleDelete = (serviceId) => {
//     dispatch(removeService(serviceId));
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Manage Services</h1>
//         <Button onClick={() => openModal()}>+ Create New Service</Button>
//       </div>

//       {loading && <p>Loading services...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {services.map((service) => (
//           <Card key={service.serviceId}>
//             <CardHeader>
//               <CardTitle>{service.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p><strong>Title:</strong> {service.title}</p>
//               <p><strong>Category:</strong> {service.category}</p>
//               <p><strong>Description:</strong> {service.description}</p>
//               {service.images && service.images.map((img, index) => (
//                 <img key={index} src={img[0]} alt="Service" className="mt-2 w-full h-32 object-cover rounded" />
//               ))}
//               <div className="flex mt-4 space-x-2">
//                 <Button size="sm" onClick={() => openModal(service)}>Edit</Button>
//                 <Button size="sm" variant="destructive" onClick={() => handleDelete(service.serviceId)}>Delete</Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{formData.serviceId ? "Edit Service" : "Add New Service"}</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <Label>Service Name</Label>
//               <Input
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 placeholder="Service Name"
//               />
//             </div>

//             <div>
//               <Label>Title</Label>
//               <Input
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 placeholder="Service Title"
//               />
//             </div>

//             <div>
//               <Label>Category</Label>
//               <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Development">Development</SelectItem>
//                   <SelectItem value="Marketing">Marketing</SelectItem>
//                   <SelectItem value="Design">Design</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label>Description</Label>
//               <Textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 placeholder="Service Description"
//               />
//             </div>

//             <div>
//               <Label>Upload Image</Label>
//               <Input type="file" accept="image/*" onChange={handleFileChange} />
//               {formData.images && (
//                 <img
//                   src={URL.createObjectURL(formData.images)}
//                   alt="Preview"
//                   className="mt-2 w-full h-32 object-cover rounded"
//                 />
//               )}
//             </div>

//             <div className="flex justify-end space-x-2">
//               <Button variant="outline" onClick={closeModal}>Cancel</Button>
//               <Button onClick={handleSubmit}>{formData.serviceId ? "Update" : "Create"}</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Service;
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const AdminPage = () => {
  const [services, setServices] = useState([
    { id: 1, names: ["Web Development"], title: "Build Websites", category: "Development", description: "Full-stack web development.", image: null },
    { id: 2, names: ["SEO Optimization"], title: "Boost Rankings", category: "Marketing", description: "Improve search engine visibility.", image: null },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    names: [],
    title: "",
    category: "",
    description: "",
    image: null,
  });

  const [nameInput, setNameInput] = useState("");

  const openModal = (service = null) => {
    if (service) {
      setFormData(service);
      setNameInput("");
    } else {
      setFormData({ id: null, names: [], title: "", category: "", description: "", image: null });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ id: null, names: [], title: "", category: "", description: "", image: null });
    setNameInput("");
  };

  const handleAddName = () => {
    if (nameInput.trim() && !formData.names.includes(nameInput.trim())) {
      setFormData({ ...formData, names: [...formData.names, nameInput.trim()] });
      setNameInput("");
    }
  };

  const handleDeleteName = (name) => {
    setFormData({ ...formData, names: formData.names.filter((n) => n !== name) });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setFormData({ ...formData, image: file });
    } else {
      alert("Only image files (JPG, JPEG, PNG) are allowed.");
      e.target.value = "";
    }
  };

  const handleSubmit = () => {
    if (formData.names.length && formData.title && formData.category && formData.description && formData.image) {
      if (formData.id) {
        setServices((prev) => prev.map((s) => (s.id === formData.id ? formData : s)));
      } else {
        const newId = services.length ? Math.max(...services.map((s) => s.id)) + 1 : 1;
        setServices([...services, { ...formData, id: newId }]);
      }
      closeModal();
    } else {
      alert("All fields, including an image, are required.");
    }
  };

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <Button onClick={() => openModal()}>+ Create New Service</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle>{service.names.join(", ")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Title:</strong> {service.title}</p>
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>Description:</strong> {service.description}</p>
              {service.image && <img src={URL.createObjectURL(service.image)} alt="Service" className="mt-2 w-full h-32 object-cover rounded" />}
              <div className="flex mt-4 space-x-2">
                <Button size="sm" onClick={() => openModal(service)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(service.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formData.id ? "Edit Service" : "Add New Service"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name(s)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Add service name"
                />
                <Button size="sm" onClick={handleAddName}>Add</Button>
              </div>
              <div className="flex flex-wrap mt-2 gap-2">
                {formData.names.map((name) => (
                  <Badge key={name} className="flex items-center">
                    {name}
                    <X className="w-4 h-4 ml-1 cursor-pointer" onClick={() => handleDeleteName(name)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Service Title"
              />
            </div>

            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service Description"
              />
            </div>

            <div>
              <Label>Upload Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="mt-2 w-full h-32 object-cover rounded"
                />
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              <Button onClick={handleSubmit}>{formData.id ? "Update" : "Create"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;



// // pages/users.js
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

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold">User List</h1>
//       <div className="flex items-center space-x-4 mt-4">
//         <Input
//           placeholder="Search by username..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className=''>Register</Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Register New User</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="mt-4">
//               <div className="grid grid-cols-1 gap-4">
//                 <Label>Email</Label>
//                 <Input name="email" value={formData.email} onChange={handleChange} required />

//                 <Label>Username</Label>
//                 <Input name="username" value={formData.username} onChange={handleChange} required />

//                 <Label>Mobile</Label>
//                 <Input name="mob" value={formData.mob} onChange={handleChange} required />

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

//                 <Label>Date of Birth</Label>
//                 <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

//                 <Label>Password</Label>
//                 <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
//               </div>
//               <Button type="submit" className="mt-4">Register</Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//         {users
//           .filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
//           .map((user, index) => (
//             <Card key={index} className="p-4">
//               <h3 className="font-bold">{user.username}</h3>
//               <p>Email: {user.email}</p>
//               <p>Mobile: {user.mob}</p>
//               <p>Role: {user.role}</p>
//               <p>DOB: {user.dob}</p>
//               <p>Status: {user.active ? 'Active' : 'Inactive'}</p>
//               <div className="flex space-x-2 mt-2">
//                 <Button>Edit</Button>
//                 <Button onClick={() => handleActivateDeactivate(index)}>
//                   {user.active ? 'Deactivate' : 'Activate'}
//                 </Button>
//                 <Button onClick={() => handleDelete(index)} variant="destructive">Delete</Button>
//               </div>
//             </Card>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default UsersPage;
// pages/users.js
'use client'
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const UsersPage = () => {
  const initialUsers = JSON.parse(localStorage.getItem('users')) || [];
  const [users, setUsers] = useState(initialUsers);
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

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleActivateDeactivate = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].active = !updatedUsers[index].active;
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
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
    if (!formData.username || !formData.email || !formData.mob || !formData.role || !formData.dob || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    const updatedUsers = [...users, formData];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
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
    const updatedUsers = [...users];
    updatedUsers[editIndex] = formData;
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
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
                      <SelectItem value="editor">Editor</SelectItem>
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

      {/* Edit User Modal */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
                    <SelectItem value="editor">Editor</SelectItem>
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
            <Button type="submit" className="mt-4 w-full">Update User</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* User Table */}
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
                  <Button size="sm" onClick={() => handleActivateDeactivate(index)}>
                    {user.active ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(index)}>
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

export default UsersPage;
