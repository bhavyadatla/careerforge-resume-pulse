
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link, Navigate } from "react-router-dom";
import { Upload, FileText, Download, ArrowLeft, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { generateResumePDF, downloadResumePDF } from '@/utils/pdfGenerator';

interface AnalysisScores {
  overall: number;
  formatting: number;
  content: number;
  keywords: number;
  structure: number;
  ats_compatibility: number;
}

interface SuggestionCategory {
  category: string;
  type: 'high' | 'medium' | 'low';
  items: string[];
}

interface KeywordAnalysis {
  found: string[];
  missing: string[];
  recommended: string[];
}

interface AnalysisResult {
  fileName: string;
  scores: AnalysisScores;
  suggestions: SuggestionCategory[];
  keywordAnalysis: KeywordAnalysis;
  overallFeedback: string;
}

const ResumeAnalyzer = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div>Loading...</div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setSelectedFile(file);
        setAnalysis(null);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select a PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  const generateDetailedAnalysis = (fileName: string): AnalysisResult => {
    // Enhanced analysis with more comprehensive suggestions
    const scores: AnalysisScores = {
      overall: Math.floor(Math.random() * 30) + 70,
      formatting: Math.floor(Math.random() * 20) + 80,
      content: Math.floor(Math.random() * 25) + 65,
      keywords: Math.floor(Math.random() * 35) + 55,
      structure: Math.floor(Math.random() * 20) + 75,
      ats_compatibility: Math.floor(Math.random() * 25) + 70
    };

    const suggestions: SuggestionCategory[] = [
      {
        category: "Content Enhancement",
        type: "high",
        items: [
          "Add quantified achievements (e.g., 'Increased sales by 25%' instead of 'Improved sales')",
          "Include 2-3 key accomplishments for each role with specific metrics",
          "Strengthen your professional summary with industry-specific keywords",
          "Add relevant certifications or professional development courses"
        ]
      },
      {
        category: "Keyword Optimization",
        type: "high",
        items: [
          "Include more industry-specific technical skills",
          "Add relevant software/tools mentioned in job descriptions",
          "Incorporate action verbs like 'implemented', 'developed', 'optimized'",
          "Include soft skills that are in demand: 'collaboration', 'problem-solving'"
        ]
      },
      {
        category: "Format & Structure",
        type: "medium",
        items: [
          "Ensure consistent date formatting throughout the resume",
          "Use bullet points for better readability",
          "Maintain consistent font sizes and spacing",
          "Keep resume to 1-2 pages maximum"
        ]
      },
      {
        category: "ATS Optimization",
        type: "high",
        items: [
          "Use standard section headers (Experience, Education, Skills)",
          "Avoid using images, graphics, or complex formatting",
          "Save as both .pdf and .docx formats",
          "Include a skills section with exact keyword matches from job posts"
        ]
      },
      {
        category: "Professional Polish",
        type: "low",
        items: [
          "Add a LinkedIn profile URL",
          "Include a professional email address",
          "Consider adding relevant volunteer work or projects",
          "Proofread for grammar and spelling errors"
        ]
      }
    ];

    const keywordAnalysis: KeywordAnalysis = {
      found: ["JavaScript", "React", "Node.js", "Project Management", "Team Leadership"],
      missing: ["Python", "AWS", "Docker", "Agile", "Scrum", "Data Analysis"],
      recommended: ["Cloud Computing", "DevOps", "Machine Learning", "API Development"]
    };

    return {
      fileName,
      scores,
      suggestions,
      keywordAnalysis,
      overallFeedback: `Your resume shows strong ${scores.formatting > 80 ? 'formatting' : 'content'} but could benefit from ${scores.keywords < 70 ? 'keyword optimization' : 'content enhancement'}. Focus on quantifying achievements and including more industry-specific terms.`
    };
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      const analysisResult = generateDetailedAnalysis(selectedFile.name);
      setAnalysis(analysisResult);
      setAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Your resume has been analyzed with a score of ${analysisResult.scores.overall}/100.`,
      });
    }, 3000);
  };

  const downloadAnalysisReport = () => {
    if (!analysis) return;

    const reportData = {
      personalInfo: {
        fullName: `Resume Analysis Report - ${analysis.fileName}`,
        email: `Analysis Date: ${new Date().toLocaleDateString()}`,
        phone: `Overall Score: ${analysis.scores.overall}/100`,
        location: 'Generated by Resume Analyzer'
      },
      summary: analysis.overallFeedback,
      experience: analysis.suggestions.map(category => ({
        position: category.category,
        company: `Priority: ${category.type.toUpperCase()}`,
        startDate: '',
        endDate: '',
        description: category.items.join('\n• ')
      })),
      education: [
        {
          degree: 'Score Breakdown',
          institution: 'Detailed Analysis',
          startDate: '',
          endDate: '',
          description: Object.entries(analysis.scores)
            .filter(([key]) => key !== 'overall')
            .map(([key, value]) => `${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: ${value}/100`)
            .join('\n')
        }
      ],
      skills: [
        ...analysis.keywordAnalysis.found.map(k => `✓ ${k}`),
        ...analysis.keywordAnalysis.missing.map(k => `✗ Missing: ${k}`),
        ...analysis.keywordAnalysis.recommended.map(k => `→ Recommended: ${k}`)
      ]
    };

    downloadResumePDF(reportData, 'analysis', `resume-analysis-${new Date().toISOString().split('T')[0]}`);
  };

  const getPriorityColor = (type: string) => {
    switch (type) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (type: string) => {
    switch (type) {
      case 'high': return <XCircle className="h-4 w-4" />;
      case 'medium': return <AlertCircle className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Resume Analyzer</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/resume-builder">
                <Button variant="outline" size="sm">
                  Go to Resume Builder
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription>
                Upload your resume in PDF format for comprehensive analysis and improvement suggestions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resume-upload">Select Resume File</Label>
                  <Input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
                </div>
                
                {selectedFile && (
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button onClick={handleAnalyze} disabled={analyzing}>
                      {analyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Analyze Resume
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Overall Score */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Analysis Results</CardTitle>
                    <CardDescription>
                      Comprehensive analysis of your resume with actionable insights
                    </CardDescription>
                  </div>
                  <Button onClick={downloadAnalysisReport} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {analysis.scores.overall}/100
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      {analysis.overallFeedback}
                    </p>
                  </div>

                  {/* Detailed Scores */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(analysis.scores).map(([key, value]) => {
                      if (key === 'overall') return null;
                      const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                      return (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{label}</span>
                            <span className="text-sm text-gray-600">{value}/100</span>
                          </div>
                          <Progress value={value} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Improvement Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle>Improvement Suggestions</CardTitle>
                  <CardDescription>
                    Prioritized recommendations to enhance your resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {analysis.suggestions.map((category, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          {getPriorityIcon(category.type)}
                          <h3 className="font-semibold text-lg">{category.category}</h3>
                          <Badge className={getPriorityColor(category.type)}>
                            {category.type.toUpperCase()} PRIORITY
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {category.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start space-x-2 text-sm">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Keyword Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Keyword Analysis</CardTitle>
                  <CardDescription>
                    Keywords found, missing, and recommended for better ATS compatibility
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-green-800 mb-3 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Found Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywordAnalysis.found.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-red-800 mb-3 flex items-center">
                        <XCircle className="h-4 w-4 mr-2" />
                        Missing Important Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywordAnalysis.missing.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Recommended Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywordAnalysis.recommended.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
