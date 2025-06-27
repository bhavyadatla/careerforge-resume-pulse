
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Target, Users, Zap, Star, TrendingUp, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 animate-pulse">
                <Star className="h-4 w-4 mr-2" />
                #1 AI-Powered Resume Builder
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Build Your Perfect
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 block animate-pulse">
                  Career Story
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                CareerForge helps you create professional resumes and analyze their effectiveness with AI-powered scoring. 
                Stand out from the crowd with our advanced resume building tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  asChild 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 border-2 hover:bg-blue-50 hover:border-blue-300 transform hover:scale-105 transition-all duration-300"
                >
                  <Link to="/resume-analyzer">
                    Analyze Resume
                  </Link>
                </Button>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center group">
                  <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
                  <div className="text-gray-600">Resumes Created</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">4.9★</div>
                  <div className="text-gray-600">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">Why Choose CareerForge?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Our platform combines cutting-edge AI technology with professional design to help you create resumes that get noticed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FileText,
                title: "Professional Templates",
                description: "Choose from dozens of professionally designed resume templates that stand out to employers.",
                gradient: "from-blue-500 to-indigo-500",
                delay: "0s"
              },
              {
                icon: Target,
                title: "AI-Powered Scoring",
                description: "Get instant feedback on your resume with our advanced AI scoring system and improvement suggestions.",
                gradient: "from-green-500 to-emerald-500",
                delay: "0.1s"
              },
              {
                icon: Zap,
                title: "Quick & Easy",
                description: "Build your resume in minutes with our intuitive drag-and-drop interface and smart suggestions.",
                gradient: "from-purple-500 to-pink-500",
                delay: "0.2s"
              },
              {
                icon: Shield,
                title: "ATS Optimized",
                description: "Ensure your resume passes through Applicant Tracking Systems with our optimization tools.",
                gradient: "from-orange-500 to-red-500",
                delay: "0.3s"
              }
            ].map((feature, index) => (
              <Card 
                key={feature.title}
                className="text-center group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 cursor-pointer animate-fade-in border-0 shadow-lg"
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader>
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied professionals</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "CareerForge helped me land my dream job at Google. The AI suggestions were spot on!",
                author: "Sarah Chen",
                role: "Software Engineer",
                rating: 5
              },
              {
                quote: "The ATS optimization feature is a game-changer. My resume now passes all screening systems.",
                author: "Michael Rodriguez",
                role: "Marketing Manager",
                rating: 5
              },
              {
                quote: "Professional templates and easy-to-use interface. Highly recommended!",
                author: "Emily Johnson",
                role: "Data Scientist",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in border-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">Ready to Transform Your Career?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join thousands of professionals who have successfully landed their dream jobs with CareerForge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              asChild 
              size="lg" 
              className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Link to="/signup">
                Start Building Your Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              size="lg" 
              className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
