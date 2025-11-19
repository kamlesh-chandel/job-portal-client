import axiosInstance from '@/config/axiosConfig';

export const saveBookmark = jobId => axiosInstance.post('/bookmarks', { jobId });

export const deleteBookmark = bookmarkId => {
  return axiosInstance.delete(`/bookmarks/${bookmarkId}`);
};
export const getBookmarkJobs = () => axiosInstance.get('/bookmarks');
