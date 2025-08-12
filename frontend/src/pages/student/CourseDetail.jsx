import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle, Clock, Users, Award, BookOpen } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
  
  if (isError) return <div className="text-center py-20 text-red-500">Failed to load course details</div>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if(purchased){
      navigate(`/course-progress/${courseId}`)
    }
  }

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <h1 className="font-bold text-3xl md:text-4xl">
              {course?.courseTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/90">Master the skills that will drive your career forward</p>
            <div className="flex items-center gap-3 text-white/80">
              <span className="flex items-center gap-1">
                <BadgeInfo size={16} />
                <p>Updated {new Date(course?.createdAt).toLocaleDateString()}</p>
              </span>
              <span className="flex items-center gap-1">
                <Users size={16} />
                <p>{course?.enrolledStudents.length} students enrolled</p>
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <img 
                src={course?.creator.photoUrl || "https://github.com/shadcn.png"} 
                alt={course?.creator.name}
                className="w-10 h-10 rounded-full border-2 border-white/50"
              />
              <div>
                <p className="text-sm text-white/70">Created by</p>
                <p className="text-white font-medium">{course?.creator.name}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto my-10 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <motion.div 
          className="w-full lg:w-2/3 space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-2xl mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">About This Course</h2>
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>
          
          <Card className="border border-gray-100 dark:border-gray-700 shadow-md overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-gray-800/50">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Course Content
              </CardTitle>
              <CardDescription>{course.lectures.length} lectures • Approximately 8 hours</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {course.lectures.map((lecture, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                  >
                    <span className="text-primary bg-primary/10 p-2 rounded-full">
                      {purchased ? <PlayCircle size={18} /> : <Lock size={18} />}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">{lecture.lectureTitle}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" /> 15 minutes
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="w-full lg:w-1/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="sticky top-20 border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden rounded-xl">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course.lectures[0].videoUrl}
                  controls={true}
                  light={course.courseThumbnail}
                  playIcon={<PlayCircle className="text-white h-16 w-16" />}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                  <p className="text-white font-medium">{course.lectures[0].lectureTitle}</p>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">₹{course.coursePrice}</h2>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold">This course includes:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <PlayCircle className="h-4 w-4 text-primary" />
                      {course.lectures.length} on-demand video lectures
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      Full lifetime access
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-primary" />
                      Certificate of completion
                    </li>
                  </ul>
                </div>
                
                <Separator />
                
                {purchased ? (
                  <Button 
                    onClick={handleContinueCourse} 
                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-500 hover:opacity-90 transition-opacity duration-300 py-6 text-lg"
                  >
                    Continue Learning
                  </Button>
                ) : (
                  <BuyCourseButton courseId={courseId} />
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetail;
