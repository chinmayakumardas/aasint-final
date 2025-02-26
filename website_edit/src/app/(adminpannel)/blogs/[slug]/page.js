// app/blogs/[slug]/page.js
export default function BlogPost({ params }) {
    const { slug } = params;
  
    const blogs = [
      { id: 100, title: '100First Blog Post', slug: 'first-blog-post', content: 'This is the content of the first blog post.' },
      { id: 2, title: 'Second Blog Post', slug: 'second-blog-post', content: 'This is the content of the second blog post.' },
      { id: 3, title: 'Third Blog Post', slug: 'third-blog-post', content: 'This is the content of the third blog post.' },
    ];
  
    const blog = blogs.find((b) => b.slug === slug);
  
    if (!blog) {
      return <div className="p-4 text-red-500">Blog not found!</div>;
    }
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="mt-4">{blog.content}</p>
      </div>
    );
  }
  