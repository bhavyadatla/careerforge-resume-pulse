
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Resume {
  id: string;
  title: string;
  template_id: string;
  resume_data: any;
  created_at: string;
  updated_at: string;
}

export const useResumeStorage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);

  const saveResume = async (title: string, templateId: string, resumeData: any) => {
    if (!user) return null;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          name: title,
          type: 'resume',
          file_url: JSON.stringify({ template_id: templateId, resume_data: resumeData }),
          file_size: JSON.stringify(resumeData).length
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Resume Saved',
        description: `"${title}" has been saved successfully.`,
      });

      loadResumes();
      return data;
    } catch (error: any) {
      toast({
        title: 'Error Saving Resume',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const loadResumes = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'resume')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedResumes = data.map(doc => {
        const fileData = JSON.parse(doc.file_url);
        return {
          id: doc.id,
          title: doc.name,
          template_id: fileData.template_id,
          resume_data: fileData.resume_data,
          created_at: doc.uploaded_at,
          updated_at: doc.uploaded_at
        };
      });

      setResumes(formattedResumes);
    } catch (error: any) {
      console.error('Error loading resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (resumeId: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', resumeId);

      if (error) throw error;

      toast({
        title: 'Resume Deleted',
        description: 'Resume has been deleted successfully.',
      });

      loadResumes();
    } catch (error: any) {
      toast({
        title: 'Error Deleting Resume',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (user) {
      loadResumes();
    }
  }, [user]);

  return {
    resumes,
    loading,
    saveResume,
    loadResumes,
    deleteResume
  };
};
