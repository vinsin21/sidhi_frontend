from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Index
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String(255), unique=True, index=True)  # ID from source platform
    title = Column(String(255), nullable=False, index=True)
    company = Column(String(255), nullable=False, index=True)
    location = Column(String(255), index=True)
    platform = Column(String(50), nullable=False, index=True)
    job_type = Column(String(50))  # full-time, part-time, contract
    experience_level = Column(String(50))  # entry, mid, senior
    salary_min = Column(Integer)
    salary_max = Column(Integer)
    salary_currency = Column(String(10), default="USD")
    description = Column(Text)
    application_url = Column(String(500))
    company_url = Column(String(500))
    is_remote = Column(Boolean, default=False)
    posted_date = Column(DateTime)
    scraped_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    requirements = relationship("JobRequirement", back_populates="job", cascade="all, delete-orphan")
    tags = relationship("JobTag", back_populates="job", cascade="all, delete-orphan")
    
    # Indexes for better query performance
    __table_args__ = (
        Index('idx_job_search', 'title', 'location', 'platform'),
        Index('idx_job_posted', 'posted_date', 'is_active'),
    )

class JobRequirement(Base):
    __tablename__ = "job_requirements"
    
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id", ondelete="CASCADE"))
    requirement = Column(Text, nullable=False)
    
    job = relationship("Job", back_populates="requirements")

class JobTag(Base):
    __tablename__ = "job_tags"
    
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id", ondelete="CASCADE"))
    tag = Column(String(100), nullable=False, index=True)
    
    job = relationship("Job", back_populates="tags")
    
    __table_args__ = (
        Index('idx_job_tag', 'job_id', 'tag'),
    )

class SearchHistory(Base):
    __tablename__ = "search_history"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    location = Column(String(255), index=True)
    filters = Column(Text)  # JSON string of applied filters
    results_count = Column(Integer)
    user_ip = Column(String(45))  # Support IPv6
    user_agent = Column(String(500))
    searched_at = Column(DateTime, default=datetime.utcnow, index=True)

class Platform(Base):
    __tablename__ = "platforms"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    base_url = Column(String(255))
    api_endpoint = Column(String(255))
    is_active = Column(Boolean, default=True)
    last_scraped = Column(DateTime)
    scrape_count = Column(Integer, default=0)
    error_count = Column(Integer, default=0)
    
class JobCache(Base):
    __tablename__ = "job_cache"
    
    id = Column(Integer, primary_key=True, index=True)
    cache_key = Column(String(255), unique=True, index=True)
    search_params = Column(Text)  # JSON string
    results = Column(Text)  # JSON string of results
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, index=True)
    hit_count = Column(Integer, default=0)