import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap, Users, Award, Search } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ""){
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-500 opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center mix-blend-overlay z-0"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-0 opacity-30">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 py-28 px-4 text-center">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Unlock Your Potential With Premium Courses
          </motion.h1>
          <motion.p 
            className="text-gray-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join thousands of students learning from industry experts and advancing their careers
          </motion.p>

          <motion.form 
            onSubmit={searchHandler} 
            className="flex items-center bg-white/10 backdrop-blur-md rounded-full shadow-xl overflow-hidden max-w-xl mx-auto mb-10 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any course..."
              className="flex-grow border-none bg-transparent focus-visible:ring-0 px-6 py-4 text-white placeholder-gray-300 text-lg"
            />
            <Button type="submit" className="bg-white text-primary hover:bg-gray-100 px-8 py-6 rounded-r-full transition-colors duration-300 text-lg font-medium flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search
            </Button>
          </motion.form>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button onClick={()=> navigate(`/course/search?query`)} className="bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors duration-300 border border-white/40 px-6 shadow-lg">
              Explore All Courses
            </Button>
            <Button onClick={()=> navigate(`/about`)} className="bg-white text-primary rounded-full hover:bg-gray-100 transition-colors duration-300 px-6 shadow-lg">
              Learn About Us
            </Button>
          </motion.div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { icon: <Users className="h-8 w-8 text-white mx-auto mb-2" />, count: "10K+", label: "Students", delay: 0.9 },
              { icon: <BookOpen className="h-8 w-8 text-white mx-auto mb-2" />, count: "200+", label: "Courses", delay: 1.0 },
              { icon: <GraduationCap className="h-8 w-8 text-white mx-auto mb-2" />, count: "50+", label: "Instructors", delay: 1.1 },
              { icon: <Award className="h-8 w-8 text-white mx-auto mb-2" />, count: "98%", label: "Satisfaction", delay: 1.2 }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors duration-300 transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.delay }}
              >
                {stat.icon}
                <h3 className="text-white text-3xl font-bold">{stat.count}</h3>
                <p className="text-gray-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
