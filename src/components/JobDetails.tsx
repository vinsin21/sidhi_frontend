import React from 'react';
import { Job } from '../types';
import { 
  X, 
  MapPin, 
  Calendar, 
  Building2, 
  ExternalLink, 
  Bookmark, 
  DollarSign,
  Clock,
  Users,
  Globe
} from 'lucide-react';

interface JobDetailsProps {
  job: Job;
  onClose: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose }) => {
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

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'indeed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'linkedin': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'naukri.com': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'glassdoor': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Job Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h1>
                  
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      <span className="font-medium text-lg">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{job.location}</span>
                    </div>
                    {job.isRemote && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Remote
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPlatformColor(job.platform)}`}>
                      {job.platform}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {job.type}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {job.experienceLevel}
                    </span>
                    {job.salary && (
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {job.salary}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 ml-6">
                  <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Bookmark className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Posted {formatPostedDate(job.postedDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{job.experienceLevel} level</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>View on {job.platform}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Apply Now
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Save Job
                </button>
              </div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Job Description */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Job Description
                  </h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                </section>

                {/* Requirements */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Skills/Tags */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Skills & Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Company Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    About {job.company}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Learn more about this company and their other job openings.
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Company Profile
                  </button>
                </div>

                {/* Job Details */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Job Details
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Job Type</span>
                      <span className="text-gray-900 capitalize">{job.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience</span>
                      <span className="text-gray-900 capitalize">{job.experienceLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="text-gray-900">{job.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Remote Work</span>
                      <span className="text-gray-900">{job.isRemote ? 'Yes' : 'No'}</span>
                    </div>
                    {job.salary && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary</span>
                        <span className="text-gray-900">{job.salary}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Platform Info */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-3">
                    Found on {job.platform}
                  </h4>
                  <p className="text-sm text-blue-800 mb-4">
                    This job was found through our search of {job.platform}. Click "Apply Now" to be redirected to the original posting.
                  </p>
                  <div className="text-xs text-blue-600">
                    Posted {formatPostedDate(job.postedDate)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;