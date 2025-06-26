import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link, Navigate } from "react-router-dom";
import { FileText, Upload, ArrowLeft, Download, Target, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const ResumeAnalyzer = () => {
  const { user, loading } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div>Loading...</div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith('.pdf')) {
        setFile(selectedFile);
        toast({
          title: "File Selected",
          description: `${selectedFile.name} is ready for analysis.`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select a PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    
    setAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        score: 87,
        strengths: [
          "Strong technical skills section",
          "Relevant work experience",
          "Clear and concise formatting",
          "Good use of action verbs"
        ],
        improvements: [
          "Add more quantifiable achievements",
          "Include a professional summary",
          "Consider adding relevant certifications",
          "Optimize for ATS systems"
        ],
        sections: {
          contact: { score: 95, feedback: "Complete and professional" },
          summary: { score: 70, feedback: "Could be more compelling" },
          experience: { score: 90, feedback: "Well-structured with good details" },
          education: { score: 85, feedback: "Relevant and properly formatted" },
          skills: { score: 88, feedback: "Good technical coverage" }
        }
      });
      setAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed successfully.",
      });
    }, 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      toast({
        title: "File Dropped",
        description: `${droppedFile.name} is ready for analysis.`,
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    return <AlertCircle className="h-5 w-5 text-red-600" />;
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
          // Upload Section
          <div className="max-w-2xl mx-auto">
            <Card className="animate-fade-in">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Analyze Your Resume</CardTitle>
                <CardDescription className="text-lg">
                  Get detailed feedback and scoring to improve your resume's effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {file ? file.name : "Drop your resume here or click to browse"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF files up to 10MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {file && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleAnalyze}
                  disabled={!file || analyzing}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-3 text-lg"
                >
                  {analyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Target className="h-5 w-5 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </Button>

                {analyzing && (
                  <div className="space-y-2">
                    <Progress value={33} className="w-full" />
                    <p className="text-center text-sm text-gray-600">
                      Analyzing content and structure...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          // Results Section
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Analysis Results</h2>
              <div className="flex items-center justify-center space-x-2">
                <div className={`text-4xl font-bold ${getScoreColor(analysisResult.score)}`}>
                  {analysisResult.score}/100
                </div>
                {getScoreIcon(analysisResult.score)}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Score Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Section Scores
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(analysisResult.sections).map(([section, data]: [string, any]) => (
                    <div key={section} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium capitalize">{section}</span>
                        <span className={`font-bold ${getScoreColor(data.score)}`}>
                          {data.score}/100
                        </span>
                      </div>
                      <Progress value={data.score} className="w-full" />
                      <p className="text-sm text-gray-600">{data.feedback}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Strengths & Improvements */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisResult.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-600">
                      <Info className="h-5 w-5 mr-2" />
                      Suggested Improvements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisResult.improvements.map((improvement: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Info className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => {
                  setAnalysisResult(null);
                  setFile(null);
                }}
                variant="outline"
                className="px-6"
              >
                Analyze Another Resume
              </Button>
              <Button
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-6"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6">
                <Link to="/resume-builder">
                  Improve with Builder
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
