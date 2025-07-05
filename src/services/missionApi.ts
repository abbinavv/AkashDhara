import { Mission } from '../types';

// Mock mission data - in a real app, this would come from an API
const mockMissions: Mission[] = [
  {
    id: 'apollo-11',
    name: 'Apollo 11',
    description: 'First crewed mission to land on the Moon, marking humanity\'s greatest achievement in space exploration.',
    launchDate: '1969-07-16',
    endDate: '1969-07-24',
    status: 'Success',
    country: 'United States',
    agency: 'NASA',
    missionType: 'Lunar',
    objectives: [
      'Land humans on the Moon',
      'Conduct lunar surface operations',
      'Return safely to Earth',
      'Demonstrate lunar landing capability'
    ],
    achievements: [
      'First humans to walk on the Moon',
      'Collected 21.5 kg of lunar samples',
      'Conducted scientific experiments',
      'Planted American flag on lunar surface'
    ],
    cost: '$25.8 billion (2020 dollars)',
    duration: '8 days, 3 hours, 18 minutes',
    crew: ['Neil Armstrong', 'Buzz Aldrin', 'Michael Collins'],
    images: [
      'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg',
      'https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg'
    ],
    keyFacts: [
      { label: 'Launch Vehicle', value: 'Saturn V' },
      { label: 'Landing Site', value: 'Sea of Tranquility' },
      { label: 'EVA Duration', value: '2 hours, 31 minutes' },
      { label: 'Distance Traveled', value: '953,054 miles' }
    ],
    timeline: [
      { date: '1969-07-16', event: 'Launch', description: 'Apollo 11 launches from Kennedy Space Center' },
      { date: '1969-07-19', event: 'Lunar Orbit', description: 'Spacecraft enters lunar orbit' },
      { date: '1969-07-20', event: 'Moon Landing', description: 'Eagle lands in Sea of Tranquility' },
      { date: '1969-07-21', event: 'Moonwalk', description: 'Armstrong and Aldrin walk on lunar surface' },
      { date: '1969-07-24', event: 'Splashdown', description: 'Safe return to Earth in Pacific Ocean' }
    ],
    significance: 'Apollo 11 fulfilled President Kennedy\'s goal of landing humans on the Moon before the end of the 1960s, demonstrating American technological superiority and inspiring generations of space explorers.',
    technicalSpecs: {
      'Command Module Mass': '11,700 kg',
      'Lunar Module Mass': '15,200 kg',
      'Total Mission Mass': '45,000 kg',
      'Max Velocity': '11 km/s'
    }
  },
  {
    id: 'chandrayaan-1',
    name: 'Chandrayaan-1',
    description: 'India\'s first lunar probe mission, marking ISRO\'s entry into deep space exploration.',
    launchDate: '2008-10-22',
    endDate: '2009-08-28',
    status: 'Success',
    country: 'India',
    agency: 'ISRO',
    missionType: 'Lunar',
    objectives: [
      'Map lunar surface composition',
      'Search for water ice',
      'Study lunar topography',
      'Analyze lunar atmosphere'
    ],
    achievements: [
      'Discovered water molecules on Moon',
      'Created detailed 3D atlas of Moon',
      'Successfully demonstrated Indian deep space capabilities',
      'Completed 3,400 orbits around Moon'
    ],
    cost: '$83 million',
    duration: '312 days',
    images: [
      'https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg',
      'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg'
    ],
    keyFacts: [
      { label: 'Launch Vehicle', value: 'PSLV-C11' },
      { label: 'Orbit Height', value: '100 km' },
      { label: 'Instruments', value: '11 scientific instruments' },
      { label: 'Data Collected', value: '70,000 images' }
    ],
    timeline: [
      { date: '2008-10-22', event: 'Launch', description: 'Launched from Satish Dhawan Space Centre' },
      { date: '2008-11-08', event: 'Lunar Orbit', description: 'Successfully entered lunar orbit' },
      { date: '2008-11-14', event: 'Impact Probe', description: 'Moon Impact Probe successfully impacts lunar surface' },
      { date: '2009-09-01', event: 'Water Discovery', description: 'Confirmed presence of water molecules on Moon' },
      { date: '2009-08-28', event: 'Mission End', description: 'Contact lost, mission declared complete' }
    ],
    significance: 'Chandrayaan-1 established India as the fourth nation to reach the Moon and made the groundbreaking discovery of water on the lunar surface, revolutionizing our understanding of the Moon.',
    technicalSpecs: {
      'Launch Mass': '1,380 kg',
      'Dry Mass': '523 kg',
      'Power': '750 W',
      'Communication': 'S-band and X-band'
    }
  },
  {
    id: 'mars-perseverance',
    name: 'Mars Perseverance',
    description: 'NASA\'s most advanced Mars rover, designed to search for signs of ancient microbial life.',
    launchDate: '2020-07-30',
    status: 'Ongoing',
    country: 'United States',
    agency: 'NASA',
    missionType: 'Mars',
    objectives: [
      'Search for signs of ancient life',
      'Collect and cache rock samples',
      'Generate oxygen from Martian atmosphere',
      'Study geology and climate'
    ],
    achievements: [
      'Successfully landed in Jezero Crater',
      'First helicopter flight on another planet (Ingenuity)',
      'Generated oxygen on Mars',
      'Collected multiple rock samples for future return'
    ],
    cost: '$2.7 billion',
    duration: 'Ongoing (planned 2+ years)',
    images: [
      'https://images.pexels.com/photos/73873/mars-mars-rover-space-travel-robot-73873.jpeg',
      'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg'
    ],
    keyFacts: [
      { label: 'Launch Vehicle', value: 'Atlas V 541' },
      { label: 'Landing Site', value: 'Jezero Crater' },
      { label: 'Rover Mass', value: '1,025 kg' },
      { label: 'Instruments', value: '7 scientific instruments' }
    ],
    timeline: [
      { date: '2020-07-30', event: 'Launch', description: 'Launched from Cape Canaveral' },
      { date: '2021-02-18', event: 'Mars Landing', description: 'Successfully landed in Jezero Crater' },
      { date: '2021-04-19', event: 'Ingenuity Flight', description: 'First powered flight on another planet' },
      { date: '2021-09-01', event: 'First Sample', description: 'Collected first rock sample' },
      { date: '2023-12-01', event: 'Ongoing Operations', description: 'Continues exploration and sample collection' }
    ],
    significance: 'Perseverance represents the most sophisticated attempt to find evidence of past life on Mars and is preparing samples for future return to Earth, potentially answering one of humanity\'s greatest questions.',
    technicalSpecs: {
      'Length': '3.0 m',
      'Width': '2.7 m',
      'Height': '3.2 m',
      'Max Speed': '4.2 cm/s'
    }
  },
  {
    id: 'mangalyaan',
    name: 'Mars Orbiter Mission (Mangalyaan)',
    description: 'India\'s first interplanetary mission, making ISRO the fourth space agency to reach Mars.',
    launchDate: '2013-11-05',
    endDate: '2022-04-01',
    status: 'Success',
    country: 'India',
    agency: 'ISRO',
    missionType: 'Mars',
    objectives: [
      'Demonstrate interplanetary mission capability',
      'Study Martian atmosphere and surface',
      'Search for methane in Martian atmosphere',
      'Map Martian surface features'
    ],
    achievements: [
      'First Asian nation to reach Mars orbit',
      'Most cost-effective Mars mission ever',
      'Successful on first attempt',
      'Operated for 8 years (planned for 6 months)'
    ],
    cost: '$74 million',
    duration: '8 years, 4 months',
    images: [
      'https://images.pexels.com/photos/73873/mars-mars-rover-space-travel-robot-73873.jpeg',
      'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg'
    ],
    keyFacts: [
      { label: 'Launch Vehicle', value: 'PSLV-C25' },
      { label: 'Orbit Type', value: 'Elliptical Mars orbit' },
      { label: 'Spacecraft Mass', value: '1,350 kg' },
      { label: 'Instruments', value: '5 scientific instruments' }
    ],
    timeline: [
      { date: '2013-11-05', event: 'Launch', description: 'Launched from Satish Dhawan Space Centre' },
      { date: '2013-12-01', event: 'Trans-Mars Injection', description: 'Left Earth orbit for Mars' },
      { date: '2014-09-24', event: 'Mars Orbit Insertion', description: 'Successfully entered Mars orbit' },
      { date: '2014-09-25', event: 'First Images', description: 'Sent first images of Mars' },
      { date: '2022-04-01', event: 'Mission End', description: 'Communication lost after 8 successful years' }
    ],
    significance: 'Mangalyaan demonstrated that cost-effective space missions are possible and established India as a major player in interplanetary exploration, inspiring developing nations worldwide.',
    technicalSpecs: {
      'Dry Mass': '482.5 kg',
      'Fuel Mass': '852 kg',
      'Solar Panel Area': '1.8 m²',
      'Communication': 'X-band and S-band'
    }
  },
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    description: 'NASA\'s longest-running space mission, now exploring interstellar space.',
    launchDate: '1977-09-05',
    status: 'Ongoing',
    country: 'United States',
    agency: 'NASA',
    missionType: 'Deep Space',
    objectives: [
      'Study Jupiter and Saturn systems',
      'Explore outer solar system',
      'Enter interstellar space',
      'Study cosmic rays and magnetic fields'
    ],
    achievements: [
      'First spacecraft to enter interstellar space',
      'Discovered active volcanoes on Io',
      'Detailed study of Saturn\'s rings',
      'Longest-operating spacecraft in history'
    ],
    cost: '$865 million (both Voyagers)',
    duration: '46+ years (ongoing)',
    images: [
      'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg',
      'https://images.pexels.com/photos/73873/mars-mars-rover-space-travel-robot-73873.jpeg'
    ],
    keyFacts: [
      { label: 'Launch Vehicle', value: 'Titan IIIE' },
      { label: 'Current Distance', value: '24+ billion km from Earth' },
      { label: 'Power Source', value: 'Radioisotope thermoelectric generators' },
      { label: 'Data Rate', value: '160 bits per second' }
    ],
    timeline: [
      { date: '1977-09-05', event: 'Launch', description: 'Launched from Cape Canaveral' },
      { date: '1979-03-05', event: 'Jupiter Flyby', description: 'Closest approach to Jupiter' },
      { date: '1980-11-12', event: 'Saturn Flyby', description: 'Closest approach to Saturn' },
      { date: '2012-08-25', event: 'Interstellar Space', description: 'First human-made object to enter interstellar space' },
      { date: '2023-12-01', event: 'Ongoing Mission', description: 'Continues to transmit data from interstellar space' }
    ],
    significance: 'Voyager 1 has revolutionized our understanding of the outer solar system and is humanity\'s first ambassador to interstellar space, carrying the Golden Record as a message to potential extraterrestrial civilizations.',
    technicalSpecs: {
      'Mass': '825.5 kg',
      'Power': '420 W (at launch)',
      'Antenna Diameter': '3.7 m',
      'Instruments': '11 scientific instruments'
    }
  },
  {
    id: 'chandrayaan-3',
    name: 'Chandrayaan-3',
    description: 'India\'s successful lunar landing mission, making India the fourth country to soft-land on the Moon.',
    launchDate: '2023-07-14',
    endDate: '2023-09-30',
    status: 'Success',
    country: 'India',
    agency: 'ISRO',
    missionType: 'Lunar',
    objectives: [
      'Demonstrate soft landing capability',
      'Deploy lunar rover',
      'Conduct in-situ scientific experiments',
      'Study lunar south pole region'
    ],
    achievements: [
      'First successful landing near lunar south pole',
      'Made India 4th country to soft-land on Moon',
      'Successful rover deployment and operations',
      'Confirmed presence of sulfur on lunar surface'
    ],
    cost: '$75 million',
    duration: '77 days',
    images: [
      'https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg',
      'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg'
    ],
    keyFacts: [
      { label: 'Launch Vehicle', value: 'LVM3-M4' },
      { label: 'Landing Site', value: 'Lunar South Pole' },
      { label: 'Lander Mass', value: '1,749 kg' },
      { label: 'Rover Mass', value: '26 kg' }
    ],
    timeline: [
      { date: '2023-07-14', event: 'Launch', description: 'Launched from Satish Dhawan Space Centre' },
      { date: '2023-08-05', event: 'Lunar Orbit', description: 'Successfully entered lunar orbit' },
      { date: '2023-08-23', event: 'Soft Landing', description: 'Historic soft landing near lunar south pole' },
      { date: '2023-08-24', event: 'Rover Deployment', description: 'Pragyan rover successfully deployed' },
      { date: '2023-09-30', event: 'Mission End', description: 'Mission concluded after successful operations' }
    ],
    significance: 'Chandrayaan-3 marked a historic achievement for India and ISRO, demonstrating advanced landing technology and making significant scientific discoveries in the unexplored lunar south pole region.',
    technicalSpecs: {
      'Lander Dimensions': '2m × 2m × 1.2m',
      'Rover Dimensions': '0.9m × 0.75m × 0.85m',
      'Mission Duration': '1 lunar day (14 Earth days)',
      'Instruments': '6 scientific payloads'
    }
  }
];

export const fetchMissions = async (): Promise<Mission[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockMissions;
};

export const fetchMissionById = async (id: string): Promise<Mission | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockMissions.find(mission => mission.id === id) || null;
};

export const getCountries = (): string[] => {
  return [...new Set(mockMissions.map(mission => mission.country))];
};

export const getMissionTypes = (): string[] => {
  return [...new Set(mockMissions.map(mission => mission.missionType))];
};

export const getStatuses = (): string[] => {
  return [...new Set(mockMissions.map(mission => mission.status))];
};