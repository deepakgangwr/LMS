import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { motion } from "framer-motion";
 
const Courses = () => {
  const {data, isLoading, isError} = useGetPublishedCourseQuery();
 
  if(isError) return (
    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg max-w-3xl mx-auto my-8 text-center">
      <h3 className="text-red-600 dark:text-red-400 font-medium text-lg">Error loading courses</h3>
      <p className="text-gray-600 dark:text-gray-400">Please try again later or contact support.</p>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-[#141414] py-16">
      <motion.div 
        className="max-w-7xl mx-auto px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="font-bold text-4xl mb-4 inline-block bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Premium Courses
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-violet-500 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore our carefully curated selection of top-rated courses designed to help you master new skills
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
            data?.courses && data.courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Course course={course}/>
              </motion.div>
            ))
          )}
        </div>
        
        {data?.courses && data.courses.length > 0 && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.button
              className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/course/search?query'}
            >
              View All Courses
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="px-5 py-4 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-16" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-8 rounded-full" />
            <Skeleton className="h-4 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
