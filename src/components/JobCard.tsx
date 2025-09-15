import React from 'react';
import { Job } from '../types';
import { MapPin, Calendar, Building2, ExternalLink, Bookmark, Clock } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'indeed': return 'bg-blue-100 text-blue-800';
      case 'linkedin': return 'bg-blue-100 text-blue-800';
      case 'naukri.com': return 'bg-purple-100 text-purple-800';
      case 'glassdoor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExperienceColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'entry': return 'bg-green-100 text-green-800';
      case 'mid': return 'bg-orange-100 text-orange-800';
      case 'senior': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPostedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            {job.isRemote && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Remote
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatPostedDate(job.postedDate)}</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
            {job.description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(job.platform)}`}>
              {job.platform}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(job.experienceLevel)}`}>
              {job.experienceLevel}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              {job.type}
            </span>
            {job.salary && (
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                {job.salary}
              </span>
            )}
          </div>

          {job.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {job.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {job.tags.length > 3 && (
                <span className="text-gray-500 text-xs px-2 py-1">
                  +{job.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <button 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Handle bookmark
            }}
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Click to view details</span>
        </div>
        
        <div className="flex gap-2">
          <a
            href={job.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Apply Now
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;