import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Edit, BookOpen, Mail, User, Shield } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [activeTab, setActiveTab] = useState("courses");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );

  const user = data && data.user;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
              <AvatarImage
                src={user?.photoUrl || "https://github.com/shadcn.png"}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
            </Avatar>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-primary hover:bg-primary/90 shadow-lg">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Profile Photo</Label>
                    <Input
                      onChange={onChangeHandler}
                      type="file"
                      accept="image/*"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    disabled={updateUserIsLoading}
                    onClick={updateUserHandler}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    {updateUserIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                        wait
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-center md:text-left">{user.name}</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span className="capitalize">{user.role}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Enrolled Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{user.enrolledCourses.length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/5 border-secondary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">0</p>
                </CardContent>
              </Card>
              
              <Card className="bg-accent/5 border-accent/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Certificates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">0</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="courses" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="courses" className="text-base">
            <BookOpen className="mr-2 h-4 w-4" /> My Courses
          </TabsTrigger>
          <TabsTrigger value="account" className="text-base">
            <User className="mr-2 h-4 w-4" /> Account Details
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-6">
          <h2 className="text-2xl font-semibold mb-6">Enrolled Courses</h2>
          {user.enrolledCourses.length === 0 ? (
            <Card className="bg-muted/40">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Courses Yet</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  You haven't enrolled in any courses yet. Browse our catalog to find courses that interest you.
                </p>
                <Button onClick={() => window.location.href = '/'} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.enrolledCourses.map((course) => (
                <Course course={course} key={course._id} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="account" className="mt-6">
          <h2 className="text-2xl font-semibold mb-6">Account Information</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Full Name</Label>
                    <p className="text-lg font-medium">{user.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email Address</Label>
                    <p className="text-lg font-medium">{user.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Account Type</Label>
                    <p className="text-lg font-medium capitalize">{user.role}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Member Since</Label>
                    <p className="text-lg font-medium">{new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mr-2">
                        <Edit className="mr-2 h-4 w-4" /> Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you're
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Name</Label>
                          <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label>Profile Photo</Label>
                          <Input
                            onChange={onChangeHandler}
                            type="file"
                            accept="image/*"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          disabled={updateUserIsLoading}
                          onClick={updateUserHandler}
                          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                        >
                          {updateUserIsLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                              wait
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
