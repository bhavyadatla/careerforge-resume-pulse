
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Navigate } from "react-router-dom";
import { FileText, Upload, User, LogOut, History, Download } from "lucide-react";
import { useResumeStorage } from "@/hooks/useResumeStorage";
import { downloadResumePDF } from "@/utils/pdfGenerator";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const { resumes, loading: resumesLoading } = useResumeStorage();

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div>Loading...</div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const recentResumes = resumes.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">CareerForge</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.email?.split('@')[0]}!
            </h2>
            <p className="text-gray-600">
              Ready to build your career? Let's create an outstanding resume and analyze your current one.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/resume-builder">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>Resume Builder</CardTitle>
                      <CardDescription>
                        Create professional resumes with our templates
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      6 professional templates available
                    </div>
                    <Button size="sm">
                      Start Building
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/resume-analyzer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Upload className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>Resume Analyzer</CardTitle>
                      <CardDescription>
                        Get AI-powered insights and improvement suggestions
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Upload PDF for analysis
                    </div>
                    <Button size="sm" variant="outline">
                      Analyze Now
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Recent Resumes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5" />
                  <span>Your Recent Resumes</span>
                </CardTitle>
                <CardDescription>
                  {resumes.length > 0 
                    ? `You have ${resumes.length} saved resume${resumes.length !== 1 ? 's' : ''}`
                    : "No resumes created yet"
                  }
                </CardDescription>
              </div>
              <Link to="/resume-builder">
                <Button size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Create New
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {resumesLoading ? (
                <div className="text-center py-8 text-gray-500">Loading resumes...</div>
              ) : recentResumes.length > 0 ? (
                <div className="space-y-4">
                  {recentResumes.map((resume) => (
                    <div
                      key={resume.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{resume.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Badge variant="secondary" className="text-xs">
                              {resume.template_id}
                            </Badge>
                            <span>•</span>
                            <span>Created {new Date(resume.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadResumePDF(resume.resume_data, resume.template_id, resume.title)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                  {resumes.length > 3 && (
                    <div className="text-center pt-4">
                      <Link to="/resume-builder">
                        <Button variant="outline" size="sm">
                          View All Resumes ({resumes.length})
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
                  <p className="text-gray-500 mb-4">
                    Get started by creating your first professional resume
                  </p>
                  <Link to="/resume-builder">
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Create Your First Resume
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">{resumes.length}</div>
                <div className="text-sm text-gray-600">Resumes Created</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">6</div>
                <div className="text-sm text-gray-600">Templates Available</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">∞</div>
                <div className="text-sm text-gray-600">Downloads Available</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
