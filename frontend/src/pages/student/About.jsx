import React from 'react';
import { BookOpen, Users, Award, ThumbsUp, School, Lightbulb, Target, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About StudySphere</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Empowering learners worldwide with accessible, high-quality education to achieve their goals and unlock their potential.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <CardContent className="p-0">
            <p className="text-muted-foreground">
              To democratize education by providing accessible, engaging, and effective learning experiences that empower individuals to achieve their personal and professional goals.
            </p>
          </CardContent>
        </Card>
        
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Our Vision</h2>
          </div>
          <CardContent className="p-0">
            <p className="text-muted-foreground">
              To create a global learning ecosystem where anyone, anywhere can transform their life through education, fostering a more knowledgeable, skilled, and connected world.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="bg-muted rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-2">10K+</h3>
            <p className="text-muted-foreground">Students</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-2">500+</h3>
            <p className="text-muted-foreground">Courses</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-2">100+</h3>
            <p className="text-muted-foreground">Instructors</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <ThumbsUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-2">98%</h3>
            <p className="text-muted-foreground">Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-6">
            StudySphere was founded in 2023 with a simple yet powerful idea: education should be accessible to everyone, regardless of their background or circumstances. What began as a small collection of online courses has grown into a comprehensive learning platform serving students worldwide.
          </p>
          <p className="text-lg mb-6">
            Our journey has been driven by a passion for innovation in education and a commitment to student success. We've continuously evolved our platform, incorporating cutting-edge technology and pedagogical approaches to create engaging, effective learning experiences.
          </p>
          <p className="text-lg">
            Today, StudySphere stands as a leader in online education, offering a diverse range of courses taught by industry experts. We remain dedicated to our founding mission while expanding our reach and impact in the global education landscape.
          </p>
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Leadership Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a" 
              alt="CEO" 
              className="w-full h-64 object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-1">John Doe</h3>
              <p className="text-primary mb-3">CEO & Founder</p>
              <p className="text-muted-foreground">
                With over 15 years in EdTech, John leads our vision to transform online education globally.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" 
              alt="CTO" 
              className="w-full h-64 object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
              <p className="text-primary mb-3">Chief Learning Officer</p>
              <p className="text-muted-foreground">
                Sarah brings her expertise in curriculum development and learning science to create our exceptional courses.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7" 
              alt="CTO" 
              className="w-full h-64 object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-1">Michael Chen</h3>
              <p className="text-primary mb-3">Chief Technology Officer</p>
              <p className="text-muted-foreground">
                Michael leads our engineering team, building innovative technology that powers seamless learning experiences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;