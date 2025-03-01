// 'use client'
// import { useState } from 'react';
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import Link from 'next/link';
// import { Button } from "@/components/ui/button";

// const blogs = [
//   { id: 1, title: 'First Blog Post', slug: 'first-blog-post', content: 'This is the content of the first blog post.' },
//   { id: 2, title: 'Second Blog Post', slug: 'second-blog-post', content: 'This is the content of the second blog post.' },
//   { id: 3, title: 'Third Blog Post', slug: 'third-blog-post', content: 'This is the content of the third blog post.' },
// ];

// const AllBlogs = ({users}) => {
//   const [searchTerm, setSearchTerm] = useState('');
// const user=users;
//   const filteredBlogs = blogs.filter((blog) =>
//     blog.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Blog List</h1>
//         <Link href="/blogs/create-blog">
//           <Button variant="createBtn">Write a Blog</Button>
//         </Link>
//       </div>
//       <p>{user}</p>
//       <Input
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search blogs..."
//         className="mt-4"
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//         {filteredBlogs.map((blog) => (
//           <Card key={blog.id} className="p-4">
//             <h3 className="font-bold">
//               <Link href={`/blogs/${blog.slug}`} className="text-blue-500 hover:underline">
//                 {blog.title}
//               </Link>
//             </h3>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllBlogs;




'use client'
import { useState,useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '@/redux/slices/blogSlice';



const AllBlogs = () => {
  const dispatch = useDispatch();
  const {blogs,state}=useSelector((state) => state.blogs)
  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);
  const [searchTerm, setSearchTerm] = useState('');

  //const filteredBlogs = blogs
  const filteredBlogs = blogs.filter((blog) =>
    blog.tittle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Blogs </h1>
        <Link href="/blogs/create-blog">
          <Button variant="createBtn">Write a Blog</Button>
        </Link>
      </div>
      <p></p>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search blogs..."
        className="mt-4"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {filteredBlogs.map((blog) => (
          <Card key={blog.blog_id} className="p-4">
            <h3 className="font-bold">
              <Link href={`/blogs/${blog.blog_id}`} className="text-blue-500 hover:underline">
                {blog.tittle}
              </Link>
            </h3>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
