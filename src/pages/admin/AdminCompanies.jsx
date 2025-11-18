import React, { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input.jsx';
import { Button } from '../../components/ui/button';
import {CompaniesTable} from '../../components/CompaniesTable.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice';
import { recruiterCompanies } from '@/api/company.api';
import { setCompanies } from '@/redux/companySlice';

export const AdminCompanies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const res = await recruiterCompanies();
          if (res.data.success) {
            dispatch(setCompanies(res.data.data));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchCompanies();
    }, []);

  return (
      <div className="max-w-4xl mx-auto my-10">
        <div className="flex items-center justify-between my-6">
          <Input
            onChange={e => setInput(e.target.value)}
            className="w-fit"
            placeholder="Filter by name"
          />
          <Button onClick={() => navigate('/admin/company/create')}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
  );
};

