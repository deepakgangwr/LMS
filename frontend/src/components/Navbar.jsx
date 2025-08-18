import { BookOpen, GraduationCap, Home, Info, Menu, Phone, School, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { name: "Courses", path: "/courses", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: "My Learning", path: "/my-learning", icon: <GraduationCap className="h-4 w-4 mr-2" /> },
    { name: "About", path: "/about", icon: <Info className="h-4 w-4 mr-2" /> },
    { name: "Contact", path: "/contact", icon: <Phone className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className={`h-16 dark:bg-[#020817]/95 bg-white/95 border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-500 z-10 ${scrolled ? 'shadow-lg backdrop-blur-md' : ''}`}>
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-4">
        <div className="flex items-center gap-2">
          <School size={"30"} className="text-primary" />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent hover:scale-105 transition-all duration-300">
              StudySphere
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path || 
                          (link.path !== "/" && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={index} 
                to={link.path} 
                className={`flex items-center text-sm font-medium transition-all duration-200 hover:scale-105 relative group ${isActive ? 'text-primary font-semibold' : 'hover:text-primary'}`}
              >
                {link.icon}
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-300 ${isActive ? 'w-full' : 'group-hover:w-full'}`}></span>
              </Link>
            );
          })}
        </div>
        
        {/* User icons and dark mode icon  */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary transition-all duration-300 hover:scale-105">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-2 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800">
                <DropdownMenuLabel className="font-semibold text-primary">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                    <Link to="/my-learning" className="flex w-full items-center">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      My learning
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                    <Link to="/profile" className="flex w-full items-center">
                      <Avatar className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler} className="text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                      <Link to="/admin/dashboard" className="flex w-full items-center">
                        <Search className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")} className="hover:text-primary hover:border-primary transition-colors duration-300 rounded-full px-6">
                Login
              </Button>
              <Button onClick={() => navigate("/login")} className="bg-gradient-to-r from-indigo-600 to-violet-500 hover:opacity-90 transition-opacity duration-300 rounded-full px-6">
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile device  */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <div className="flex items-center gap-2">
          <School size={"24"} className="text-primary" />
          <h1 className="font-extrabold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">StudySphere</h1>
        </div>
        <MobileNavbar user={user} navLinks={navLinks} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({user, navLinks}) => {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const location = useLocation();
  
  const logoutHandler = async () => {
    await logoutUser();
    toast.success("Logged out successfully");
    navigate("/login");
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle> <Link to="/" className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">StudySphere</Link></SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2 my-4" />
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path || 
                          (link.path !== "/" && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={index} 
                to={link.path} 
                className={`flex items-center py-2 transition-colors duration-200 ${isActive ? 'text-primary font-semibold' : 'hover:text-primary'}`}
              >
                {link.icon}
                <span className="ml-2">{link.name}</span>
              </Link>
            );
          })}
          <Separator className="mr-2 my-2" />
          {user ? (
            <>
              <Link to="/profile" className="flex items-center py-2 hover:text-primary transition-colors">
                <Avatar className="h-4 w-4 mr-2" />
                Profile
              </Link>
              <button onClick={logoutHandler} className="flex items-center py-2 text-left text-red-500 hover:text-red-600 transition-colors">
                Log out
              </button>
            </>
          ) : (
            <Button onClick={() => navigate("/login")} className="mt-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity duration-300">
              Login / Signup
            </Button>
          )}
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter className="mt-auto pb-8">
            <SheetClose asChild>
              <Button type="submit" onClick={()=> navigate("/admin/dashboard")} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity duration-300">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
