import React from 'react';
import { Button } from '../components/ui/button.jsx';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { saveBookmark, deleteBookmark } from '@/api/bookmark.api.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { addBookmark, removeBookmarkById } from '@/redux/bookmarkSlice.js';

export const Job = ({ job, fetchJobsFn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookmarkJobs } = useSelector(store => store.bookmark);
  const savedItems = bookmarkJobs.items || [];
  const savedBookmark = savedItems.find(b => b.jobId === job.id);
  const isSaved = Boolean(savedBookmark);

  const handleSaveJob = async () => {
    try {
      const res = await saveBookmark(job.id);

      if (res.data.success) {
        toast.success('Job saved successfully!');
        dispatch(addBookmark(res.data.data));
        fetchJobsFn();
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to save job');
    }
  };

  const handleRemoveJob = async () => {
    try {
      const bookmarkId = savedBookmark.id;

      const res = await deleteBookmark(bookmarkId);

      if (res.data.success) {
        toast.success('Removed from saved jobs');
        dispatch(removeBookmarkById(bookmarkId));
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to remove job');
    }
  };

  const logo = job?.company?.logo_url || job?.company?.logoUrl;
  const companyName = job?.company?.name?.[0]?.toUpperCase() || '?';

  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 card-hover">
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-10 h-10">
          {logo ? (
            <AvatarImage src={logo} />
          ) : (
            <AvatarFallback className="bg-primary/80 text-white font-bold">
              {companyName}
            </AvatarFallback>
          )}
        </Avatar>

        <div>
          <h3 className="font-semibold text-lg">{job?.company?.name}</h3>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <h2 className="font-bold text-xl mb-2">{job?.title}</h2>
      <p className="text-gray-600 text-sm line-clamp-2">{job?.description}</p>

      <div className="flex gap-3 mt-6">
        <Button
          onClick={() => navigate(`/jobs/${job.id}`)}
          variant="outline"
          className="flex-1"
        >
          View Details
        </Button>

        {!isSaved ? (
          <Button
            onClick={handleSaveJob}
            className="flex-1 bg-primary text-white"
          >
            Save Job
          </Button>
        ) : (
          <Button
            onClick={handleRemoveJob}
            className="flex-1 bg-red-600 text-white hover:bg-red-700"
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};
