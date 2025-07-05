import { APODData } from '../types';

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

export const fetchAPOD = async (date?: string): Promise<APODData> => {
  try {
    const url = new URL(NASA_APOD_URL);
    url.searchParams.append('api_key', NASA_API_KEY);
    if (date) {
      url.searchParams.append('date', date);
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 400) {
        throw new Error('Invalid date provided. Please select a date between June 16, 1995 and today.');
      } else if (response.status === 403) {
        throw new Error('NASA API key is invalid or has exceeded its limit. Please check your API key configuration.');
      } else if (response.status === 429) {
        throw new Error('Too many requests to NASA API. Please try again in a moment.');
      } else if (response.status === 500) {
        throw new Error('NASA API is experiencing technical difficulties. Please try again later.');
      } else {
        throw new Error(`Failed to fetch APOD: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    
    // Validate the response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format from NASA API');
    }
    
    if (!data.title || !data.url || !data.explanation) {
      throw new Error('Incomplete data received from NASA API');
    }

    return data;
  } catch (error) {
    console.error('NASA API Error:', error);
    
    // Re-throw the error with more context if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to NASA API. Please check your internet connection.');
    }
    
    // Re-throw the original error if it's already a handled error
    throw error;
  }
};

export const fetchAPODRange = async (startDate: string, endDate: string): Promise<APODData[]> => {
  try {
    const url = new URL(NASA_APOD_URL);
    url.searchParams.append('api_key', NASA_API_KEY);
    url.searchParams.append('start_date', startDate);
    url.searchParams.append('end_date', endDate);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Invalid date range provided. Please check your start and end dates.');
      } else if (response.status === 403) {
        throw new Error('NASA API key is invalid or has exceeded its limit.');
      } else if (response.status === 429) {
        throw new Error('Too many requests to NASA API. Please try again in a moment.');
      } else {
        throw new Error(`Failed to fetch APOD range: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format from NASA API - expected array');
    }

    return data;
  } catch (error) {
    console.error('NASA API Range Error:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to NASA API. Please check your internet connection.');
    }
    
    throw error;
  }
};