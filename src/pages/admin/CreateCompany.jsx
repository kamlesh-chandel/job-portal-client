import React, { useState } from 'react';
import { Button } from '../../components/ui/button.jsx';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../../components/ui/label.jsx';
import { Input } from '../../components/ui/input.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createCompany } from '@/api/company.api';

const CompanyCreate = () => {
  const [input, setInput] = useState({
    name: '',
    website: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
    },
    file: null,
  });

  const [errors, setErrors] = useState({
    name: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = e => {
    const { name, value } = e.target;
    if (['street', 'city', 'state', 'country'].includes(name)) {
      setInput(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
      return;
    }

    setInput(prev => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = e => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: '' };

    if (!input.name.trim()) {
      newErrors.name = 'Company name is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input.file) formData.append('file', input.file);

    try {
      setLoading(true);
        const res = await createCompany(formData);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
            onClick={() => navigate('/admin/companies')}
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl">Company Setup</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-2.5">Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <Label className="mb-2.5">Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label className="mb-2.5">Street</Label>
            <Input
              type="text"
              name="street"
              value={input.address.street}
              onChange={changeEventHandler}
            />
          </div>{' '}
          <div>
            <Label className="mb-2.5">City</Label>
            <Input
              type="text"
              name="city"
              value={input.address.city}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label className="mb-2.5">State</Label>
            <Input
              type="text"
              name="state"
              value={input.address.state}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label className="mb-2.5">Country</Label>
            <Input
              type="text"
              name="country"
              value={input.address.country}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label className="mb-2.5">File</Label>
            <Input type="file" accept="image/*" onChange={changeFileHandler} />
          </div>
        </div>
        {loading ? (
          <Button className="w-full my-6">
            {' '}
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full my-6">
            Create
          </Button>
        )}
      </form>
    </div>
  );
};

export default CompanyCreate;
