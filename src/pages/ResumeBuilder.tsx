import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, Navigate } from "react-router-dom";
import { FileText, Plus, Trash2, ArrowLeft, Download, Eye, Layout } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const ResumeBuilder = () => {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      summary: ""
    },
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ],
    education: [
      {
        school: "",
        degree: "",
        field: "",
        graduationDate: ""
      }
    ],
    skills: [""]
  });
  const { toast } = useToast();

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div>Loading...</div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech and creative roles",
      preview: "🎨",
      color: "bg-blue-500"
    },
    {
      id: "classic",
      name: "Classic Executive",
      description: "Traditional format ideal for corporate and executive positions",
      preview: "📋",
      color: "bg-gray-600"
    },
    {
      id: "creative",
      name: "Creative Designer",
      description: "Bold and artistic layout for designers and creative professionals",
      preview: "🎭",
      color: "bg-purple-500"
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      description: "Simple and elegant design that focuses on content",
      preview: "📄",
      color: "bg-green-500"
    },
    {
      id: "tech",
      name: "Tech Specialist",
      description: "Developer-focused template with technical skills emphasis",
      preview: "💻",
      color: "bg-indigo-500"
    },
    {
      id: "academic",
      name: "Academic Research",
      description: "Structured format for researchers and academic professionals",
      preview: "🎓",
      color: "bg-orange-500"
    }
  ];

  const sections = [
    { id: "templates", label: "Templates", icon: "📋" },
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "skills", label: "Skills", icon: "⚡" }
  ];

  const handlePersonalChange = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: ""
      }]
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        school: "",
        degree: "",
        field: "",
        graduationDate: ""
      }]
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, ""]
    }));
  };

  const handleSave = () => {
    toast({
      title: "Resume Saved!",
      description: "Your resume has been saved successfully.",
    });
  };

  const handlePreview = () => {
    toast({
      title: "Preview Ready!",
      description: "Opening resume preview...",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started!",
      description: "Your resume is being downloaded as PDF.",
    });
  };

  const selectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setActiveSection("personal");
    toast({
      title: "Template Selected!",
      description: "Now let's fill in your information.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link to="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={handlePreview} variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Save Resume
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resume Sections</CardTitle>
                <CardDescription>
                  Build your resume step by step
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveSection(section.id)}
                    disabled={section.id !== "templates" && !selectedTemplate}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === "templates" && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Layout className="h-6 w-6 mr-2" />
                    Choose Your Template
                  </CardTitle>
                  <CardDescription>
                    Select a professional template that matches your career style
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                          selectedTemplate === template.id 
                            ? 'ring-2 ring-blue-500 shadow-lg' 
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => selectTemplate(template.id)}
                      >
                        <CardContent className="p-6">
                          <div className={`w-16 h-20 ${template.color} rounded-lg flex items-center justify-center text-2xl mb-4 mx-auto`}>
                            {template.preview}
                          </div>
                          <h3 className="font-semibold text-lg mb-2 text-center">
                            {template.name}
                          </h3>
                          <p className="text-sm text-gray-600 text-center mb-4">
                            {template.description}
                          </p>
                          <Button 
                            className="w-full" 
                            variant={selectedTemplate === template.id ? "default" : "outline"}
                          >
                            {selectedTemplate === template.id ? "Selected" : "Select Template"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "personal" && selectedTemplate && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-2xl">Personal Information</CardTitle>
                  <CardDescription>
                    Let's start with your basic information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={resumeData.personal.firstName}
                        onChange={(e) => handlePersonalChange("firstName", e.target.value)}
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={resumeData.personal.lastName}
                        onChange={(e) => handlePersonalChange("lastName", e.target.value)}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.personal.email}
                        onChange={(e) => handlePersonalChange("email", e.target.value)}
                        placeholder="john.doe@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.personal.phone}
                        onChange={(e) => handlePersonalChange("phone", e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.personal.location}
                      onChange={(e) => handlePersonalChange("location", e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      value={resumeData.personal.summary}
                      onChange={(e) => handlePersonalChange("summary", e.target.value)}
                      placeholder="Write a brief summary of your professional background and career objectives..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "experience" && selectedTemplate && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl">Work Experience</CardTitle>
                      <CardDescription>
                        Add your professional experience
                      </CardDescription>
                    </div>
                    <Button onClick={addExperience} variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="p-6 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Experience {index + 1}</h4>
                        {resumeData.experience.length > 1 && (
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input placeholder="Company Name" />
                        </div>
                        <div className="space-y-2">
                          <Label>Position</Label>
                          <Input placeholder="Job Title" />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe your responsibilities and achievements..."
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {activeSection === "education" && selectedTemplate && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl">Education</CardTitle>
                      <CardDescription>
                        Add your educational background
                      </CardDescription>
                    </div>
                    <Button onClick={addEducation} variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="p-6 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Education {index + 1}</h4>
                        {resumeData.education.length > 1 && (
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>School</Label>
                        <Input placeholder="University/College Name" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select degree" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bachelor">Bachelor's</SelectItem>
                              <SelectItem value="master">Master's</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                              <SelectItem value="associate">Associate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Field of Study</Label>
                          <Input placeholder="Computer Science" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Graduation Date</Label>
                        <Input type="date" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {activeSection === "skills" && selectedTemplate && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl">Skills</CardTitle>
                      <CardDescription>
                        Add your technical and soft skills
                      </CardDescription>
                    </div>
                    <Button onClick={addSkill} variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skill
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={skill}
                        placeholder="Enter a skill"
                        className="flex-1"
                      />
                      {resumeData.skills.length > 1 && (
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
