# from typing import List, Dict, Optional
# import logging

# from backend.config import Settings, settings
# from .base import BaseScraper

# logger = logging.getLogger(__name__)

# class IndeedScraper(BaseScraper):
#     """Indeed job scraper"""
    
#     def __init__(self):
#         super().__init__("Indeed")
#         self.base_url = "https://serpapi.com/search.json"
    
#     async def search_jobs(self, title: str, location: str = "") -> List[Dict]:
#         """Search jobs on Indeed"""
#         jobs = []
        
#         try:
#             params = {
#                 'engine': 'indeed',
#                 'q': title,
#                 'l': location,
#                 'format': 'json',
#                 'limit': min(self.max_results, 25),  # Indeed API limit
#                 'v': '2',
#                 'api_key': settings().indeed_api_key
#             }
            
#             response = await self.session.get(self.base_url, params=params)
#             response.raise_for_status()
            
#             data = response.json()
            
#             if 'results' in data:
#                 for job_data in data['results']:
#                     parsed_job = self.parse_job_data(job_data)
#                     if parsed_job:
#                         normalized_job = self.normalize_job_data(parsed_job)
#                         jobs.append(normalized_job)
                
#                 await self.rate_limit()
            
#         except Exception as e:
#             logger.error(f"Indeed scraper error: {e}")
#             # Return mock data for demonstration
#             jobs = self._get_mock_data(title, location)
        
#         return jobs
    
#     def parse_job_data(self, raw_data: Dict) -> Optional[Dict]:
#         """Parse Indeed job data"""
#         try:
#             return {
#                 'title': raw_data.get('jobtitle', ''),
#                 'company': raw_data.get('company', ''),
#                 'location': raw_data.get('formattedLocation', ''),
#                 'job_type': 'full-time',  # Indeed doesn't always provide this
#                 'experience_level': 'mid',  # Default
#                 'salary': raw_data.get('salary', ''),
#                 'description': raw_data.get('snippet', ''),
#                 'requirements': [],  # Would need additional API call to get full details
#                 'application_url': raw_data.get('url', ''),
#                 'posted_date': raw_data.get('date', ''),
#                 'tags': []
#             }
#         except Exception as e:
#             logger.error(f"Error parsing Indeed job data: {e}")
#             return None
    
#     def _get_mock_data(self, title: str, location: str) -> List[Dict]:
#         """Return mock data for demonstration"""
#         return [
#             self.normalize_job_data({
#                 'title': f"{title} - Indeed Sample",
#                 'company': "Indeed Sample Company",
#                 'location': location or "Remote",
#                 'job_type': "full-time",
#                 'experience_level': "mid",
#                 'description': f"Great {title} opportunity with competitive benefits...",
#                 'requirements': ["Experience with relevant technologies", "Strong problem-solving skills"],
#                 'application_url': "https://indeed.com/apply/sample",
#                 'posted_date': "2024-01-15",
#                 'tags': [title.split()[0] if title else "Technology", "Benefits"]
#             })
#         ]
# backend/scrapers/indeed_scraper.py
from typing import List, Dict, Optional
from datetime import datetime
from serpapi.google_search import GoogleSearch   # pip install google-search-results
from backend.scrapers.base import BaseScraper
from backend.config import settings


class IndeedScraper(BaseScraper):
    """Indeed job scraper using SerpApi"""

    def __init__(self):
        super().__init__("Indeed")  # 👈 tells BaseScraper the platform name
        self.api_key = settings.serp_api_key

    async def search_jobs(self, title: str, location: str = "", platform: str = "") -> List[Dict]:
        """Fetch jobs from SerpApi (Google Jobs, filtered for Indeed only)"""
        params = {
            "engine": "google_jobs",
            "q": f"{title} jobs in {location}" if location else title,
            "hl": "en",
            "api_key": self.api_key,
        }

        search = GoogleSearch(params)
        results = search.get_dict()

        jobs = []
        for job in results.get("jobs_results", []):
            # ✅ Only keep jobs with Indeed application link
            apply_link = str(job.get("apply_options", [{}])[0].get("link", "")).lower()
            if "indeed.com" not in apply_link:
                continue  

            parsed = self.parse_job_data(job)
            if parsed:
                jobs.append(parsed)

        return jobs

    def parse_job_data(self, raw_data: Dict) -> Optional[Dict]:
        """Parse SerpApi job result into normalized job format"""
        job_data = {
            "title": raw_data.get("title"),
            "company": raw_data.get("company_name"),
            "location": raw_data.get("location"),
            "job_type": raw_data.get("detected_extensions", {}).get("job_type", ""),
            "experience_level": raw_data.get("detected_extensions", {}).get("experience_level", ""),
            "salary": raw_data.get("detected_extensions", {}).get("salary", ""),
            "description": raw_data.get("description"),
            "requirements": ["Check job description"],  # placeholder
            "application_url": raw_data.get("apply_options", [{}])[0].get("link", ""),
            "posted_date": raw_data.get("detected_extensions", {}).get("posted_at", datetime.utcnow().isoformat()),
            "tags": ["Indeed"],
        }

        return self.normalize_job_data(job_data)  # 👈 use BaseScraper utilities
