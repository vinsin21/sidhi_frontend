from abc import ABC, abstractmethod
from typing import List, Dict, Optional
import httpx
import asyncio
from datetime import datetime
import logging
from backend.config import settings

logger = logging.getLogger(__name__)

class BaseScraper(ABC):
    """Base class for all job scrapers"""
    
    def __init__(self, platform_name: str):
        self.platform_name = platform_name
        self.session = httpx.AsyncClient(
            timeout=30.0,
            headers={
                'User-Agent': 'JobHub-Aggregator/1.0 (Job Search Application)'
            }
        )
        self.delay = settings.scraping_delay
        self.max_results = settings.max_results_per_platform
    
    @abstractmethod
    async def search_jobs(self, title: str, location: str = "", platform: str = "") -> List[Dict]:
        """Search jobs on the platform"""
        pass
    
    @abstractmethod
    def parse_job_data(self, raw_data: Dict) -> Optional[Dict]:
        """Parse raw job data from platform API/scraping"""
        pass
    
    async def rate_limit(self):
        """Implement rate limiting"""
        await asyncio.sleep(self.delay)
    
    def normalize_job_data(self, job_data: Dict) -> Dict:
        """Normalize job data to standard format"""
        return {
            'title': job_data.get('title', '').strip(),
            'company': job_data.get('company', '').strip(),
            'location': job_data.get('location', '').strip(),
            'platform': self.platform_name,
            'job_type': self._normalize_job_type(job_data.get('job_type', '')),
            'experience_level': self._normalize_experience_level(job_data.get('experience_level', '')),
            'salary': job_data.get('salary', ''),
            'description': job_data.get('description', '').strip(),
            'requirements': job_data.get('requirements', []),
            'application_url': job_data.get('application_url', ''),
            'posted_date': self._parse_date(job_data.get('posted_date')),
            'is_remote': self._is_remote_job(job_data.get('location', ''), job_data.get('description', '')),
            'tags': job_data.get('tags', [])
        }
    
    def _normalize_job_type(self, job_type: str) -> str:
        """Normalize job type to standard values"""
        job_type_lower = job_type.lower()
        
        if any(term in job_type_lower for term in ['full-time', 'full time', 'permanent']):
            return 'full-time'
        elif any(term in job_type_lower for term in ['part-time', 'part time']):
            return 'part-time'
        elif any(term in job_type_lower for term in ['contract', 'contractor', 'freelance']):
            return 'contract'
        elif any(term in job_type_lower for term in ['intern', 'internship']):
            return 'internship'
        else:
            return 'full-time'  # default
    
    def _normalize_experience_level(self, experience: str) -> str:
        """Normalize experience level to standard values"""
        experience_lower = experience.lower()
        
        if any(term in experience_lower for term in ['senior', 'sr', 'lead', 'principal', 'staff']):
            return 'senior'
        elif any(term in experience_lower for term in ['junior', 'jr', 'entry', 'associate', 'graduate']):
            return 'entry'
        else:
            return 'mid'  # default
    
    def _parse_date(self, date_str: str) -> str:
        """Parse and normalize date string"""
        if not date_str:
            return datetime.utcnow().isoformat()
        
        try:
            # Try to parse various date formats
            # This would need to be expanded based on platform-specific formats
            if isinstance(date_str, datetime):
                return date_str.isoformat()
            
            # Add more date parsing logic here
            return datetime.utcnow().isoformat()
        except Exception as e:
            logger.error(f"Error parsing date {date_str}: {e}")
            return datetime.utcnow().isoformat()
    
    def _is_remote_job(self, location: str, description: str) -> bool:
        """Determine if job is remote based on location and description"""
        remote_keywords = ['remote', 'work from home', 'wfh', 'telecommute', 'virtual']
        
        combined_text = f"{location} {description}".lower()
        return any(keyword in combined_text for keyword in remote_keywords)
    
    async def close(self):
        """Close the HTTP session"""
        await self.session.aclose()