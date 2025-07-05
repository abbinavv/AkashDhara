import { LaunchData, HistoricalEvent } from '../types';

const LAUNCH_LIBRARY_URL = 'https://ll.thespacedevs.com/2.2.0';

// Comprehensive historical space events database organized by month-day
const historicalEventsDatabase: { [key: string]: HistoricalEvent[] } = {
  '01-01': [
    {
      date: '01-01',
      title: 'Luna 1 Launch',
      description: 'First human-made object to reach the vicinity of the Moon and enter heliocentric orbit',
      year: 1959,
      category: 'Moon Mission'
    }
  ],
  '01-02': [
    {
      date: '01-02',
      title: 'Luna 1 Moon Flyby',
      description: 'Soviet Luna 1 became the first spacecraft to fly by the Moon',
      year: 1959,
      category: 'Moon Mission'
    }
  ],
  '01-14': [
    {
      date: '01-14',
      title: 'Sergei Korolev Birth',
      description: 'Birth of Sergei Korolev, chief designer of the Soviet space program',
      year: 1907,
      category: 'Space Pioneer'
    }
  ],
  '01-27': [
    {
      date: '01-27',
      title: 'Apollo 1 Fire',
      description: 'Tragic fire during Apollo 1 ground test killed astronauts Gus Grissom, Ed White, and Roger Chaffee',
      year: 1967,
      category: 'Space Tragedy'
    }
  ],
  '01-28': [
    {
      date: '01-28',
      title: 'Challenger Disaster',
      description: 'Space Shuttle Challenger broke apart 73 seconds into flight, killing all seven crew members',
      year: 1986,
      category: 'Space Tragedy'
    }
  ],
  '01-31': [
    {
      date: '01-31',
      title: 'Explorer 1 Launch',
      description: 'First successful U.S. satellite launch, discovering the Van Allen radiation belts',
      year: 1958,
      category: 'Satellite'
    }
  ],
  '02-01': [
    {
      date: '02-01',
      title: 'Columbia Disaster',
      description: 'Space Shuttle Columbia disintegrated during re-entry, killing all seven crew members',
      year: 2003,
      category: 'Space Tragedy'
    }
  ],
  '02-03': [
    {
      date: '02-03',
      title: 'Luna 9 Soft Landing',
      description: 'First successful soft landing on the Moon by Soviet Luna 9',
      year: 1966,
      category: 'Moon Landing'
    }
  ],
  '02-11': [
    {
      date: '02-11',
      title: 'Osumi Launch',
      description: 'Japan became the fourth nation to launch a satellite with Osumi',
      year: 1970,
      category: 'Satellite'
    }
  ],
  '02-14': [
    {
      date: '02-14',
      title: 'NEAR Shoemaker Landing',
      description: 'First spacecraft to land on an asteroid (433 Eros)',
      year: 2001,
      category: 'Deep Space'
    }
  ],
  '02-18': [
    {
      date: '02-18',
      title: 'Mars Perseverance Landing',
      description: 'NASA\'s Perseverance rover successfully landed in Jezero Crater on Mars',
      year: 2021,
      category: 'Mars Mission'
    }
  ],
  '02-20': [
    {
      date: '02-20',
      title: 'John Glenn Orbital Flight',
      description: 'First American to orbit Earth aboard Friendship 7',
      year: 1962,
      category: 'Human Spaceflight'
    }
  ],
  '03-02': [
    {
      date: '03-02',
      title: 'Pioneer 10 Launch',
      description: 'First spacecraft to travel through the asteroid belt and fly by Jupiter',
      year: 1972,
      category: 'Deep Space'
    }
  ],
  '03-18': [
    {
      date: '03-18',
      title: 'First Spacewalk',
      description: 'Alexei Leonov performed the first spacewalk (EVA) from Voskhod 2',
      year: 1965,
      category: 'Human Spaceflight'
    }
  ],
  '03-22': [
    {
      date: '03-22',
      title: 'Chandrayaan-1 Water Discovery',
      description: 'NASA confirmed water molecules on the Moon discovered by India\'s Chandrayaan-1',
      year: 2009,
      category: 'ISRO Mission'
    }
  ],
  '04-12': [
    {
      date: '04-12',
      title: 'Yuri Gagarin First Human in Space',
      description: 'Yuri Gagarin became the first human to journey into outer space aboard Vostok 1',
      year: 1961,
      category: 'Human Spaceflight'
    },
    {
      date: '04-12',
      title: 'First Space Shuttle Launch',
      description: 'Space Shuttle Columbia launched on STS-1, beginning the Space Shuttle era',
      year: 1981,
      category: 'Space Shuttle'
    }
  ],
  '04-13': [
    {
      date: '04-13',
      title: 'Apollo 13 Explosion',
      description: 'Oxygen tank explosion on Apollo 13 led to dramatic rescue mission',
      year: 1970,
      category: 'Human Spaceflight'
    }
  ],
  '04-19': [
    {
      date: '04-19',
      title: 'Aryabhata Launch',
      description: 'India\'s first satellite Aryabhata was launched, marking India\'s entry into space age',
      year: 1975,
      category: 'ISRO Mission'
    }
  ],
  '04-24': [
    {
      date: '04-24',
      title: 'Hubble Space Telescope Launch',
      description: 'Hubble Space Telescope was deployed, revolutionizing astronomy',
      year: 1990,
      category: 'Space Telescope'
    }
  ],
  '05-05': [
    {
      date: '05-05',
      title: 'Alan Shepard First American in Space',
      description: 'Alan Shepard became the first American in space aboard Freedom 7',
      year: 1961,
      category: 'Human Spaceflight'
    }
  ],
  '05-25': [
    {
      date: '05-25',
      title: 'Kennedy Moon Speech',
      description: 'President Kennedy announced the goal of landing humans on the Moon',
      year: 1961,
      category: 'Space Policy'
    }
  ],
  '06-03': [
    {
      date: '06-03',
      title: 'Ed White First American Spacewalk',
      description: 'Ed White performed the first American spacewalk during Gemini 4',
      year: 1965,
      category: 'Human Spaceflight'
    }
  ],
  '06-16': [
    {
      date: '06-16',
      title: 'Valentina Tereshkova First Woman in Space',
      description: 'Valentina Tereshkova became the first woman to travel to space aboard Vostok 6',
      year: 1963,
      category: 'Human Spaceflight'
    }
  ],
  '06-18': [
    {
      date: '06-18',
      title: 'Sally Ride First American Woman in Space',
      description: 'Sally Ride became the first American woman in space aboard Space Shuttle Challenger',
      year: 1983,
      category: 'Human Spaceflight'
    }
  ],
  '07-04': [
    {
      date: '07-04',
      title: 'Mars Pathfinder Landing',
      description: 'Mars Pathfinder successfully landed on Mars with the Sojourner rover',
      year: 1997,
      category: 'Mars Mission'
    }
  ],
  '07-14': [
    {
      date: '07-14',
      title: 'New Horizons Pluto Flyby',
      description: 'New Horizons spacecraft made its closest approach to Pluto',
      year: 2015,
      category: 'Deep Space'
    },
    {
      date: '07-14',
      title: 'Chandrayaan-3 Launch',
      description: 'India launched Chandrayaan-3 lunar mission from Satish Dhawan Space Centre',
      year: 2023,
      category: 'ISRO Mission'
    }
  ],
  '07-16': [
    {
      date: '07-16',
      title: 'Apollo 11 Launch',
      description: 'Apollo 11 launched from Kennedy Space Center, beginning humanity\'s first Moon landing mission',
      year: 1969,
      category: 'Moon Landing'
    }
  ],
  '07-20': [
    {
      date: '07-20',
      title: 'Apollo 11 Moon Landing',
      description: 'Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon',
      year: 1969,
      category: 'Moon Landing'
    },
    {
      date: '07-20',
      title: 'Viking 1 Mars Landing',
      description: 'Viking 1 lander successfully touched down on Mars',
      year: 1976,
      category: 'Mars Mission'
    }
  ],
  '07-30': [
    {
      date: '07-30',
      title: 'Mars Perseverance Launch',
      description: 'NASA launched the Mars 2020 Perseverance rover mission to Mars',
      year: 2020,
      category: 'Mars Mission'
    }
  ],
  '08-05': [
    {
      date: '08-05',
      title: 'Curiosity Mars Landing',
      description: 'NASA\'s Curiosity rover successfully landed in Gale Crater on Mars',
      year: 2012,
      category: 'Mars Mission'
    }
  ],
  '08-12': [
    {
      date: '08-12',
      title: 'Parker Solar Probe Launch',
      description: 'NASA launched Parker Solar Probe to study the Sun\'s corona',
      year: 2018,
      category: 'Solar Mission'
    }
  ],
  '08-20': [
    {
      date: '08-20',
      title: 'Voyager 2 Launch',
      description: 'Voyager 2 launched to explore the outer solar system',
      year: 1977,
      category: 'Deep Space'
    }
  ],
  '08-23': [
    {
      date: '08-23',
      title: 'Chandrayaan-3 Moon Landing',
      description: 'India\'s Chandrayaan-3 successfully soft-landed near the lunar south pole',
      year: 2023,
      category: 'ISRO Mission'
    }
  ],
  '08-25': [
    {
      date: '08-25',
      title: 'Voyager 1 Interstellar Space',
      description: 'Voyager 1 became the first human-made object to enter interstellar space',
      year: 2012,
      category: 'Deep Space'
    }
  ],
  '09-05': [
    {
      date: '09-05',
      title: 'Voyager 1 Launch',
      description: 'Voyager 1 launched to explore Jupiter, Saturn, and beyond',
      year: 1977,
      category: 'Deep Space'
    }
  ],
  '09-12': [
    {
      date: '09-12',
      title: 'Kennedy Moon Speech at Rice',
      description: 'President Kennedy delivered famous "We choose to go to the Moon" speech',
      year: 1962,
      category: 'Space Policy'
    }
  ],
  '09-24': [
    {
      date: '09-24',
      title: 'Mars Orbiter Mission Success',
      description: 'India\'s Mangalyaan successfully entered Mars orbit, making India the fourth nation to reach Mars',
      year: 2014,
      category: 'ISRO Mission'
    }
  ],
  '10-04': [
    {
      date: '10-04',
      title: 'Sputnik 1 Launch',
      description: 'Soviet Union launched Sputnik 1, the first artificial satellite, beginning the Space Age',
      year: 1957,
      category: 'Satellite'
    }
  ],
  '10-11': [
    {
      date: '10-11',
      title: 'Apollo 7 Launch',
      description: 'First crewed Apollo mission launched, testing the command module in Earth orbit',
      year: 1968,
      category: 'Human Spaceflight'
    }
  ],
  '10-15': [
    {
      date: '10-15',
      title: 'Cassini End of Mission',
      description: 'Cassini spacecraft ended its 20-year mission by diving into Saturn\'s atmosphere',
      year: 2017,
      category: 'Deep Space'
    }
  ],
  '10-22': [
    {
      date: '10-22',
      title: 'Chandrayaan-1 Launch',
      description: 'India launched its first lunar probe Chandrayaan-1 from Satish Dhawan Space Centre',
      year: 2008,
      category: 'ISRO Mission'
    }
  ],
  '11-03': [
    {
      date: '11-03',
      title: 'Laika First Animal in Orbit',
      description: 'Laika the dog became the first animal to orbit Earth aboard Sputnik 2',
      year: 1957,
      category: 'Animal in Space'
    }
  ],
  '11-05': [
    {
      date: '11-05',
      title: 'Mars Orbiter Mission Launch',
      description: 'India launched Mangalyaan (Mars Orbiter Mission) towards Mars',
      year: 2013,
      category: 'ISRO Mission'
    }
  ],
  '11-09': [
    {
      date: '11-09',
      title: 'Carl Sagan Birth',
      description: 'Birth of Carl Sagan, renowned astronomer and science communicator',
      year: 1934,
      category: 'Space Pioneer'
    }
  ],
  '11-14': [
    {
      date: '11-14',
      title: 'Apollo 12 Launch',
      description: 'Apollo 12 launched for the second Moon landing mission',
      year: 1969,
      category: 'Moon Landing'
    }
  ],
  '11-19': [
    {
      date: '11-19',
      title: 'Apollo 12 Moon Landing',
      description: 'Pete Conrad and Alan Bean landed on the Moon at Ocean of Storms',
      year: 1969,
      category: 'Moon Landing'
    }
  ],
  '11-26': [
    {
      date: '11-26',
      title: 'InSight Mars Landing',
      description: 'NASA\'s InSight lander successfully touched down on Mars to study the planet\'s interior',
      year: 2018,
      category: 'Mars Mission'
    }
  ],
  '12-07': [
    {
      date: '12-07',
      title: 'Apollo 17 Launch',
      description: 'Last crewed mission to the Moon launched with Apollo 17',
      year: 1972,
      category: 'Moon Landing'
    }
  ],
  '12-11': [
    {
      date: '12-11',
      title: 'Apollo 17 Moon Landing',
      description: 'Eugene Cernan and Harrison Schmitt landed on the Moon, last humans to walk on lunar surface',
      year: 1972,
      category: 'Moon Landing'
    }
  ],
  '12-14': [
    {
      date: '12-14',
      title: 'Eugene Cernan Last Moonwalk',
      description: 'Eugene Cernan became the last person to walk on the Moon during Apollo 17',
      year: 1972,
      category: 'Moon Landing'
    }
  ],
  '12-15': [
    {
      date: '12-15',
      title: 'Venera 7 Venus Landing',
      description: 'First successful landing on Venus by Soviet Venera 7',
      year: 1970,
      category: 'Venus Mission'
    }
  ],
  '12-21': [
    {
      date: '12-21',
      title: 'Apollo 8 Launch',
      description: 'First crewed mission to leave Earth orbit and travel to the Moon',
      year: 1968,
      category: 'Human Spaceflight'
    }
  ],
  '12-24': [
    {
      date: '12-24',
      title: 'Apollo 8 Lunar Orbit',
      description: 'Apollo 8 crew became first humans to orbit the Moon and see Earthrise',
      year: 1968,
      category: 'Human Spaceflight'
    }
  ]
};

// Monthly fallback events for when no specific date events are found
const monthlyFallbackEvents: { [key: string]: HistoricalEvent[] } = {
  '01': [
    {
      date: 'January',
      title: 'Space Exploration Milestones in January',
      description: 'January marks the beginning of many space missions and commemorates space tragedies that shaped safety protocols',
      year: 0,
      category: 'Monthly Overview'
    },
    {
      date: 'January',
      title: 'Apollo Program Legacy',
      description: 'January reminds us of both triumphs and tragedies in human spaceflight, including the Apollo 1 fire that led to improved safety measures',
      year: 1967,
      category: 'Human Spaceflight'
    }
  ],
  '02': [
    {
      date: 'February',
      title: 'Space Exploration Achievements in February',
      description: 'February has witnessed significant Mars missions and lunar exploration milestones',
      year: 0,
      category: 'Monthly Overview'
    },
    {
      date: 'February',
      title: 'Mars Exploration Month',
      description: 'February is notable for Mars missions, including Perseverance landing and various orbital insertions',
      year: 2021,
      category: 'Mars Mission'
    }
  ],
  '03': [
    {
      date: 'March',
      title: 'Spring Space Discoveries',
      description: 'March marks the beginning of spring and has seen many pioneering space exploration achievements',
      year: 0,
      category: 'Monthly Overview'
    },
    {
      date: 'March',
      title: 'Human Spaceflight Milestones',
      description: 'March is remembered for the first spacewalk and other human spaceflight achievements',
      year: 1965,
      category: 'Human Spaceflight'
    }
  ],
  '04': [
    {
      date: 'April',
      title: 'Historic Space Achievements in April',
      description: 'April is one of the most significant months in space history, marking humanity\'s first steps into space',
      year: 0,
      category: 'Monthly Overview'
    },
    {
      date: 'April',
      title: 'Human Spaceflight Begins',
      description: 'April 1961 marked the beginning of human spaceflight with Yuri Gagarin\'s historic flight',
      year: 1961,
      category: 'Human Spaceflight'
    },
    {
      date: 'April',
      title: 'India\'s Space Journey',
      description: 'April marks important milestones in India\'s space program, including the launch of Aryabhata',
      year: 1975,
      category: 'ISRO Mission'
    }
  ],
  '05': [
    {
      date: 'May',
      title: 'Space Exploration Milestones in May',
      description: 'May has witnessed important American space achievements and policy announcements',
      year: 0,
      category: 'Monthly Overview'
    },
    {
      date: 'May',
      title: 'American Space Program',
      description: 'May 1961 saw both the first American in space and Kennedy\'s Moon landing commitment',
      year: 1961,
      category: 'Human Spaceflight'
    }
  ],
  '06': [
    {
      date: 'June',
      title: 'Summer Space Exploration',
      description: 'June has been significant for human spaceflight achievements and space exploration milestones',
      year: 0,
      category: 'Monthly Overview'
    },
    {
      date: 'June',
      title: 'Women in Space',
      description: 'June celebrates women\'s contributions to space exploration, including first women in space',
      year: 1963,
      category: 'Human Spaceflight'
    }
  ],
  '07': [
    {
      date: 'July',
      title: 'Moon Landing Anniversary Month',
      description: 'July is forever remembered as the month humans first walked on the Moon',
      year: 0,
      category: 'Monthly Overview'
    },
    {
      date: 'July',
      title: 'Apollo 11 Moon Landing',
      description: 'July 1969 marked humanity\'s greatest space achievement with the first Moon landing',
      year: 1969,
      category: 'Moon Landing'
    },
    {
      date: 'July',
      title: 'Mars Exploration',
      description: 'July has seen significant Mars missions, including Viking and modern rover missions',
      year: 1976,
      category: 'Mars Mission'
    }
  ],
  '08': [
    {
      date: 'August',
      title: 'Deep Space Exploration in August',
      description: 'August has witnessed launches of major deep space missions and Mars exploration achievements',
      year: 0,
      category: 'Monthly Overview'
    },
    {
      date: 'August',
      title: 'Voyager Missions',
      description: 'August 1977 saw the launch of Voyager missions that continue to explore the outer solar system',
      year: 1977,
      category: 'Deep Space'
    },
    {
      date: 'August',
      title: 'India\'s Lunar Success',
      description: 'August 2023 marked India\'s historic Chandrayaan-3 Moon landing achievement',
      year: 2023,
      category: 'ISRO Mission'
    }
  ],
  '09': [
    {
      date: 'September',
      title: 'Autumn Space Achievements',
      description: 'September has seen important space policy decisions and interplanetary mission successes',
      year: 0,
      category: 'Monthly Overview'
    },
    {
      date: 'September',
      title: 'India\'s Mars Success',
      description: 'September 2014 marked India\'s successful Mars Orbiter Mission arrival at Mars',
      year: 2014,
      category: 'ISRO Mission'
    }
  ],
  '10': [
    {
      date: 'October',
      title: 'Space Age Beginning',
      description: 'October marks the beginning of the Space Age with Sputnik 1 and India\'s lunar exploration',
      year: 0,
      category: 'Monthly Overview'
    },
    {
      date: 'October',
      title: 'Sputnik and Space Age',
      description: 'October 1957 began the Space Age with the launch of Sputnik 1',
      year: 1957,
      category: 'Satellite'
    },
    {
      date: 'October',
      title: 'India\'s Lunar Missions',
      description: 'October has been significant for India\'s lunar exploration with Chandrayaan-1',
      year: 2008,
      category: 'ISRO Mission'
    }
  ],
  '11': [
    {
      date: 'November',
      title: 'Space Exploration in November',
      description: 'November has witnessed important animal space flights and India\'s Mars mission launch',
      year: 0,
      category: 'Monthly Overview'
    },
    {
      date: 'November',
      title: 'India\'s Mars Journey',
      description: 'November 2013 marked the launch of India\'s successful Mars Orbiter Mission',
      year: 2013,
      category: 'ISRO Mission'
    }
  ],
  '12': [
    {
      date: 'December',
      title: 'Year-End Space Achievements',
      description: 'December has seen the final Moon landings and important planetary exploration milestones',
      year: 0,
      category: 'Monthly Overview'
    },
    {
      date: 'December',
      title: 'Apollo Program Conclusion',
      description: 'December 1972 marked the end of the Apollo Moon landing program with Apollo 17',
      year: 1972,
      category: 'Moon Landing'
    }
  ]
};

export const fetchLaunchesForDate = async (date: string): Promise<LaunchData[]> => {
  const url = new URL(`${LAUNCH_LIBRARY_URL}/launch/`);
  url.searchParams.append('net__date', date);
  url.searchParams.append('limit', '10');

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch launches: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchHistoricalEvents = async (monthDay: string): Promise<HistoricalEvent[]> => {
  // First, try to get events for the specific month-day
  const specificEvents = historicalEventsDatabase[monthDay];
  
  if (specificEvents && specificEvents.length > 0) {
    return specificEvents;
  }
  
  // If no specific events found, return monthly fallback events
  const month = monthDay.split('-')[0];
  const monthlyEvents = monthlyFallbackEvents[month];
  
  if (monthlyEvents && monthlyEvents.length > 0) {
    return monthlyEvents;
  }
  
  // If no monthly events either, return a general space exploration event
  return [
    {
      date: monthDay,
      title: 'Space Exploration Continues',
      description: 'While no specific historical events are recorded for this date, space exploration continues with ongoing missions and discoveries happening around the world.',
      year: new Date().getFullYear(),
      category: 'General'
    }
  ];
};