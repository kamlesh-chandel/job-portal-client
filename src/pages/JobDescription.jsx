import React, { useEffect, useState } from 'react';
import { Badge } from '../components/ui/badge.jsx';
import { Button } from '../components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { applyJob, fetchJobDetail } from '@/api/job.api';
import { checkUserApplied } from '@/api/submission.api';

const JobDescription = () => {
  const [singleJob, setSingleJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const params = useParams();
  const jobId = params.id;
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  const fetchSingleJob = async () => {
    try {
      const res = await fetchJobDetail(jobId);
      if (res.data.success) {
        setSingleJob(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAppliedStatus = async () => {
    try {
      const res = await checkUserApplied(jobId);
      if (res.data.success) {
        setIsApplied(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleJob();
    checkAppliedStatus();
  }, [jobId, user._id]);

  const applyJobHandler = async () => {
    try {
      if (isApplied) return; //if already applied, dont take any action
      const res = await applyJob(jobId);
      if (res.data.success) {
        setIsApplied(true);
        setSingleJob(res.data.data);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-18">
      <div className="mb-10">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-gray-500 font-semibold"
          onClick={() => navigate('/jobs')}
        >
          <ArrowLeft />
          <span>Back</span>
        </Button>
      </div>

      <div className="max-w-5xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>

            <div className="flex items-center gap-2 mt-4">
              <Badge className="text-blue-700 font-bold" variant="ghost">
                {singleJob?.positions} position
              </Badge>

              <Badge className="text-[#f83002] font-bold" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>

              {singleJob?.jobType && (
                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                  {singleJob?.jobType}
                </Badge>
              )}
            </div>
          </div>

          <Button
            disabled={isApplied}
            onClick={applyJobHandler}
            className={`rounded-lg cursor-pointer bg-[#7209b7] hover:bg-[#5f32ad] 
              ${isApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isApplied ? 'Applied' : 'Apply'}
          </Button>
        </div>

        <h1 className="mt-3 border-b-2 border-b-gray-300 font-medium py-4">
          Job description
        </h1>

        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Company:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.company?.name}
            </span>
          </h1>
          {singleJob?.requirements?.length > 0 && (
            <h1 className="font-bold my-1 flex items-start">
              Requirements:
              <span className="pl-2 font-normal text-gray-700 tracking-wide">
                {singleJob?.requirements?.join(' • ')}
              </span>
            </h1>
          )}
          <h1 className="font-bold my-1">
            Location:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience Level:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Job Type:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.jobType}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt
                ? new Date(singleJob.createdAt).toLocaleDateString('en-IN')
                : ''}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
