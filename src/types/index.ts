export interface APODData {
  date: string;
  explanation: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  hdurl?: string;
  copyright?: string;
}

export interface LaunchData {
  id: string;
  name: string;
  status: {
    name: string;
    abbrev: string;
    description: string;
  };
  launch_service_provider: {
    name: string;
    type: string;
  };
  rocket: {
    configuration: {
      name: string;
      family: string;
    };
  };
  mission: {
    name: string;
    description: string;
    type: string;
  };
  net: string;
  window_start: string;
  window_end: string;
  image: string;
  infographic: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface HistoricalEvent {
  date: string;
  title: string;
  description: string;
  year: number;
  category: string;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  launchDate: string;
  endDate?: string;
  status: 'Success' | 'Partial Success' | 'Failure' | 'Ongoing' | 'Planned';
  country: string;
  agency: string;
  missionType: 'Lunar' | 'Mars' | 'Venus' | 'Jupiter' | 'Saturn' | 'Solar' | 'Earth Orbit' | 'Deep Space' | 'ISS' | 'Satellite';
  objectives: string[];
  achievements: string[];
  cost?: string;
  duration?: string;
  crew?: string[];
  images: string[];
  videos?: string[];
  keyFacts: { label: string; value: string }[];
  timeline: { date: string; event: string; description: string }[];
  significance: string;
  technicalSpecs?: { [key: string]: string };
}

export interface TimelineFilters {
  countries: string[];
  missionTypes: string[];
  statuses: string[];
  dateRange: {
    start: number;
    end: number;
  };
}