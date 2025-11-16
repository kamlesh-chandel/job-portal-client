import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { User2, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '@/config/axiosConfig';
import { setAuthUser } from '../redux/authSlice.js';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
    toast.success('Logout successfully');
    dispatch(setAuthUser(null));
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <h1 className="text-xl font-bold gradient-text">
              Job<span className="text-foreground">Portal</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            {user === null ? (
              <></>
            ) : (
              <>
                {user && user.role == 'recruiter' ? (
                  <>
                    <li>
                      <Link
                        to="/admin/companies"
                        className="hover:text-primary transition-colors duration-200 focus-ring px-3 py-2 rounded-lg hover:bg-primary/5"
                      >
                        Companies
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/jobs"
                        className="hover:text-primary transition-colors duration-200 focus-ring px-3 py-2 rounded-lg hover:bg-primary/5"
                      >
                        Jobs
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/"
                        className="hover:text-primary transition-colors duration-200 focus-ring px-3 py-2 rounded-lg hover:bg-primary/5"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/jobs"
                        className="hover:text-primary transition-colors duration-200 focus-ring px-3 py-2 rounded-lg hover:bg-primary/5"
                      >
                        Jobs
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/jobs/saved"
                        className="hover:text-primary transition-colors duration-200 focus-ring px-3 py-2 rounded-lg hover:bg-primary/5"
                      >
                        Saved
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="btn-animate focus-ring">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-animate focus-ring">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="w-8 h-8 rounded-lg">
                  <AvatarFallback className="w-full h-full bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {user?.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex  gap-4 space-y-2">
                    <Avatar className="w-8 h-8 rounded-lg">
                      <AvatarFallback className="w-full h-full bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {user?.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                    </div>
                  </div>
                  <div className="flex flex-col mt-5 text-gray-600">
                    {user && user.role === 'student' && (
                      <div className="flex mb-3 w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <button varient="link">
                          <Link to="/profile">View Profile</Link>
                        </button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <button onClick={logoutHandler} varient="link">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {user && user.role == 'recruiter' ? (
              <>
                <Link
                  to="/admin/companies"
                  className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Companies
                </Link>
                <Link
                  to="/admin/jobs"
                  className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Jobs
                </Link>
                <Link
                  to="/jobs/saved"
                  className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Saved
                </Link>
              </>
            )}

            {!user ? (
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Signup</Button>
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-8 h-8 rounded-lg">
                    <AvatarFallback className="w-full h-full bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {user?.name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {user.fullname}
                    </h4>
                    <p className="text-sm text-gray-500">{user.profile.bio}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {user && user.role === 'student' && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User2 className="w-4 h-4" />
                      View Profile
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logoutHandler();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
