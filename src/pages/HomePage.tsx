// src/pages/HomePage.tsx

import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import FilterPanel from '../components/FilterPanel';
import Header from '../components/Header';
import JobDetails from '../components/JobDetails';
import { Job, SearchFilters } from '../types';
import { getAllJobs, getJobById } from '../services/jobService';
import { Search, Filter, Loader2, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function HomePage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [searchQuery, setSearchQuery] = useState({ title: '', location: '' });
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState<SearchFilters>({
        platform: 'all',
        jobType: 'all',
        experienceLevel: 'all',
    });
    const [showFilters, setShowFilters] = useState(false);

    const { token } = useAuth();

    useEffect(() => {
        // We only want to fetch jobs if a search has been initiated.
        // The `handleShowAllJobs` function will now set searchPerformed to true.
        if (searchPerformed) {
            fetchJobs(currentPage);
        }
    }, [filters, searchQuery, currentPage, searchPerformed]);

    const fetchJobs = async (pageToFetch: number) => {
        setLoading(true);
        try {
            const response = await getAllJobs({
                search: searchQuery.title,
                location: searchQuery.location,
                page: pageToFetch,
                token: token,
                ...filters,
            });
            if (pageToFetch === 1) {
                setJobs(response.jobs);
            } else {
                setJobs(prevJobs => [...prevJobs, ...response.jobs]);
            }
            setTotalJobs(response.totalJobs);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (title: string, location: string) => {
        setJobs([]);
        setCurrentPage(1);
        setSearchQuery({ title, location });
        if (!searchPerformed) setSearchPerformed(true);
    };

    // This function is no longer passed to the Header, but can be used elsewhere if needed.
    const handleShowAllJobs = () => {
        setJobs([]);
        setCurrentPage(1);
        setSearchQuery({ title: '', location: '' });
        if (!searchPerformed) setSearchPerformed(true);
    };

    const handlePlatformSearch = (platform: string) => {
        setJobs([]);
        setCurrentPage(1);
        setFilters({ ...filters, platform: platform });
        setSearchQuery({ title: '', location: '' });
        setSearchPerformed(true);
    };

    const handleFilterChange = (newFilters: SearchFilters) => {
        setJobs([]);
        setCurrentPage(1);
        setFilters(newFilters);
    };

    const handleLoadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleJobSelect = async (jobId: string) => {
        const job = await getJobById(jobId, token);
        setSelectedJob(job);
    };

    const handleCloseJobDetails = () => {
        setSelectedJob(null);
    };

    const platforms = [
        { name: 'Indeed', enabled: true },
        { name: 'LinkedIn', enabled: true },
        { name: 'Naukri', enabled: false }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* --- THE FIX IS HERE: Removed the unnecessary prop --- */}
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Search across multiple job platforms in one place.
                        </p>
                    </div>
                    <SearchBar onSearch={handleSearch} loading={loading && currentPage === 1} />
                </div>

                {searchPerformed ? (
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-64 flex-shrink-0">
                            <div className="lg:hidden mb-4">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <Filter className="w-4 h-4" /> Filters
                                </button>
                            </div>
                            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                                <FilterPanel filters={filters} onFilterChange={handleFilterChange} jobCount={totalJobs} />
                            </div>
                        </div>
                        <div className="flex-1">
                            {loading && currentPage === 1 ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                </div>
                            ) : jobs.length > 0 ? (
                                <>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{totalJobs} Jobs Found</h2>
                                    <div className="space-y-4">
                                        {jobs.map((job) => (
                                            <JobCard key={job._id} job={job} onClick={() => handleJobSelect(job._id)} />
                                        ))}
                                    </div>
                                    <div className="mt-10 text-center">
                                        {currentPage < totalPages && (
                                            <button
                                                onClick={handleLoadMore}
                                                disabled={loading}
                                                className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2 mx-auto"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Loading...
                                                    </>
                                                ) : (
                                                    'Load More Jobs'
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold">No jobs found</h3>
                                    <p className="text-gray-600">Try adjusting your search criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-sm border border-gray-100">
                            <p className="text-gray-600 mb-8">
                                Start by searching above, or browse jobs from a specific platform:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {platforms.map(platform => (
                                    <button
                                        key={platform.name}
                                        onClick={() => platform.enabled && handlePlatformSearch(platform.name)}
                                        className={`
                      relative text-center p-4 rounded-lg border border-gray-200 transition-colors
                      ${platform.enabled
                                                ? 'bg-gray-50 hover:bg-gray-100'
                                                : 'bg-gray-100 opacity-60 cursor-not-allowed'
                                            }
                    `}
                                        disabled={!platform.enabled}
                                    >
                                        <div className="bg-blue-100 rounded-lg p-3 mb-2 inline-block">
                                            <Briefcase className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h4 className="font-semibold text-sm text-gray-800">{platform.name}</h4>
                                        {!platform.enabled && (
                                            <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                                SOON
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {selectedJob && (
                <JobDetails
                    job={selectedJob}
                    onClose={handleCloseJobDetails}
                />
            )}
        </div>
    );
}

export default HomePage;