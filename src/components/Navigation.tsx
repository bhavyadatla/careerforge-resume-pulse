
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, FileText, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const publicNavigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const userNavigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Resume Builder", href: "/resume-builder" },
    { name: "Resume Analyzer", href: "/resume-analyzer" },
  ];

  const navigation = user ? userNavigation : publicNavigation;

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with hover animation */}
          <Link 
            to={user ? "/dashboard" : "/"} 
            className="flex items-center space-x-2 font-bold text-2xl text-gray-900 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center transition-transform duration-300 hover:rotate-12">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              CareerForge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-700 hover:text-blue-600 transition-all duration-300 relative group ${
                  isActive(item.href) ? "text-blue-600" : ""
                }`}
              >
                {item.name}
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300 ${
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}></div>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-full">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.email?.split('@')[0]}</span>
                </div>
                <Button 
                  onClick={handleSignOut} 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  asChild 
                  variant="ghost" 
                  className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-blue-50 transition-all duration-300"
            >
              <div className="relative w-6 h-6">
                <Menu className={`h-6 w-6 absolute transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`h-6 w-6 absolute transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-gray-700 hover:text-blue-600 transition-all duration-300 px-2 py-2 rounded-lg hover:bg-blue-50 transform hover:translate-x-2 ${
                    isActive(item.href) ? "text-blue-600 bg-blue-50" : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-gray-600 px-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user.email?.split('@')[0]}</span>
                  </div>
                  <Button 
                    onClick={handleSignOut} 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button 
                    asChild 
                    variant="ghost" 
                    className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
