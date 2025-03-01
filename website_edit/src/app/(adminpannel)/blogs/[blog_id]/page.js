'use client';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '@/redux/slices/blogSlice';

export default function BlogPost({ params }) {
  const { blog_id } = params;

  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const blog = blogs.find((b) => b.blog_id.toString() === blog_id.toString());

  if (loading) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="p-4 text-red-500">
        Blog with ID {blog_id} not found!
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 relative">
      <div className="absolute top-8 right-10">
        <Link href="/blogs">
          <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">
            All Blogs
          </Button>
        </Link>
      </div>

      <Card className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-gray-900">{blog.tittle}</h1>

        <div className="mt-2 text-sm text-gray-600 flex gap-2">
          <span>By {blog.authorname}</span> | 
          <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        {blog.image && (
          <div className="mt-6">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-auto rounded-lg shadow-md" 
            />
          </div>
        )}

        <div className="mt-6 text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: blog.description }} />

      </Card>
    </div>
  );
}
