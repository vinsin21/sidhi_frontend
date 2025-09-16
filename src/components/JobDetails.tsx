// src/components/JobDetails.tsx

import React from 'react';
import { Job } from '../types';
import {
  X, MapPin, Building2, ExternalLink, Bookmark, Globe, Clock, Users
} from 'lucide-react';

interface JobDetailsProps {
  job: Job;
  onClose: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose }) => {
  const formatPostedDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return 'Over a week ago';
  };

  const isRemote = job.location.toLowerCase().includes('remote');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 truncate pr-4">Job Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium text-lg">{job.companyName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Apply Now
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                  <Bookmark className="w-5 h-5" /> Save Job
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>
                  <div
                    className="prose prose-sm max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
                  />
                </section>

                {job.skills && job.skills.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Job Details</h4>
                  <div className="space-y-3 text-sm">
                    {job.jobType && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Job Type</span>
                        <span className="text-gray-900 font-medium capitalize">{job.jobType}</span>
                      </div>
                    )}
                    {job.experienceLevel && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience</span>
                        <span className="text-gray-900 font-medium capitalize">{job.experienceLevel}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="text-gray-900 font-medium">{job.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Remote Work</span>
                      <span className="text-gray-900 font-medium">{isRemote ? 'Yes' : 'No'}</span>
                    </div>
                    {job.salary && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary</span>
                        <span className="text-gray-900 font-medium">{job.salary}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-3">Found on {job.sourcePlatform}</h4>
                  <p className="text-sm text-blue-800 mb-4">
                    This job was found on {job.sourcePlatform}. Click "Apply Now" to go to the original posting.
                  </p>
                  <div className="text-xs text-blue-600">
                    Posted {formatPostedDate(job.postedOn)}
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