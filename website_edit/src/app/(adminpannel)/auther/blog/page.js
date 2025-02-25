// // pages/blog.js
// 'use client'
// import { useState } from 'react';
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import Link from 'next/link';

// const PAGE_SIZE = 5; // Number of blogs per page

// const blogs = [
//   { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
//   { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.' },
//   { id: 3, title: 'Third Blog Post', content: 'This is the content of the third blog post.' },
//   { id: 4, title: 'Fourth Blog Post', content: 'This is the content of the fourth blog post.' },
//   { id: 5, title: 'Fifth Blog Post', content: 'This is the content of the fifth blog post.' },
//   { id: 6, title: 'Sixth Blog Post', content: 'This is the content of the sixth blog post.' },
//   { id: 7, title: 'Seventh Blog Post', content: 'This is the content of the seventh blog post.' },
//   { id: 8, title: 'Eighth Blog Post', content: 'This is the content of the eighth blog post.' },
//   { id: 9, title: 'Ninth Blog Post', content: 'This is the content of the ninth blog post.' },
//   { id: 10, title: 'Tenth Blog Post', content: 'This is the content of the tenth blog post.' },
// ];

// const BlogPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedBlog, setSelectedBlog] = useState(null);

//   // Filter blogs based on the search term
//   const filteredBlogs = blogs.filter((blog) =>
//     blog.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Paginate the filtered blogs
//   const paginatedBlogs = filteredBlogs.slice(
//     (currentPage - 1) * PAGE_SIZE,
//     currentPage * PAGE_SIZE
//   );

//   const totalPages = Math.ceil(filteredBlogs.length / PAGE_SIZE);

//   const handleBlogClick = (blog) => {
//     setSelectedBlog(blog);
//   };

//   const handleBackToList = () => {
//     setSelectedBlog(null);
//     setSearchTerm('');
//     setCurrentPage(1);
//   };

//   if (selectedBlog) {
//     return (
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold">{selectedBlog.title}</h1>
//         <p className="mt-4">{selectedBlog.content}</p>
//         <Button onClick={handleBackToList} className="mt-4">Back to Blog List</Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold">Blog List</h1>
//       <Input
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search blogs..."
//         className="mt-4"
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//         {paginatedBlogs.map((blog) => (
//           <Card key={blog.id} className="p-4">
//             <h3 className="font-bold">{blog.title}</h3>
//             <Button onClick={() => handleBlogClick(blog)} className="mt-2">View</Button>
//           </Card>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <Button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <Button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default BlogPage;
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Eye, X } from "lucide-react"; // Icons for actions
import { motion } from "framer-motion"; // For basic animations
import { gsap } from "gsap"; // For advanced animations
import { Power3 } from "gsap/all"; // Import Power3 for easing

const PAGE_SIZE = 5;
const BASE_URL = "http://192.168.0.105:8003";

const BlogPage = () => {
  const router = useRouter();
  const dialogRef = useRef(null); // Ref for GSAP animations on edit dialog
  const deleteDialogRef = useRef(null); // Ref for GSAP animations on delete dialog
  const closeButtonRef = useRef(null); // Ref for GSAP animation on close button
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for delete confirmation
  const [formData, setFormData] = useState({
    authorname: "",
    tittle: "",
    description: "",
    category: "",
    tags: "",
    images: null,
    optionalImages: null,
  });
  const [editBlogId, setEditBlogId] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null); // Store blog_id for deletion

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/getallblogs`);
        console.log("API Response (All Blogs):", response.data);
        setBlogs(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();

    // GSAP animation for edit dialog when it opens
    if (isEditDialogOpen && dialogRef.current) {
      gsap.from(dialogRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 0.4,
        ease: Power3.easeOut,
      });
    }

    // GSAP animation for delete dialog when it opens
    if (isDeleteDialogOpen && deleteDialogRef.current) {
      gsap.from(deleteDialogRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 0.4,
        ease: Power3.easeOut,
      });
    }

    // GSAP animation for close button on hover
    if (closeButtonRef.current) {
      gsap.to(closeButtonRef.current, {
        scale: 1,
        rotate: 0,
        paused: true,
        onComplete: () => gsap.set(closeButtonRef.current, { clearProps: "all" }),
      });

      closeButtonRef.current.addEventListener("mouseenter", () => {
        gsap.to(closeButtonRef.current, {
          scale: 1.1,
          rotate: 180,
          duration: 0.3,
          ease: Power3.easeOut,
        });
      });

      closeButtonRef.current.addEventListener("mouseleave", () => {
        gsap.to(closeButtonRef.current, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: Power3.easeOut,
        });
      });
    }

    return () => {
      if (closeButtonRef.current) {
        closeButtonRef.current.removeEventListener("mouseenter", () => {});
        closeButtonRef.current.removeEventListener("mouseleave", () => {});
      }
    };
  }, [isEditDialogOpen, isDeleteDialogOpen]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.tittle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalPages = Math.ceil(filteredBlogs.length / PAGE_SIZE);

  const handleBlogClick = async (blog) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/blogs/${blog.blog_id}`);
      console.log("Blog Details Response:", response.data);
      const updatedBlog = {
        ...response.data,
        images: response.data.images?.map((imgPath) => `${BASE_URL}${imgPath}`) || [],
        optionalImages: response.data.optionalImages?.map((imgPath) => `${BASE_URL}${imgPath}`) || [],
        tags: response.data.tags || [], // Ensure tags defaults to empty array
      };
      setSelectedBlog(updatedBlog);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedBlog(null);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleEditBlog = async () => {
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("authorname", formData.authorname);
      formDataToSend.append("tittle", formData.tittle);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("tags", formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)); // Remove empty tags

      if (formData.images) {
        formDataToSend.append("images", formData.images);
      }
      if (formData.optionalImages) {
        Array.from(formData.optionalImages).forEach((file) =>
          formDataToSend.append("optionalImages", file)
        );
      }

      const response = await axios.put(
        `${BASE_URL}/api/update-blog/${editBlogId}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Update Blog Response:", response.data);

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.blog_id === editBlogId ? response.data : blog
        )
      );
      setIsEditDialogOpen(false);
      setFormData({
        authorname: "",
        tittle: "",
        description: "",
        category: "",
        tags: "",
        images: null,
        optionalImages: null,
      });
      setEditBlogId(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/deleteblog/${blogToDelete}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.blog_id !== blogToDelete));
      setIsDeleteDialogOpen(false);
      setBlogToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (blog) => {
    setFormData({
      authorname: blog.authorname || "",
      tittle: blog.tittle || "",
      description: blog.description || "",
      category: blog.category || "",
      tags: blog.tags && Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
    });
    setEditBlogId(blog.blog_id);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (blog_id) => {
    setBlogToDelete(blog_id);
    setIsDeleteDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prev) => ({ ...prev, images: files[0] }));
    } else if (name === "optionalImages") {
      setFormData((prev) => ({ ...prev, optionalImages: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
        <p className="text-center text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (selectedBlog) {
    return (
      <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center"
        >
          {selectedBlog.tittle}
        </motion.h1>
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
          <p className="text-gray-600 mb-2 sm:mb-3"><strong className="text-gray-800">Author:</strong> {selectedBlog.authorname}</p>
          <p className="text-gray-600 mb-2 sm:mb-3"><strong className="text-gray-800">Category:</strong> {selectedBlog.category}</p>
          <p className="text-gray-600 mb-4 sm:mb-6"><strong className="text-gray-800">Description:</strong> {selectedBlog.description}</p>
          {selectedBlog.images && selectedBlog.images.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2 sm:mb-3">Main Image</h3>
              <img
                src={selectedBlog.images[0]}
                alt="Main Image"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              onClick={handleBackToList}
              className="mt-4 sm:mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Back to Blog List
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 md:mb-8"
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Blog List
        </motion.h1>
        <motion.button
          onClick={() => router.push("/auther/blog/create-blog")}
          className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Blog
        </motion.button>
      </motion.div>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search blogs..."
        className="mb-4 sm:mb-6 w-full max-w-md mx-auto border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 bg-white text-gray-800 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
      />
      <div className="overflow-x-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200"
        >
          <Table className="w-full text-left border-collapse">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 rounded-tl-lg">Title</TableHead>
                <TableHead className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 hidden md:table-cell">Author</TableHead>
                <TableHead className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 hidden lg:table-cell">Category</TableHead>
                <TableHead className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 rounded-tr-lg">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBlogs.length > 0 ? (
                paginatedBlogs.map((blog) => (
                  <motion.tr
                    key={blog.blog_id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * (paginatedBlogs.indexOf(blog) + 1), duration: 0.3 }}
                    className="hover:bg-gray-50 transition-colors duration-300"
                  >
                    <TableCell className="py-2 sm:py-3 px-2 sm:px-4 text-gray-800">{blog.tittle}</TableCell>
                    <TableCell className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 hidden md:table-cell">{blog.authorname}</TableCell>
                    <TableCell className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 hidden lg:table-cell">{blog.category}</TableCell>
                    <TableCell className="py-2 sm:py-3 px-2 sm:px-4 flex gap-2">
                      <motion.button
                        onClick={() => handleBlogClick(blog)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="h-4 sm:h-5 w-4 sm:w-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleEditClick(blog)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit className="h-4 sm:h-5 w-4 sm:w-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteClick(blog.blog_id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="h-4 sm:h-5 w-4 sm:w-5" />
                      </motion.button>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="py-2 sm:py-3 px-2 sm:px-4 text-center text-gray-500">
                    No blogs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 md:mt-8 gap-2 sm:gap-4"
      >
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
        >
          Previous
        </Button>
        <span className="text-gray-700 text-sm sm:text-lg font-medium">Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
        >
          Next
        </Button>
      </motion.div>

      {/* Edit Blog Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent
          ref={dialogRef}
          className="sm:max-w-[500px] md:max-w-[600px] bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 transform transition-all duration-300"
        >
          <DialogHeader className="mb-6">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-800">Edit Blog Post</DialogTitle>
              <motion.button
                ref={closeButtonRef}
                onClick={() => setIsEditDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-2 sm:p-3 rounded-full hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 sm:h-6 w-5 sm:w-6" />
              </motion.button>
            </div>
          </DialogHeader>
          <div className="grid gap-6 sm:gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 sm:gap-6">
              <Label htmlFor="authorname" className="text-right font-medium text-gray-700">Author</Label>
              <Input
                id="authorname"
                name="authorname"
                value={formData.authorname}
                onChange={handleInputChange}
                className="col-span-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 bg-white text-gray-800 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 sm:gap-6">
              <Label htmlFor="tittle" className="text-right font-medium text-gray-700">Title</Label>
              <Input
                id="tittle"
                name="tittle"
                value={formData.tittle}
                onChange={handleInputChange}
                className="col-span-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 bg-white text-gray-800 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4 sm:gap-6">
              <Label htmlFor="description" className="text-right font-medium text-gray-700">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-0 bg-white text-gray-800 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 sm:gap-6">
              <Label htmlFor="category" className="text-right font-medium text-gray-700">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="col-span-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 bg-white text-gray-800 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 sm:gap-6">
              <Label htmlFor="tags" className="text-right font-medium text-gray-700">Tags</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Enter tags (comma-separated)"
                className="col-span-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 bg-white text-gray-800 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 sm:gap-6">
              <Label htmlFor="images" className="text-right font-medium text-gray-700">Main Image</Label>
              <Input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="col-span-3 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring-0 transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-6 mt-6 sm:mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="bg-gray-100 text-gray-700 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditBlog}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent
          ref={deleteDialogRef}
          className="sm:max-w-[400px] bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 transform transition-all duration-300"
        >
          <DialogHeader className="mb-6">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-800">Confirm Deletion</DialogTitle>
              <motion.button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-2 sm:p-3 rounded-full hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 sm:h-6 w-5 sm:w-6" />
              </motion.button>
            </div>
          </DialogHeader>
          <p className="text-gray-600 mb-6">Are you sure you want to delete this blog? This action cannot be undone.</p>
          <DialogFooter className="flex justify-end gap-6">
            <Button
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-gray-100 text-gray-700 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteBlog}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogPage;