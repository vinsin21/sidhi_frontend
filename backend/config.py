import os
from pathlib import Path
from typing import List
from pydantic_settings import BaseSettings , SettingsConfigDict
from pydantic import Field

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    """
    Settings for the Job Search Assistant backend.

    The `.env` file should be used to set environment variables for sensitive or configurable values.
    Expected variables:
        - SERPAPI_KEY: API key for SerpAPI.
        - DATABASE_URL: (optional) Override for the database connection string.
        - Any other configuration values you wish to override.

    Example `.env` file:
        SERPAPI_KEY=your-serpapi-key
        DATABASE_URL=mysql+pymysql://username:password@localhost:3306/jobhub
    """

    # Database
    database_url: str = Field(..., env="sqlite:///./test.db")
    
    # API Keys (you would set these as environment variables)
    serp_api_key: str = Field(..., env="SERPAPI_KEY")
    
    # CORS
    cors_origins: List[str] = ["http://localhost:5173"]
    
    # Rate Limiting
    rate_limit_per_minute: int = 60
    
    # Scraping
    scraping_delay: float = 1.0  # seconds between requests
    max_results_per_platform: int = 50
    
    # Caching
    cache_expiry_minutes: int = 30
    
    model_config = SettingsConfigDict(
        env_file=str(BASE_DIR / ".env"),
        env_file_encoding="utf-8"
        )

settings = Settings()