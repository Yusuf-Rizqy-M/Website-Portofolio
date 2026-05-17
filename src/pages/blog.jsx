import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Calendar, ArrowRight, ChevronLeft, ChevronDown, Sun, Moon } from 'lucide-react';

const Blog = ({ isDarkMode, toggleTheme }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ["All", "Tutorial", "Tips & Tricks", "Review", "Daily Life", "Sertifikat", "Experience"];

  const blogPosts = [
    { id: 1, title: "Developing UKS Queue System with Laravel API", date: "Apr 20, 2026", category: "Experience", link: "/blog/uks-queue-system" },
    { id: 2, title: "Building School Health Website using React & Tailwind", date: "Apr 15, 2026", category: "Experience", link: "/blog/uks-website" },
    { id: 3, title: "My Journey Learning Web Development from Scratch", date: "Mar 10, 2026", category: "Daily Life", link: "/blog/learning-webdev" },
    { id: 4, title: "Working with Laravel Sanctum for Authentication", date: "Feb 25, 2026", category: "Tutorial", link: "/blog/laravel-sanctum" },
    { id: 5, title: "Creating IoT Project with Arduino and ESP8266", date: "Jan 18, 2026", category: "Experience", link: "/blog/iot-arduino" },
    { id: 6, title: "Participating in MIA Competition with UMKM Project", date: "Dec 05, 2025", category: "Sertifikat", link: "/blog/mia-competition" },
    { id: 7, title: "Building Food App for Kudus Area", date: "Nov 12, 2025", category: "Experience", link: "/blog/kudus-food-app" },
    { id: 8, title: "Struggles and Progress as a Vocational Student in Tech", date: "Oct 30, 2025", category: "Daily Life", link: "/blog/student-journey" }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`min-h-screen py-10 px-8 font-poppins transition-colors duration-500 relative ${isDarkMode ? 'bg-[#030712] text-white' : 'bg-[#f8fafc] text-gray-900'}`}
    >
      <Link 
        to="/"
        className={`fixed top-10 left-10 flex items-center gap-1 text-[13px] font-medium transition-all z-50 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
      >
        <ChevronLeft size={18} />
        Back to Home
      </Link>

      <button
        onClick={toggleTheme}
        className={`fixed top-10 right-10 p-2 rounded-full border transition-all z-50
          ${isDarkMode 
            ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/20' 
            : 'bg-white border-gray-200 text-blue-600 shadow-sm hover:bg-gray-50'
          }`}
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="max-w-2xl mx-auto mt-16">
        <div className="flex flex-col items-center text-center mb-8">
          <span className={`px-4 py-0.5 rounded-full border text-[10px] tracking-widest mb-4 inline-block ${isDarkMode ? 'border-white/20 text-gray-400' : 'border-black/10 text-gray-500'}`}>
            BLOG
          </span>
          <h1 className="text-4xl font-bold tracking-tight mb-4 uppercase">
            MY BLOG
          </h1>
          <p className="text-sm opacity-60 max-w-sm leading-relaxed font-normal">
            blog sharing thoughts and experiences from my career journey and life in technology
          </p>
        </div>

        <div className="relative w-full mb-6">
          <input 
            type="text" 
            placeholder="Search blog posts..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className={`w-full px-6 py-3 rounded-full border bg-transparent outline-none transition-all pr-12 text-sm font-normal ${isDarkMode ? 'border-white/10 focus:border-white/30' : 'border-black/10 focus:border-black/30'}`} 
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
        </div>

        <div className="flex justify-center mb-10 relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl border text-[12px] font-medium transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-black/10 hover:bg-gray-50 shadow-sm'}`}
          >
            Sort by Category: <span className="font-semibold">{selectedCategory}</span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className={`absolute top-full mt-2 w-48 rounded-2xl border shadow-xl z-50 overflow-hidden ${isDarkMode ? 'bg-[#0a0f1d] border-white/10' : 'bg-white border-black/5'}`}
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-2.5 text-[12px] font-normal transition-colors ${selectedCategory === cat ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-black') : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-black')}`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode='popLayout'>
            {filteredPosts.map((post) => (
              <motion.div 
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ 
                  scale: { duration: 0.2 },
                  layout: { duration: 0.4 },
                  opacity: { duration: 0.3 }
                }}
                className={`group block w-full p-6 rounded-[24px] border cursor-pointer transition-all duration-300 ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.08]' : 'bg-white border-black/5 hover:border-black/20 hover:bg-white shadow-sm hover:shadow-md'}`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 opacity-40">
                      <Calendar size={12} />
                      <span className="text-[10px] font-medium uppercase tracking-wider">{post.date}</span>
                    </div>
                    <span className={`px-3 py-0.5 rounded-lg text-[9px] font-medium uppercase tracking-widest border transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-400 group-hover:border-white/30' : 'bg-gray-100 border-black/5 text-gray-500 group-hover:border-black/20'}`}>
                      {post.category}
                    </span>
                  </div>

                  <h4 className="text-xl font-semibold tracking-tight">
                    {post.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    Read More
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredPosts.length === 0 && (
            <p className="text-center opacity-40 text-sm py-10 font-normal">No posts found.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;