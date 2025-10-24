import React from 'react';
import { Briefcase, Github, Linkedin, LogOut, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// The import path has been corrected to use the alias.
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleShowAllJobs = () => {
    navigate('/');
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-lg p-2">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">JobSphere</h1>
              <p className="text-xs text-gray-500">Your Job Aggregator</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={handleShowAllJobs}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Search Jobs
            </button>
            {/* {isAuthenticated && (
              <>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Saved Jobs
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Profile
                </a>
              </>
            )} */}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/vinsin21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/vineet21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            {isLoading ? (
              <div className="w-24 h-9 animate-pulse bg-gray-200 rounded-lg"></div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                <UserCircle className="w-6 h-6 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 hidden lg:block">{user?.email}</span>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

