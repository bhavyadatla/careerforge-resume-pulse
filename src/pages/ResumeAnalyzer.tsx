
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { FileText, Upload, Target, AlertCircle, CheckCircle, ArrowLeft, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a resume file to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        overallScore: 87,
        sections: {
          format: 92,
          content: 85,
          keywords: 78,
          experience: 90,
          skills: 88
        },
        improvements: [
          "Add more industry-specific keywords",
          "Include quantifiable achievements",
          "Improve section formatting consistency",
          "Add relevant technical skills"
        ],
        strengths: [
          "Strong professional experience section",
          "Clear and readable format",
          "Good use of action verbs",
          "Appropriate length and structure"
        ]
      });
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed successfully.",
      });
    }, 3000);
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
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Analyzer</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!analysisResult ? (
          /* Upload Section */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Analyze Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Resume</span>
              </h2>
              <p className="text-xl text-gray-600">
                Get instant feedback and improve your resume with our AI-powered analysis tool.
              </p>
            </div>

            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Upload Your Resume</CardTitle>
                <CardDescription>
                  Supported formats: PDF, DOC, DOCX (Max size: 10MB)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Label htmlFor="resume" className="cursor-pointer">
                      <span className="text-blue-600 hover:underline">Click to upload</span> or drag and drop
                    </Label>
                    {file && (
                      <p className="mt-2 text-sm text-gray-600">
                        Selected: {file.name}
                      </p>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </Button>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Analyzing your resume...</span>
                      <span>Please wait</span>
                    </div>
                    <Progress value={75} className="w-full" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Analysis <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Complete</span>
              </h2>
              <p className="text-xl text-gray-600">
                Here's your detailed resume analysis and improvement suggestions.
              </p>
            </div>

            {/* Overall Score */}
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold">{analysisResult.overallScore}%</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Overall Score</h3>
                <p className="text-green-100">
                  Your resume is performing well! Check the detailed breakdown below.
                </p>
              </CardContent>
            </Card>

            {/* Detailed Scores */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(analysisResult.sections).map(([key, score]) => (
                <Card key={key} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg capitalize">{key}</h4>
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Score</span>
                        <span className="font-medium">{score}%</span>
                      </div>
                      <Progress value={score as number} className="w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Improvements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                    Areas for Improvement
                  </CardTitle>
                  <CardDescription>
                    Focus on these areas to boost your resume score.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.improvements.map((improvement: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                        <span className="text-gray-700">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    Your Strengths
                  </CardTitle>
                  <CardDescription>
                    These are the strong points in your resume.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.strengths.map((strength: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setAnalysisResult(null)} variant="outline" className="transform hover:scale-105 transition-all duration-200">
                Analyze Another Resume
              </Button>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200">
                <Link to="/resume-builder">
                  Build New Resume
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
