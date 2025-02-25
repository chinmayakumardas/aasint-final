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