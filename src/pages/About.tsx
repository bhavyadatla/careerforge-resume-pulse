
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Target, Award, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">CareerForge</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're on a mission to revolutionize how professionals build and optimize their resumes, 
              helping them land their dream careers through intelligent design and AI-powered analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-600">
                CareerForge was founded with a simple belief: everyone deserves to present their professional story 
                in the best possible light. We combine cutting-edge AI technology with intuitive design to help 
                job seekers create resumes that not only look professional but also perform well in today's 
                competitive job market.
              </p>
              <p className="text-lg text-gray-600">
                Our platform empowers users to build, analyze, and perfect their resumes with data-driven insights 
                and expert guidance, ensuring they stand out from the crowd.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">50K+</h3>
                <p className="text-gray-700">Resumes Created</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-green-600 mb-2">95%</h3>
                <p className="text-gray-700">Success Rate</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-purple-600 mb-2">30+</h3>
                <p className="text-gray-700">Templates</p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-red-100 p-6 rounded-lg text-center">
                <h3 className="text-3xl font-bold text-orange-600 mb-2">24/7</h3>
                <p className="text-gray-700">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at CareerForge.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">User-Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Every feature we build is designed with our users' success in mind.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We strive for excellence in every aspect of our platform and service.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We maintain the highest standards in our templates and analysis tools.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We continuously innovate to stay ahead of industry trends and needs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
