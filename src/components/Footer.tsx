
import { Link } from "react-router-dom";
import { FileText, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span>CareerForge</span>
            </Link>
            <p className="text-gray-400">
              Empowering careers through intelligent resume building and analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              <Link to="/resume-builder" className="text-gray-400 hover:text-white transition-colors">Resume Builder</Link>
              <Link to="/resume-analyzer" className="text-gray-400 hover:text-white transition-colors">Resume Analyzer</Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Resume Building</span>
              <span className="text-gray-400">Resume Analysis</span>
              <span className="text-gray-400">Career Consulting</span>
              <span className="text-gray-400">Professional Templates</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>hello@careerforge.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CareerForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
