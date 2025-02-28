// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { ChevronDown, ChevronUp, Mic } from "lucide-react";
// import { motion } from "framer-motion";
 
// const BASE_URL = "http://192.168.0.105:8003";
 
// const BlogCreateForm = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     authorname: "",
//     tittle: "",
//     description: "",
//     categories: [],
//     tags: [],
//     images: null,
//     optionalImages: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isTagsOpen, setIsTagsOpen] = useState(false);
//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [tagOptions, setTagOptions] = useState([]);
//   const recognitionRef = useRef(null);
//   const [interimTranscript, setInterimTranscript] = useState("");
 
//   useEffect(() => {
//     const fetchCategoriesAndTags = async () => {
//       try {
//         const [categoryResponse, tagResponse] = await Promise.all([
//           axios.get(`${BASE_URL}/api/getcategory`),
//           axios.get(`${BASE_URL}/api/gettags`),
//         ]);
//         setCategoryOptions(categoryResponse.data);
//         setTagOptions(tagResponse.data);
//       } catch (err) {
//         setError("Failed to load categories or tags: " + err.message);
//       }
//     };
//     fetchCategoriesAndTags();
//   }, []);
 
//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "images") {
//       setFormData((prev) => ({ ...prev, images: files[0] }));
//     } else if (name === "optionalImages") {
//       setFormData((prev) => ({ ...prev, optionalImages: files }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };
 
//   const handleCategoryChange = (categoryName) => {
//     setFormData((prev) => {
//       const newCategories = prev.categories.includes(categoryName)
//         ? prev.categories.filter((c) => c !== categoryName)
//         : [...prev.categories, categoryName];
//       return { ...prev, categories: newCategories }; // Fixed: Removed extra parenthesis
//     });
//   };
 
//   const handleTagChange = (tagName) => {
//     setFormData((prev) => {
//       const newTags = prev.tags.includes(tagName)
//         ? prev.tags.filter((t) => t !== tagName)
//         : [...prev.tags, tagName];
//       return { ...prev, tags: newTags };
//     });
//   };
 
//   const startRecording = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       setError("Speech recognition is not supported in this browser. Please use a modern browser like Chrome.");
//       return;
//     }
 
//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";
 
//     recognition.onstart = () => {
//       setIsRecording(true);
//       setError(null);
//     };
 
//     recognition.onresult = (event) => {
//       let finalTranscript = "";
//       let interim = "";
 
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           finalTranscript += transcript + " ";
//         } else {
//           interim += transcript;
//         }
//       }
 
//       setInterimTranscript(interim);
//       if (finalTranscript) {
//         setFormData((prev) => ({
//           ...prev,
//           description: prev.description + finalTranscript,
//         }));
//         setInterimTranscript("");
//       }
//     };
 
//     recognition.onerror = (event) => {
//       setError(`Speech recognition error: ${event.error}`);
//       setIsRecording(false);
//       recognition.stop();
//     };
 
//     recognition.onend = () => {
//       if (isRecording) {
//         recognition.start();
//       } else {
//         setIsRecording(false);
//         setInterimTranscript("");
//       }
//     };
 
//     recognition.start();
//     recognitionRef.current = recognition;
//   };
 
//   const stopRecording = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsRecording(false);
//       setInterimTranscript("");
//     }
//   };
 
//   const handleCreateBlog = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const formDataToSend = new FormData();
//       formDataToSend.append("authorname", formData.authorname);
//       formDataToSend.append("tittle", formData.tittle);
//       formDataToSend.append("description", formData.description);
//       formDataToSend.append("category", JSON.stringify(formData.categories)); // Backend expects 'category'
//       formDataToSend.append("tags", JSON.stringify(formData.tags));
 
//       if (formData.images) {
//         formDataToSend.append("images", formData.images);
//       }
//       if (formData.optionalImages) {
//         Array.from(formData.optionalImages).forEach((file) =>
//           formDataToSend.append("optionalImages", file)
//         );
//       }
 
//       const response = await axios.post(
//         `${BASE_URL}/api/create`,
//         formDataToSend,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       console.log("Create Blog Response:", response.data);
 
//       router.push("/auther/blog");
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10 border border-blue-200/50 transform hover:-translate-y-2 hover:shadow-3xl transition-all duration-300"
//       >
//         <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 mb-8 text-center drop-shadow-[0_4px_12px_rgba(34,211,238,0.5)] animate-gradient">
//           Craft Your Blog
//         </h1>
//         {error && <p className="text-red-500 mb-6 text-center font-medium">{error}</p>}
//         <form onSubmit={handleCreateBlog} className="space-y-8">
//           <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-4 items-center">
//             <Label htmlFor="authorname" className="text-right font-medium text-gray-700">Author</Label>
//             <div className="sm:col-span-3 relative">
//               <Input
//                 id="authorname"
//                 name="authorname"
//                 value={formData.authorname}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 bg-white text-gray-800 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
//                 placeholder="Enter your name"
//               />
//             </div>
//           </div>
//           <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-4 items-center">
//             <Label htmlFor="tittle" className="text-right font-medium text-gray-700">Title</Label>
//             <div className="sm:col-span-3 relative">
//               <Input
//                 id="tittle"
//                 name="tittle"
//                 value={formData.tittle}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-0 bg-white text-gray-800 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
//                 placeholder="Give your blog a catchy title"
//                 required
//               />
//             </div>
//           </div>
//           <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-4 items-start">
//             <Label htmlFor="description" className="text-right font-medium text-gray-700">Description</Label>
//             <div className="sm:col-span-3 relative">
//               <Textarea
//                 id="description"
//                 name="description"
//                 value={formData.description + (interimTranscript ? ` ${interimTranscript}` : "")}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-0 bg-white text-gray-800 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
//                 placeholder="Tell your story... (or speak to transcribe)"
//                 rows={6}
//               />
//               <motion.button
//                 type="button"
//                 onClick={isRecording ? stopRecording : startRecording}
//                 className={`absolute bottom-3 right-3 p-2 rounded-full ${
//                   isRecording ? "bg-red-600" : "bg-blue-600"
//                 } text-white shadow-md`}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
//                 transition={isRecording ? { repeat: Infinity, duration: 0.8 } : {}}
//                 title={isRecording ? "Stop Recording" : "Start Recording"}
//               >
//                 <Mic className="h-5 w-5" />
//               </motion.button>
//             </div>
//           </div>
//           <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-4 items-start">
//             <Label className="text-right font-medium text-gray-700">Categories</Label>
//             <div className="sm:col-span-3 relative">
//               <div
//                 className="border border-gray-200 rounded-lg p-3 bg-white cursor-pointer flex flex-wrap gap-2 items-center hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
//                 onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
//               >
//                 {formData.categories.length > 0 ? (
//                   formData.categories.map((category) => (
//                     <span
//                       key={category}
//                       className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full flex items-center gap-1"
//                     >
//                       {category}
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleCategoryChange(category);
//                         }}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))
//                 ) : (
//                   <span className="text-gray-500">Choose some categories</span>
//                 )}
//                 <span className="ml-auto">
//                   {isCategoriesOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
//                 </span>
//               </div>
//               {isCategoriesOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto"
//                 >
//                   {categoryOptions.map((category) => (
//                     <div
//                       key={category._id}
//                       className="flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors duration-200"
//                     >
//                       <Checkbox
//                         id={`category-${category._id}`}
//                         checked={formData.categories.includes(category.name)}
//                         onCheckedChange={() => handleCategoryChange(category.name)}
//                         className="border-gray-300 rounded-full"
//                       />
//                       <Label htmlFor={`category-${category._id}`} className="cursor-pointer text-gray-800 font-medium">
//                         {category.name}
//                       </Label>
//                     </div>
//                   ))}
//                 </motion.div>
//               )}
//             </div>
//           </div>
//           <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-4 items-start">
//             <Label className="text-right font-medium text-gray-700">Tags</Label>
//             <div className="sm:col-span-3 relative">
//               <div
//                 className="border border-gray-200 rounded-lg p-3 bg-white cursor-pointer flex flex-wrap gap-2 items-center hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
//                 onClick={() => setIsTagsOpen(!isTagsOpen)}
//               >
//                 {formData.tags.length > 0 ? (
//                   formData.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full flex items-center gap-1"
//                     >
//                       {tag}
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleTagChange(tag);
//                         }}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))
//                 ) : (
//                   <span className="text-gray-500">Choose some tags</span>
//                 )}
//                 <span className="ml-auto">
//                   {isTagsOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
//                 </span>
//               </div>
//               {isTagsOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto"
//                 >
//                   {tagOptions.map((tag) => (
//                     <div
//                       key={tag._id}
//                       className="flex items-center gap-3 p-3 hover:bg-blue-50 transition-colors duration-200"
//                     >
//                       <Checkbox
//                         id={`tag-${tag._id}`}
//                         checked={formData.tags.includes(tag.name)}
//                         onCheckedChange={() => handleTagChange(tag.name)}
//                         className="border-gray-300 rounded-full"
//                       />
//                       <Label htmlFor={`tag-${tag._id}`} className="cursor-pointer text-gray-800 font-medium">
//                         {tag.name}
//                       </Label>
//                     </div>
//                   ))}
//                 </motion.div>
//               )}
//             </div>
//           </div>
//           <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-4 items-center">
//             <Label htmlFor="images" className="text-right font-medium text-gray-700">Main Image</Label>
//             <Input
//               id="images"
//               name="images"
//               type="file"
//               accept="image/*"
//               onChange={handleInputChange}
//               className="sm:col-span-3 border border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-0 transition-all duration-300 shadow-sm hover:shadow-md"
//             />
//           </div>
//           <div className="flex justify-end gap-6">
//             <motion.button
//               type="button"
//               onClick={() => router.push("/auther/blog")}
//               disabled={loading}
//               className="relative px-6 py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-300 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 shadow-md hover:shadow-lg"
//               whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Cancel
//             </motion.button>
//             <motion.button
//               type="submit"
//               disabled={loading}
//               className="relative px-6 py-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white rounded-full hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-md"
//               whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 211, 238, 0.7)" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {loading ? "Creating..." : "Create"}
//             </motion.button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };
 
// export default BlogCreateForm;