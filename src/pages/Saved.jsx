import React, { useEffect } from 'react';
import { Job } from '../components/Job.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getBookmarkJobs } from '@/api/bookmark.api.js';
import { setBookmarkJobs } from '@/redux/bookmarkSlice.js';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const SavedJobs = () => {
  const dispatch = useDispatch();

  const fetchBookmarkJobs = async () => {
    try {
      const res = await getBookmarkJobs();
      if (res.data.success) {
        dispatch(setBookmarkJobs(res.data.data));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBookmarkJobs();
  }, []);

  const { bookmarkJobs } = useSelector(store => store.bookmark);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <h1 className="text-3xl font-bold my-4">Saved Jobs</h1>
      <div className="flex gap-5">
        {bookmarkJobs.items.length <= 0 ? (
          <span>You havn't Saved any job yet</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4">
              {bookmarkJobs?.items?.map(bookmark => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={bookmark.job.id}
                >
                  <Job job={bookmark.job} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
