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
import { setAuthUser } from '../redux/authSlice.js';
import { toast } from 'sonner';
import { STORAGE_KEYS } from '@/utils/storageKeys';

const NAV_ITEMS = [
  { title: 'Companies', path: '/admin/companies', roles: ['recruiter'] },
  { title: 'Jobs', path: '/admin/jobs', roles: ['recruiter'] },

  { title: 'Home', path: '/', roles: ['student'] },
  { title: 'Jobs', path: '/jobs', roles: ['student'] },
  { title: 'Saved', path: '/jobs/saved', roles: ['student'] },
];

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
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
            <ul className="flex font-medium items-center gap-6">
              {NAV_ITEMS.filter(item => item.roles.includes(user?.role)).map(
                nav => (
                  <li key={nav.path}>
                    <Link
                      to={nav.path}
                      className="hover:text-primary transition-colors duration-200 focus-ring px-3 py-2 rounded-lg hover:bg-primary/5"
                    >
                      {nav.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
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
                      <h4 className="font-medium">{user?.name}</h4>
                    </div>
                  </div>
                  <div className="flex flex-col mt-5 text-gray-600">
                    {user && user?.role === 'student' && (
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
            {NAV_ITEMS.filter(item => item.roles.includes(user?.role)).map(
              nav => (
                <Link
                  key={nav.path}
                  to={nav.path}
                  className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav.title}
                </Link>
              )
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
                    <h4 className="font-medium text-gray-900">{user?.name}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                {user?.role === 'student' && (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
