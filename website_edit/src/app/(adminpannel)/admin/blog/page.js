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
import { useState, useEffect } from "react";
import axios from "axios";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react"; // Icon for viewing details
import { motion } from "framer-motion"; // For animations
 
const PAGE_SIZE = 5;
const BASE_URL = "http://192.168.0.105:8003";
 
const AdminBlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
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
  }, []);
 
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
 
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-gray-500">Loading blogs...</p>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-red-500">Error: {error}</p>
      </div>
    );
  }
 
  if (selectedBlog) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedBlog.tittle}</h1>
        <p className="text-gray-600 mb-2">Author: {selectedBlog.authorname}</p>
        <p className="text-gray-600 mb-2">Category: {selectedBlog.category}</p>
        <p className="text-gray-700 mb-4">{selectedBlog.description}</p>
        {selectedBlog.images && selectedBlog.images.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Main Image</h2>
            <img
              src={selectedBlog.images[0]}
              alt={selectedBlog.tittle}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        {selectedBlog.optionalImages && selectedBlog.optionalImages.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Optional Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedBlog.optionalImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedBlog.tittle}-optional-${index}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        )}
        {selectedBlog.tags && selectedBlog.tags.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {selectedBlog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        <Button
          onClick={handleBackToList}
          className="mt-6 bg-blue-600 hover:bg-blue-700"
        >
          Back to Blog List
        </Button>
      </div>
    );
  }
 
  return (
    <div className="container mx-auto p-4 lg:max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Blog List</h1>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search blogs..."
        className="mb-6 w-full max-w-md mx-auto"
      />
      <div className="overflow-x-auto">
        <Table className="w-full text-left border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="py-3 px-4 font-semibold text-gray-700">Title</TableHead>
              <TableHead className="py-3 px-4 font-semibold text-gray-700 hidden md:table-cell">Author</TableHead>
              <TableHead className="py-3 px-4 font-semibold text-gray-700 hidden lg:table-cell">Category</TableHead>
              <TableHead className="py-3 px-4 font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBlogs.length > 0 ? (
              paginatedBlogs.map((blog) => (
                <TableRow key={blog.blog_id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="py-3 px-4 text-gray-800">{blog.tittle}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600 hidden md:table-cell">{blog.authorname}</TableCell>
                  <TableCell className="py-3 px-4 text-gray-600 hidden lg:table-cell">{blog.category}</TableCell>
                  <TableCell className="py-3 px-4">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        onClick={() => handleBlogClick(blog)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md"
                      >
                        <Eye className="mr-2 h-4 w-4" /> View
                      </Button>
                    </motion.div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="py-3 px-4 text-center text-gray-500">
                  No blogs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Previous
        </Button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
 
export default AdminBlogPage;