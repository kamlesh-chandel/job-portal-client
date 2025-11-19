import React, { useEffect, useState } from 'react';
import { Job } from '@/components/Job';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs, setSearchedQuery } from '../redux/jobSlice';
import { fetchAllJobs } from '@/api/job.api';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
export const Jobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery, allJobs } = useSelector(store => store.job);
  const [page, setPage] = useState(1);
  const limit = 6;
  useEffect(() => {
    const fetchJobsFn = async () => {
      try {
        const res = await fetchAllJobs(searchedQuery, page, limit);
        if (res.data.success) {
          dispatch(setAllJobs(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobsFn();
  }, [searchedQuery, page]);
  useEffect(() => {
    return () => dispatch(setSearchedQuery(''));
  }, []);
  const totalPages = allJobs?.total
    ? Math.ceil(allJobs.total / allJobs.limit)
    : 1;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between my-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {allJobs?.total || 0} Jobs Found
            </h2>

            <Input
              className="w-60"
              placeholder="Search jobs..."
              value={searchedQuery}
              onChange={e => {
                dispatch(setSearchedQuery(e.target.value));
                setPage(1);
              }}
            />
          </div>
          {allJobs?.items?.length <= 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Jobs Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or check back later for new
                opportunities.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allJobs.items.map(job => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-center mt-10 gap-2">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? 'default' : 'outline'}
                        className="px-4"
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
