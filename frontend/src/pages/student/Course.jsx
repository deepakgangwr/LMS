import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Clock } from "lucide-react";
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
    >
      <Link to={`/course-detail/${course._id}`}>
        <Card className="overflow-hidden rounded-xl dark:bg-gray-800/50 bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100 dark:border-gray-700">
          <div className="relative overflow-hidden group">
            <img
              src={course.courseThumbnail}
              alt={course.courseTitle}
              className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
              <span className="text-white text-sm font-medium">View Details</span>
            </div>
            <Badge className={`absolute top-3 right-3 bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-2 py-1 text-xs rounded-full shadow-md`}>
              {course.courseLevel}
            </Badge>
            <div className="absolute top-3 left-3">
              <Badge variant="outline" className="bg-white/80 dark:bg-black/50 backdrop-blur-sm text-xs rounded-full shadow-sm border-0 px-2 py-1 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>8 weeks</span>
              </Badge>
            </div>
          </div>
          <CardContent className="p-5 space-y-4">
            <h1 className="font-bold text-lg line-clamp-2 h-14 group-hover:text-primary transition-colors duration-200">
              {course.courseTitle}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-primary/20 ring-2 ring-white dark:ring-gray-800">
                  <AvatarImage src={course.creator?.photoUrl || "https://github.com/shadcn.png"} alt={course.creator?.name} />
                  <AvatarFallback>{course.creator?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{course.creator?.name}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                ₹{course.coursePrice}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center text-amber-500">
                  <Star className="fill-amber-500 h-4 w-4" />
                  <span className="text-xs ml-1">4.8</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-xs ml-1">{course.enrolledStudents?.length || 0}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default Course;
