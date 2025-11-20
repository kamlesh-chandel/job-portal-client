import React, { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input.jsx';
import { Button } from '../../components/ui/button';
import { CompaniesTable } from '../../components/CompaniesTable.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText, setCompanies } from '../../redux/companySlice';
import { recruiterCompanies } from '@/api/company.api';

const LIMIT = 10;
export const AdminCompanies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const [companies, setLocalCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await recruiterCompanies(page, LIMIT);

      if (res.data.success) {
        dispatch(setCompanies(res.data.data));
        setLocalCompanies(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.log('Pagination Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page]);

  return (
    <div className="max-w-5xl mx-auto py-10 min-h-[80h] flex flex-col">
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

      <div className="min-h-[450px] transition-all duration-300">
        <CompaniesTable companies={companies} loading={loading} />
      </div>

      <div className="flex items-center justify-center mt-6 gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <span className="border rounded-sm px-4 py-[5px] shadow-xs">
          {page}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
