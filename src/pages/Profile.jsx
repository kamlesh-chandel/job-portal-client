import React, { useState } from 'react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../components/ui/avatar.jsx';
import { Button } from '../components/ui/button';
import { Mail, Pen } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
//import AppliedJobTable from './AppliedJobTable';
//import UpdateProfileDiolog from './UpdateProfileDiolog';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { setAuthUser } from '../redux/authSlice';
import { Link } from 'react-router-dom';
import { AppliedJobTable } from '@/components/AppliedJobTable.jsx';
import { setAppliedJobs } from '@/redux/jobSlice.js';
import { getAppliedJobs } from '@/api/job.api.js';
import { useEffect } from 'react';
import axios from 'axios';
const isResume = true;

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  const dispatch = useDispatch();

  const handleProfilePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhotoFile(file);
    }
  };

  useEffect(() => {
    const updatePhoto = async () => {
      const formData = new FormData();
      formData.append('profile', profilePhotoFile);

      try {
        const res = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/users/me/photo`,
          formData,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
        }
      } catch (error) {
        console.log(error);
      }
    };
    updatePhoto();
  }, [profilePhotoFile]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await getAppliedJobs();
        if (res.data.success) {
          dispatch(setAppliedJobs(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-primary/10 cursor-pointer">
                  <AvatarImage
                    src={
                      profilePhotoFile
                        ? URL.createObjectURL(profilePhotoFile)
                        : user.profile?.profile_url
                    }
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xl">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <input
                  id="profilePhotoInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePhotoChange}
                />

                <label
                  htmlFor="profilePhotoInput"
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow"
                >
                  <Pen className="w-4 h-4 text-white" />
                </label>
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
                  {user.name}
                </h1>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>

                  {user.social_links?.linkedin_url && (
                    <a
                      href={user.social_links.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4.98 3.5C4.98 4.88 ..." />
                      </svg>
                      LinkedIn Profile
                    </a>
                  )}
                  {user.social_links?.github_url && (
                    <a
                      href={user.social_links.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .5C5.73 ..." />
                      </svg>
                      GitHub Profile
                    </a>
                  )}
                </div>
              </div>
            </div>
            <Link
              className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all"
              to="/profile/edit"
            >
              <Pen className="w-4 h-4" />
              Edit Profile
            </Link>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.profile.skills.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-primary/10 text-primary border-primary/20 px-3 py-1 text-sm rounded-lg"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500 italic">No skills added yet</p>
              )}
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Resume</h3>
            {user.profile.resume_url ? (
              <a
                target="_blank"
                href={user.profile.resume_url}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6..."
                  />
                </svg>
                Download Resume
              </a>
            ) : (
              <p className="text-gray-500 italic">No resume uploaded</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Applied Jobs
          </h2>
          <AppliedJobTable />
        </div>
      </div>
    </div>
  );
};
