// McgPr7oX7v1mMcbN
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2, Mail, Lock, User, School, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if(registerIsSuccess && registerData){
      toast.success(registerData.message || "Signup successful.")
    }
    if(registerError){
      toast.error(registerError?.data?.message || "Signup Failed");
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if(loginError){ 
      toast.error(loginError?.data?.message || "Login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
    registerIsSuccess,
    loginIsSuccess,
    navigate
  ]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center w-full px-4 py-12 bg-gradient-to-b from-background to-background/80">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <motion.div 
        className="relative z-10 w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex items-center justify-center mb-8">
          <School className="h-10 w-10 text-primary mr-2" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            StudySphere
          </h1>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg p-1">
              <TabsTrigger value="signup" className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-500 data-[state=active]:text-white transition-all duration-300">
                Signup
              </TabsTrigger>
              <TabsTrigger value="login" className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-500 data-[state=active]:text-white transition-all duration-300">
                Login
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signup">
              <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 rounded-xl">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
                  <CardDescription className="text-center">
                    Join our community of learners today
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        value={signupInput.name}
                        onChange={(e) => changeInputHandler(e, "signup")}
                        placeholder="John Doe"
                        required="true"
                        className="pl-10 h-10 rounded-lg border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        value={signupInput.email}
                        onChange={(e) => changeInputHandler(e, "signup")}
                        placeholder="john.doe@example.com"
                        required="true"
                        className="pl-10 h-10 rounded-lg border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        value={signupInput.password}
                        onChange={(e) => changeInputHandler(e, "signup")}
                        placeholder="••••••••"
                        required="true"
                        className="pl-10 h-10 rounded-lg border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>By signing up, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={registerIsLoading}
                    onClick={() => handleRegistration("signup")}
                    className="w-full h-11 bg-gradient-to-r from-indigo-600 to-violet-500 hover:opacity-90 transition-all duration-300 rounded-lg font-medium"
                  >
                    {registerIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="login">
              <Card className="border-0 shadow-lg dark:shadow-indigo-900/10 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 rounded-xl">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
                  <CardDescription className="text-center">
                    Sign in to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        name="email"
                        id="login-email"
                        value={loginInput.email}
                        onChange={(e) => changeInputHandler(e, "login")}
                        placeholder="john.doe@example.com"
                        required="true"
                        className="pl-10 h-10 rounded-lg border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password" className="text-sm font-medium">
                        Password
                      </Label>
                      <a href="#" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="password"
                        name="password"
                        id="login-password"
                        value={loginInput.password}
                        onChange={(e) => changeInputHandler(e, "login")}
                        placeholder="••••••••"
                        required="true"
                        className="pl-10 h-10 rounded-lg border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="remember" className="rounded text-primary focus:ring-primary" />
                      <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    disabled={loginIsLoading}
                    onClick={() => handleRegistration("login")}
                    className="w-full h-11 bg-gradient-to-r from-indigo-600 to-violet-500 hover:opacity-90 transition-all duration-300 rounded-lg font-medium"
                  >
                    {loginIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    Don't have an account? <a href="#" onClick={() => document.querySelector('[value="signup"]').click()} className="text-primary hover:underline">Sign up</a>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm">Trusted by thousands of students</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm">Premium courses from expert instructors</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
