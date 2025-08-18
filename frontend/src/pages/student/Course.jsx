import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Clock, BookOpen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Course = ({course}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Link to={`/course-detail/${course._id}`} className="block h-full">
        <Card className="overflow-hidden rounded-xl dark:bg-gray-800/50 bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100 dark:border-gray-700 flex flex-col">
          <div className="relative overflow-hidden group">
            <img
              src={course.courseThumbnail}
              alt={course.courseTitle}
              className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
              <span className="text-white text-sm font-medium">View Details</span>
            </div>
            
            {/* Enhanced Badge Display */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <Badge className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-2 py-1 text-xs rounded-full shadow-md">
                {course.courseLevel}
              </Badge>
              <Badge className="bg-emerald-500 text-white px-2 py-1 text-xs rounded-full shadow-md">
                {course.lectures?.length || 0} lectures
              </Badge>
            </div>
            
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <Badge variant="outline" className="bg-white/80 dark:bg-black/50 backdrop-blur-sm text-xs rounded-full shadow-sm border-0 px-2 py-1 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>8 weeks</span>
              </Badge>
              <Badge variant="outline" className="bg-white/80 dark:bg-black/50 backdrop-blur-sm text-xs rounded-full shadow-sm border-0 px-2 py-1 flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{course.enrolledStudents?.length || 0} enrolled</span>
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-5 space-y-4 flex-grow flex flex-col justify-between">
            <div>
              <h1 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-200">
                {course.courseTitle}
              </h1>
              <p className="text-sm text-muted-foreground mb-3">
                {course.courseDescription || "Master new skills with our comprehensive course curriculum designed by industry experts."}
              </p>
              
              {/* Topics Covered Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {course.tags?.map((tag, index) => (
                  <span key={index} className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                )) || [
                  "Web Development", "JavaScript", "React"
                ].map((tag, index) => (
                  <span key={index} className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Instructor Info with Premium Styling */}
              <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 border-2 border-primary/20 ring-2 ring-white dark:ring-gray-800">
                    <AvatarImage src={course.creator?.photoUrl || "https://github.com/shadcn.png"} alt={course.creator?.name} />
                    <AvatarFallback>{course.creator?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-sm font-medium block">{course.creator?.name || "Instructor Name"}</span>
                    <span className="text-xs text-muted-foreground">Course Instructor</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Rating Display */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                  ₹{course.coursePrice}
                </div>
                <div className="flex items-center gap-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 px-3 py-1.5 rounded-full">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-3.5 w-3.5 ${star <= 4 ? "fill-amber-500 text-amber-500" : "text-gray-300 dark:text-gray-600"}`} />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-amber-700 dark:text-amber-400 ml-1">4.8</span>
                </div>
              </div>
              
              {/* Call to Action Button */}
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:scale-[1.02]">
                Enroll Now
              </button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default Course;
