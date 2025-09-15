"""
FastAPI backend for Job Aggregator Platform
Note: This requires FastAPI, SQLAlchemy, and other dependencies to be installed.
In a production environment, you would install these via pip.
"""

from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine, Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import asyncio
import httpx
from urllib.parse import quote_plus
from backend.scrapers.indeed_scarpper import IndeedScraper
import multiprocessing
multiprocessing.set_start_method('spawn', force=True)



# Database Configuration
DATABASE_URL = "mysql+pymysql://username:password@localhost:3306/jobhub"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class JobModel(Base):
    __tablename__ = "jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    company = Column(String(255), nullable=False)
    location = Column(String(255))
    platform = Column(String(50), nullable=False)
    job_type = Column(String(50))  # full-time, part-time, contract
    experience_level = Column(String(50))  # entry, mid, senior
    salary = Column(String(100))
    description = Column(Text)
    application_url = Column(String(500))
    is_remote = Column(Boolean, default=False)
    posted_date = Column(DateTime)
    scraped_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship with requirements and tags
    requirements = relationship("JobRequirement", back_populates="job")
    tags = relationship("JobTag", back_populates="job")

class JobRequirement(Base):
    __tablename__ = "job_requirements"
    
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    requirement = Column(Text, nullable=False)
    
    job = relationship("JobModel", back_populates="requirements")

class JobTag(Base):
    __tablename__ = "job_tags"
    
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    tag = Column(String(100), nullable=False)
    
    job = relationship("JobModel", back_populates="tags")

class SearchHistory(Base):
    __tablename__ = "search_history"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    location = Column(String(255))
    results_count = Column(Integer)
    searched_at = Column(DateTime, default=datetime.utcnow)

# Pydantic Models
class JobResponse(BaseModel):
    id: str
    title: str
    company: str
    location: str
    platform: str
    type: str
    experienceLevel: str
    salary: Optional[str] = None
    description: str
    requirements: List[str]
    postedDate: str
    applicationUrl: str
    isRemote: bool
    tags: List[str]

class SearchRequest(BaseModel):
    title: str
    location: Optional[str] = None
    platform: Optional[str] = "all"

class SearchFilters(BaseModel):
    platform: Optional[str] = "all"
    jobType: Optional[str] = "all"
    experienceLevel: Optional[str] = "all"
    salaryRange: Optional[str] = "all"
    postedDate: Optional[str] = "all"

# FastAPI App
app = FastAPI(
    title="JobHub API",
    description="Job Aggregator Platform API",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Job Scraping Services
class JobScraper:
    """Base class for job scrapers"""
    
    def __init__(self):
        self.session = httpx.AsyncClient()
    
    async def search_jobs(self, title: str, location: str = "") -> List[dict]:
        """Override this method in subclasses"""
        raise NotImplementedError


class JobAggregator:
    def __init__(self):
        self.scrapers = [
            IndeedScraper(),
            # LinkedInScraper(),
            # NaukriScraper()
        ]
    
    async def aggregate_jobs(self, title: str, location: str = "") -> List[dict]:
        """Aggregate jobs from multiple platforms"""
        all_jobs = []
        
        # Run all scrapers concurrently
        tasks = []
        for scraper in self.scrapers:
            task = scraper.search_jobs(title, location)
            tasks.append(task)
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Combine results
        for result in results:
            if isinstance(result, list):
                all_jobs.extend(result)
            elif isinstance(result, Exception):
                print(f"Scraper error: {result}")
        
        return all_jobs

# API Endpoints
@app.get("/")
async def root():
    return {"message": "JobHub API - Job Aggregator Platform"}

@app.post("/search", response_model=List[JobResponse])
async def search_jobs(
    search_request: SearchRequest,
    db: Session = Depends(get_db)
):
    """Search jobs across multiple platforms"""
    
    try:
        # Initialize aggregator
        aggregator = JobAggregator()
        
        # Aggregate jobs from multiple platforms
        jobs_data = await aggregator.aggregate_jobs(
            search_request.title,
            search_request.location or ""
        )
        
        # Convert to response format
        jobs = []
        for i, job_data in enumerate(jobs_data):
            job = JobResponse(
                id=str(i + 1),
                title=job_data["title"],
                company=job_data["company"],
                location=job_data["location"],
                platform=job_data["platform"],
                type=job_data["type"],
                experienceLevel=job_data["experienceLevel"],
                salary=job_data.get("salary"),
                description=job_data["description"],
                requirements=job_data["requirements"],
                postedDate=job_data["postedDate"],
                applicationUrl=job_data["applicationUrl"],
                isRemote=job_data["isRemote"],
                tags=job_data["tags"]
            )
            jobs.append(job)
        
        # Save search history
        try:
            search_history = SearchHistory(
                title=search_request.title,
                location=search_request.location,
                results_count=len(jobs)
            )
            db.add(search_history)
            db.commit()
        except Exception as e:
            print(f"Error saving search history: {e}")
        
        return jobs
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@app.get("/job/{job_id}", response_model=JobResponse)
async def get_job_details(job_id: str):
    """Get detailed information about a specific job"""
    
    # In a real implementation, you would fetch from database
    # For now, return mock data
    job = JobResponse(
        id=job_id,
        title="Sample Job",
        company="Sample Company",
        location="Sample Location",
        platform="Sample Platform",
        type="full-time",
        experienceLevel="mid",
        description="Detailed job description...",
        requirements=["Requirement 1", "Requirement 2"],
        postedDate=datetime.utcnow().isoformat(),
        applicationUrl="https://example.com/apply",
        isRemote=True,
        tags=["tag1", "tag2"]
    )
    
    return job

@app.get("/platforms")
async def get_supported_platforms():
    """Get list of supported job platforms"""
    return {
        "platforms": [
            {"name": "Indeed", "status": "active"},
            {"name": "LinkedIn", "status": "active"},
            {"name": "Naukri.com", "status": "active"},
            {"name": "Glassdoor", "status": "coming_soon"}
        ]
    }

@app.get("/search/history")
async def get_search_history(db: Session = Depends(get_db)):
    """Get recent search history"""
    
    try:
        history = db.query(SearchHistory).order_by(
            SearchHistory.searched_at.desc()
        ).limit(10).all()
        
        return [
            {
                "id": item.id,
                "title": item.title,
                "location": item.location,
                "results_count": item.results_count,
                "searched_at": item.searched_at.isoformat()
            }
            for item in history
        ]
    except Exception as e:
        return {"searches": []}

# Health Check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Run the server
    uvicorn.run(app, host="0.0.0.0", port=8000)