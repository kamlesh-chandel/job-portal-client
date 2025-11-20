import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axiosInstance from '@/config/axiosConfig';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '@/redux/authSlice';

export const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  const [name, setName] = useState(user?.name || '');
  const [skills, setSkills] = useState(user?.profile?.skills?.join(', ') || '');
  const [linkedin, setLinkedin] = useState(
    user?.social_links?.linkedin_url || ''
  );
  const [github, setGithub] = useState(user?.social_links?.github_url || '');
  const [resumeFile, setResumeFile] = useState(null);

  const handleResumeUpload = e => {
    const file = e.target.files[0];
    setResumeFile(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('github_url', github);
    formData.append('linkdin_url', linkedin);
    formData.append('skills', skills);
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }

    try {
      const res = await axiosInstance.put('/users/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.data));
        toast.success(res.data.message);
       navigate("/profile")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Profile</h1>

      <div className="bg-white shadow-lg rounded-2xl p-8 border space-y-6">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
            className="mt-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Skills</label>
          <Input
            value={skills}
            onChange={e => setSkills(e.target.value)}
            placeholder="e.g. React, Node, CSS"
            className="mt-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Add skills separated by commas
          </p>
        </div>
        <div>
          <label className="text-sm font-medium">LinkedIn URL</label>
          <Input
            value={linkedin}
            onChange={e => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="mt-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium">GitHub URL</label>
          <Input
            value={github}
            onChange={e => setGithub(e.target.value)}
            placeholder="https://github.com/username"
            className="mt-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            className="mt-2 block w-full border rounded-lg px-3 py-2 text-sm"
          />
          {resumeFile && (
            <p className="text-sm text-green-600 mt-1">
              Selected: {resumeFile.name}
            </p>
          )}
        </div>
        <Button
          onClick={handleSubmit}
          className="w-full bg-primary hover:bg-primary/90 text-white mt-4"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
