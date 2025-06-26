import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link, Navigate } from "react-router-dom";
import { FileText, Download, Save, History, Eye, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useResumeStorage } from "@/hooks/useResumeStorage";
import { downloadResumePDF } from "@/utils/pdfGenerator";
import ResumePreview from "@/components/ResumePreview";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and modern design with blue accents",
    preview: "Blue gradient header, professional layout"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Classic and professional layout",
    preview: "Traditional serif fonts, conservative styling"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique and creative design with purple gradients",
    preview: "Purple-pink gradients, creative borders"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and minimal style",
    preview: "Clean lines, minimal decoration, light fonts"
  },
  {
    id: "executive",
    name: "Executive",
    description: "Elegant and executive look with dark theme",
    preview: "Dark background, premium appearance"
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern and tech-focused design",
    preview: "Green accents, monospace fonts, tech style"
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated rose-themed design",
    preview: "Rose gradients, serif fonts, elegant styling"
  },
  {
    id: "bold",
    name: "Bold",
    description: "Strong black and white contrast",
    preview: "High contrast, bold typography, striking design"
  },
];

const ResumeBuilder = () => {
  const { user, loading } = useAuth();
  const { saveResume, resumes, loading: saveLoading } = useResumeStorage();
  
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeTitle, setResumeTitle] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: ""
  });
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState([{
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    description: ""
  }]);
  const [education, setEducation] = useState([{
    degree: "",
    institution: "",
    startDate: "",
    endDate: ""
  }]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div>Loading...</div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const resumeData = {
    personalInfo,
    summary,
    experience,
    education,
    skills
  };

  const handleSaveResume = async () => {
    if (!resumeTitle.trim()) {
      alert('Please enter a resume title');
      return;
    }
    
    await saveResume(resumeTitle, selectedTemplate, resumeData);
  };

  const handleDownloadPDF = () => {
    const filename = resumeTitle || 'my-resume';
    downloadResumePDF(resumeData, selectedTemplate, filename);
  };

  const addExperience = () => {
    setExperience([...experience, { position: "", company: "", startDate: "", endDate: "", description: "" }]);
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", institution: "", startDate: "", endDate: "" }]);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <History className="h-4 w-4 mr-2" />
                    My Resumes ({resumes.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>My Saved Resumes</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {resumes.map((resume) => (
                      <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{resume.title}</h3>
                          <p className="text-sm text-gray-500">
                            Template: {resume.template_id} • Created: {new Date(resume.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => downloadResumePDF(resume.resume_data, resume.template_id, resume.title)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {resumes.length === 0 && (
                      <p className="text-center text-gray-500 py-8">No saved resumes yet</p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <Button onClick={() => setShowPreview(!showPreview)} variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
              
              <Button onClick={handleDownloadPDF} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              
              <Button onClick={handleSaveResume} disabled={saveLoading} size="sm">
                <Save className="h-4 w-4 mr-2" />
                {saveLoading ? 'Saving...' : 'Save Resume'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Resume Title */}
            <Card>
              <CardHeader>
                <CardTitle>Resume Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="resume-title">Resume Title</Label>
                    <Input
                      id="resume-title"
                      value={resumeTitle}
                      onChange={(e) => setResumeTitle(e.target.value)}
                      placeholder="e.g., Software Engineer Resume"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Template</CardTitle>
                <CardDescription>Select a professional template for your resume - each has a unique visual style</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="text-center">
                        <div className={`w-full h-24 rounded mb-3 flex items-center justify-center text-xs p-2 ${
                          template.id === 'modern' ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800' :
                          template.id === 'professional' ? 'bg-gray-100 text-gray-700 border border-gray-300' :
                          template.id === 'creative' ? 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-800' :
                          template.id === 'minimal' ? 'bg-white border border-gray-200 text-gray-600' :
                          template.id === 'executive' ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white' :
                          template.id === 'tech' ? 'bg-gradient-to-br from-green-100 to-blue-100 text-green-800 font-mono' :
                          template.id === 'elegant' ? 'bg-gradient-to-br from-rose-100 to-orange-100 text-rose-800' :
                          template.id === 'bold' ? 'bg-black text-white font-bold' :
                          'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600'
                        }`}>
                          <div className="text-center">
                            <FileText className="h-6 w-6 mx-auto mb-1" />
                            <div className="text-xs">{template.preview}</div>
                          </div>
                        </div>
                        <h3 className="font-medium text-sm">{template.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resume Form Tabs */}
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                        placeholder="New York, NY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Brief professional summary..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experience.map((exp, index) => (
                      <div key={index} className="space-y-4 p-4 border rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => {
                                const updated = [...experience];
                                updated[index].position = e.target.value;
                                setExperience(updated);
                              }}
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => {
                                const updated = [...experience];
                                updated[index].company = e.target.value;
                                setExperience(updated);
                              }}
                              placeholder="Tech Company"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              value={exp.startDate}
                              onChange={(e) => {
                                const updated = [...experience];
                                updated[index].startDate = e.target.value;
                                setExperience(updated);
                              }}
                              placeholder="Jan 2022"
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              value={exp.endDate}
                              onChange={(e) => {
                                const updated = [...experience];
                                updated[index].endDate = e.target.value;
                                setExperience(updated);
                              }}
                              placeholder="Present"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => {
                              const updated = [...experience];
                              updated[index].description = e.target.value;
                              setExperience(updated);
                            }}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                    <Button onClick={addExperience} variant="outline" className="w-full">
                      Add Experience
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {education.map((edu, index) => (
                      <div key={index} className="space-y-4 p-4 border rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => {
                                const updated = [...education];
                                updated[index].degree = e.target.value;
                                setEducation(updated);
                              }}
                              placeholder="Bachelor of Science"
                            />
                          </div>
                          <div>
                            <Label>Institution</Label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => {
                                const updated = [...education];
                                updated[index].institution = e.target.value;
                                setEducation(updated);
                              }}
                              placeholder="University Name"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              value={edu.startDate}
                              onChange={(e) => {
                                const updated = [...education];
                                updated[index].startDate = e.target.value;
                                setEducation(updated);
                              }}
                              placeholder="2018"
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              value={edu.endDate}
                              onChange={(e) => {
                                const updated = [...education];
                                updated[index].endDate = e.target.value;
                                setEducation(updated);
                              }}
                              placeholder="2022"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button onClick={addEducation} variant="outline" className="w-full">
                      Add Education
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Enter a skill"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        >
                          {skill} ×
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Preview</CardTitle>
                  <CardDescription>
                    This is how your resume will look
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ResumePreview resumeData={resumeData} templateId={selectedTemplate} />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
