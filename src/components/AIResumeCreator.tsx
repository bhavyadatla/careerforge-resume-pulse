
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIResumeCreatorProps {
  onResumeGenerated: (resumeData: any, templateId: string) => void;
  onClose: () => void;
}

const AIResumeCreator = ({ onResumeGenerated, onClose }: AIResumeCreatorProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    targetRole: "",
    industry: "",
    experienceLevel: "",
    skills: "",
    previousExperience: "",
    education: "",
    achievements: "",
    templatePreference: "modern"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateResume = async () => {
    if (!formData.fullName || !formData.targetRole) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name and target role.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate AI processing (in a real app, this would call an AI service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate AI-powered resume data
      const aiGeneratedResume = {
        personalInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location
        },
        summary: generateSummary(),
        experience: generateExperience(),
        education: generateEducation(),
        skills: generateSkills()
      };

      onResumeGenerated(aiGeneratedResume, formData.templatePreference);
      
      toast({
        title: "Resume Generated!",
        description: "Your AI-powered resume has been created successfully.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = () => {
    const summaries = {
      "entry": `Dynamic ${formData.targetRole} with a passion for ${formData.industry}. Eager to contribute fresh perspectives and strong foundational skills to drive meaningful results. ${formData.achievements ? `Known for ${formData.achievements.toLowerCase()}.` : ''}`,
      "mid": `Experienced ${formData.targetRole} with proven expertise in ${formData.industry}. Demonstrated ability to deliver high-quality results and collaborate effectively in team environments. ${formData.achievements ? `Successfully ${formData.achievements.toLowerCase()}.` : ''}`,
      "senior": `Senior ${formData.targetRole} with extensive experience in ${formData.industry}. Proven track record of leading initiatives, mentoring teams, and driving strategic outcomes. ${formData.achievements ? `Recognized for ${formData.achievements.toLowerCase()}.` : ''}`
    };
    return summaries[formData.experienceLevel as keyof typeof summaries] || summaries.mid;
  };

  const generateExperience = () => {
    if (!formData.previousExperience) return [];
    
    const experiences = formData.previousExperience.split('\n').filter(exp => exp.trim());
    return experiences.map((exp, index) => ({
      position: formData.targetRole,
      company: `Company ${index + 1}`,
      startDate: "2020",
      endDate: index === 0 ? "Present" : "2023",
      description: exp.trim()
    }));
  };

  const generateEducation = () => {
    if (!formData.education) return [];
    
    return [{
      degree: formData.education,
      institution: "University",
      startDate: "2016",
      endDate: "2020"
    }];
  };

  const generateSkills = () => {
    if (!formData.skills) return [];
    return formData.skills.split(',').map(skill => skill.trim()).filter(Boolean);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          Create Resume with AI
        </CardTitle>
        <CardDescription>
          Provide some basic information and let AI create a professional resume for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="New York, NY"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="targetRole">Target Role *</Label>
            <Input
              id="targetRole"
              value={formData.targetRole}
              onChange={(e) => handleInputChange('targetRole', e.target.value)}
              placeholder="Software Engineer"
            />
          </div>
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              placeholder="Technology"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <Select value={formData.experienceLevel} onValueChange={(value) => handleInputChange('experienceLevel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid Level (3-7 years)</SelectItem>
                <SelectItem value="senior">Senior Level (8+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="templatePreference">Preferred Template</Label>
            <Select value={formData.templatePreference} onValueChange={(value) => handleInputChange('templatePreference', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="elegant">Elegant</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Input
            id="skills"
            value={formData.skills}
            onChange={(e) => handleInputChange('skills', e.target.value)}
            placeholder="React, JavaScript, Node.js, Python"
          />
        </div>

        <div>
          <Label htmlFor="education">Education</Label>
          <Input
            id="education"
            value={formData.education}
            onChange={(e) => handleInputChange('education', e.target.value)}
            placeholder="Bachelor of Science in Computer Science"
          />
        </div>

        <div>
          <Label htmlFor="previousExperience">Previous Experience (one per line)</Label>
          <Textarea
            id="previousExperience"
            value={formData.previousExperience}
            onChange={(e) => handleInputChange('previousExperience', e.target.value)}
            placeholder="Developed web applications using React and Node.js&#10;Led a team of 5 developers on e-commerce project&#10;Improved application performance by 40%"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="achievements">Key Achievements (optional)</Label>
          <Textarea
            id="achievements"
            value={formData.achievements}
            onChange={(e) => handleInputChange('achievements', e.target.value)}
            placeholder="Increased sales by 30%, won employee of the month award, published research paper"
            rows={2}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={generateResume} disabled={loading} className="flex-1">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Generating Resume...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Resume with AI
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIResumeCreator;
