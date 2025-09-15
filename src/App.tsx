import { useState } from 'react';
import SearchBar from './components/SearchBar';
import JobCard from './components/JobCard';
import FilterPanel from './components/FilterPanel';
import Header from './components/Header';
import JobDetails from './components/JobDetails';
import { Job, SearchFilters } from './types';
import { searchJobs, getJobById } from './services/jobService';
import { Search, Filter, Loader2 } from 'lucide-react';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    platform: 'all',
    jobType: 'all',
    experienceLevel: 'all',
    salaryRange: 'all',
    postedDate: 'all'
  });

  const handleSearch = async (title: string, location: string) => {
    setLoading(true);
    setSearchPerformed(true);
    try {
      const results = await searchJobs(title, location);
      setJobs(results);
      setFilteredJobs(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    
    let filtered = jobs;
    
    if (newFilters.platform !== 'all') {
      filtered = filtered.filter(job => job.platform.toLowerCase() === newFilters.platform);
    }
    
    if (newFilters.jobType !== 'all') {
      filtered = filtered.filter(job => job.type.toLowerCase() === newFilters.jobType);
    }
    
    if (newFilters.experienceLevel !== 'all') {
      filtered = filtered.filter(job => job.experienceLevel.toLowerCase() === newFilters.experienceLevel);
    }
    
    if (newFilters.postedDate !== 'all') {
      const days = parseInt(newFilters.postedDate);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(job => new Date(job.postedDate) >= cutoffDate);
    }
    
    setFilteredJobs(filtered);
  };

  const handleJobSelect = async (jobId: string) => {
    const job = await getJobById(jobId);
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Search across multiple job platforms in one place. Get aggregated results from Indeed, LinkedIn, Naukri.com, and more.
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results Section */}
        {searchPerformed && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Panel */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
              
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <FilterPanel 
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  jobCount={filteredJobs.length}
                />
              </div>
            </div>

            {/* Job Listings */}
            <div className="flex-1">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Searching across platforms...</span>
                  </div>
                </div>
              ) : filteredJobs.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {filteredJobs.length} Jobs Found
                    </h2>
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      <option>Sort by Relevance</option>
                      <option>Sort by Date</option>
                      <option>Sort by Salary</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredJobs.map((job) => (
                      <JobCard 
                        key={job.id} 
                        job={job} 
                        onClick={() => handleJobSelect(job.id)}
                      />
                    ))}
                  </div>
                </>
              ) : searchPerformed && !loading ? (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {!searchPerformed && !loading && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-lg p-3 mb-2 inline-block">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Indeed</h4>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-lg p-3 mb-2 inline-block">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-sm">LinkedIn</h4>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-lg p-3 mb-2 inline-block">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Naukri.com</h4>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-lg p-3 mb-2 inline-block">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-sm">More</h4>
                </div>
              </div>
              <p className="text-gray-600">
                Start by searching for a job title above. We'll search across all major job platforms and show you aggregated results.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetails 
          job={selectedJob}
          onClose={handleCloseJobDetails}
        />
      )}
    </div>
  );
}

export default App;