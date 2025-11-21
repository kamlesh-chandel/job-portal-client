import React, { useState } from 'react';
import { Button } from '../../components/ui/button.jsx';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select.jsx';
import { createJob } from '@/api/job.api';

const jobTypes = [
  'Full-time',
  'Part-time',
  'Internship',
  'Contract',
  'Temporary',
  'Freelance',
  'Volunteer',
  'Remote',
  'On-site',
  'Hybrid',
];

const CreateJob = () => {
  const { companies } = useSelector(store => store.company);

  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    positions: '',
    companyId: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeSelectHandler = value => {
    const selectedCompany = companies.find(
      c => c.name.toLowerCase() === value.toLowerCase()
    );
    setInput({ ...input, companyId: selectedCompany?.id || '' });
  };

  const submitHandler = async e => {
    e.preventDefault();

    const payload = {
      title: input.title,
      description: input.description,
      requirements: input.requirements,
      salary: Number(input.salary),
      experienceLevel: Number(input.experienceLevel),
      location: input.location,
      jobType: input.jobType,
      positions: Number(input.positions),
      companyId: input.companyId,
    };

    try {
      setLoading(true);
      const res = await createJob(payload);

      if (res.success) {
        toast.success(res.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10">
      <form onSubmit={submitHandler}>
        <div className="flex items-center gap-5 p-8">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold"
            onClick={() => navigate('/admin/jobs')}
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl">Create New Job</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <Label className="mb-2.5">Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label className="mb-2.5">Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label className="mb-2.5">Requirements (comma separated)</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label className="mb-2.5">Salary</Label>
            <Input
              type="number"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label className="mb-2.5">Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label className="mb-2.5">Job Type</Label>
            <Select
              value={input.jobType}
              onValueChange={val => setInput({ ...input, jobType: val })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes?.map(t => (
                  <SelectItem value={t} key={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2.5">Experience (in years)</Label>
            <Input
              type="number"
              name="experienceLevel"
              value={input.experienceLevel}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label className="mb-2.5">Positions</Label>
            <Input
              type="number"
              name="positions"
              value={input.positions}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label className="mb-2.5">Company</Label>
            <Select onValueChange={changeSelectHandler}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                {companies?.map(c => (
                  <SelectItem value={c.name} key={c._id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {companies.length <= 0 ? (
          <span className="text-red-600 font-medium">
            Please register a company first
          </span>
        ) : (
          <>
            {loading ? (
              <Button className="w-full my-6">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-6">
                Create
              </Button>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default CreateJob;
