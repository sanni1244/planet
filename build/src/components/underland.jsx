import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const currentYear = new Date().getFullYear();

  const events = [
    {
      name: 'Chinese New Year',
      countries: 'China, Singapore, Malaysia, Taiwan, Vietnam, etc.',
      targetDate: new Date('February 10, 2024'),
      description: 'The grand celebration of the lunar new year with dragon dances, lantern festivals, and family reunions.'
    },
    {
      name: 'Bastille Day',
      countries: 'France',
      targetDate: new Date('July 14, 2025'),
      description: 'The French National Day celebrates the storming of the Bastille and the birth of the French Republic.'
    },
    {
      name: 'Diwali',
      countries: 'India, Nepal, Sri Lanka, Bangladesh, Fiji, etc.',
      targetDate: new Date('November 3, 2025'),
      description: 'Known as the Festival of Lights, Diwali marks the victory of light over darkness and good over evil.'
    },
    {
      name: 'Oktoberfest',
      countries: 'Germany, USA, Brazil',
      targetDate: new Date('September 20, 2025'),
      description: 'The world-famous beer festival in Munich, Germany, with thousands of liters of beer, music, and Bavarian food.'
    },
    {
      name: 'Mardi Gras',
      countries: 'USA (New Orleans)',
      targetDate: new Date('February 25, 2025'),
      description: 'A colorful and lively celebration of parades, masks, beads, and vibrant street parties in New Orleans.'
    },
    {
        name: 'St. Patrick\'s Day',
        countries: 'Ireland, USA, UK, Canada, Australia',
        targetDate: new Date('March 17, 2025'),
        description: 'Celebrating Irish culture, St. Patrick\'s Day is known for parades, green attire, and celebrations of Irish heritage.'
      },
      {
        name: 'Day of the Dead (Día de los Muertos)',
        countries: 'Mexico',
        targetDate: new Date('November 1-2, 2025'),
        description: 'A beautiful tradition to honor the dead with altars, marigolds, sugar skulls, and feasts.'
      },
      {
        name: 'Independence Day',
        countries: 'USA',
        targetDate: new Date('July 4, 2025'),
        description: 'The celebration of American independence with fireworks, barbecues, parades, and patriotic displays.'
      },
      {
        name: 'La Tomatina',
        countries: 'Spain',
        targetDate: new Date('August 27, 2025'),
        description: 'The world’s largest food fight, held in Buñol, Spain, where thousands of people throw tomatoes at each other.'
      },
      {
        name: 'Sydney New Year\'s Eve',
        countries: 'Australia (Global Broadcast)',
        targetDate: new Date('December 31, 2025'),
        description: 'Sydney\'s iconic fireworks display on New Year’s Eve is one of the largest and most popular in the world.'
      },
      {
        name: 'The Great Wall Marathon',
        countries: 'China',
        targetDate: new Date('May 17, 2025'),
        description: 'A marathon that takes participants across the famous Great Wall of China with breathtaking views and a challenging course.'
      },
      {
        name: 'King\'s Day',
        countries: 'Netherlands',
        targetDate: new Date('April 27, 2025'),
        description: 'The Dutch celebrate King Willem-Alexander’s birthday with street parties, royal traditions, and national pride.'
      },
      {
        name: 'The Running of the Bulls',
        countries: 'Spain',
        targetDate: new Date('July 6, 2025'),
        description: 'The world-famous event in Pamplona, Spain, where participants run in front of bulls as part of the San Fermín festival.'
      },
      {
        name: 'Cherry Blossom Festival',
        countries: 'Japan',
        targetDate: new Date('April 1, 2025'),
        description: 'The arrival of spring is celebrated with picnics and festivals under the stunning cherry blossoms in Japan.'
      },
      {
        name: 'Eid al-Fitr',
        countries: 'Worldwide (Muslim-majority countries)',
        targetDate: new Date('April 21, 2025'),
        description: 'The celebration marking the end of Ramadan with communal prayers, feasts, and giving.'
      },
      {
        name: 'Carnival',
        countries: 'Brazil, Trinidad & Tobago, Caribbean, etc.',
        targetDate: new Date('February 17, 2025'),
        description: 'A vibrant celebration of music, dance, and parades, especially in Brazil and the Caribbean.'
      },
      {
        name: 'Anzac Day',
        countries: 'Australia, New Zealand',
        targetDate: new Date('April 25, 2025'),
        description: 'A day of remembrance for soldiers who fought in wars, particularly during the Gallipoli campaign.'
      },
      {
        name: 'Tết Nguyên Đán',
        countries: 'Vietnam',
        targetDate: new Date('February 10, 2025'),
        description: 'The Vietnamese Lunar New Year with family gatherings, feasts, and honoring ancestors.'
      },
      {
        name: 'Glastonbury Festival',
        countries: 'United Kingdom',
        targetDate: new Date('June 25, 2025'),
        description: 'The largest greenfield music and performing arts festival in the world.'
      },
      {
        name: 'Bastille Day Fireworks',
        countries: 'France',
        targetDate: new Date('July 14, 2025'),
        description: 'The beautiful fireworks display in Paris to mark Bastille Day, set around the Eiffel Tower.'
      },
      {
        name: 'Edinburgh Festival Fringe',
        countries: 'United Kingdom',
        targetDate: new Date('August 7, 2025'),
        description: 'The world’s largest arts festival held annually in Edinburgh, Scotland.'
      },
      {
        name: 'Matsuri Festivals',
        countries: 'Japan',
        targetDate: new Date('Various dates'),
        description: 'Traditional Japanese festivals with parades, music, and local customs.'
      },
      {
        name: 'Fête de la Musique',
        countries: 'Worldwide',
        targetDate: new Date('June 21, 2025'),
        description: 'A worldwide celebration of music with free performances in streets, parks, and public spaces.'
      },
      {
        name: 'Wimbledon Tennis Championships',
        countries: 'United Kingdom',
        targetDate: new Date('June 29, 2025'),
        description: 'The prestigious annual tennis tournament held in Wimbledon, London.'
      },
      {
        name: 'St. Lucia Jazz Festival',
        countries: 'Saint Lucia',
        targetDate: new Date('May 5, 2025'),
        description: 'An internationally recognized jazz festival held in Saint Lucia.'
      },
      {
        name: 'Holi Festival',
        countries: 'India, Nepal, Bangladesh',
        targetDate: new Date('March 7, 2025'),
        description: 'The festival of colors, celebrating the arrival of spring and the victory of good over evil.'
      },
      {
        name: 'Machu Picchu Inca Trail Marathon',
        countries: 'Peru',
        targetDate: new Date('May 10, 2025'),
        description: 'A challenging marathon run along the ancient Inca Trail leading to the Machu Picchu ruins.'
      },
      {
        name: 'New Year\'s Day (Global)',
        countries: 'Worldwide',
        targetDate: new Date('January 1, 2025'),
        description: 'Celebrating the beginning of a new year with parties, fireworks, and festivities around the world.'
      },
      {
        name: 'Burning Man',
        countries: 'USA',
        targetDate: new Date('August 30, 2025'),
        description: 'A cultural festival focused on art, community, and self-expression, held annually in the Nevada desert.'
      },
      {
        name: 'Hanami',
        countries: 'Japan',
        targetDate: new Date('April 1, 2025'),
        description: 'The tradition of cherry blossom viewing in Japan, enjoying the fleeting beauty of blossoms.'
      },
      {
        name: 'Fête des Vignerons',
        countries: 'Switzerland',
        targetDate: new Date('August 2025'),
        description: 'A unique festival in Vevey celebrating the region’s wine heritage with a large, colorful spectacle.'
      },
      {
        name: 'Diada de Sant Jordi',
        countries: 'Spain (Catalonia)',
        targetDate: new Date('April 23, 2025'),
        description: 'Catalonia’s celebration of love and culture, where people exchange roses and books.'
      },
      {
        name: 'Gion Matsuri',
        countries: 'Japan (Kyoto)',
        targetDate: new Date('July 2025'),
        description: 'One of Japan’s most famous festivals, held in Kyoto, featuring parades and religious processions.'
      },
      {
        name: 'Tango Festival',
        countries: 'Argentina',
        targetDate: new Date('August 2025'),
        description: 'A celebration of Argentina’s most famous dance, the tango, featuring performances and competitions.'
      },
      {
        name: 'Day of the Constitution',
        countries: 'Spain',
        targetDate: new Date('December 6, 2025'),
        description: 'Celebrating Spain’s constitution with public festivities and official events.'
      },
      {
        name: 'Boryeong Mud Festival',
        countries: 'South Korea',
        targetDate: new Date('July 2025'),
        description: 'A unique festival in South Korea where participants enjoy mud wrestling and mud-based activities.'
      },
      {
        name: 'Vivid Sydney',
        countries: 'Australia',
        targetDate: new Date('May 2025'),
        description: 'An annual festival of lights, music, and ideas with spectacular light installations in Sydney.'
      },
      {
        name: 'Gion Matsuri',
        countries: 'Japan',
        targetDate: new Date('July 17, 2025'),
        description: 'A famous festival in Kyoto with parades of grand floats and traditional Japanese performances.'
      },
      {
        name: 'Pride Month',
        countries: 'Worldwide',
        targetDate: new Date('June 2025'),
        description: 'A month of celebrations and advocacy for the LGBTQ+ community, with parades and events in cities worldwide.'
      }
  ];

  const getTimeLeft = (targetDate) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const target = new Date(targetDate);
    
    // Normalize the target date to ignore the year and only focus on the month and day
    target.setFullYear(currentYear);

    // If the event has already passed for this year, set it to the next year
    if (target < now) {
      target.setFullYear(currentYear + 1);
    }

    const timeRemaining = target - now;

    if (timeRemaining <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const getNextEvents = () => {
    const upcomingEvents = events.map((event) => {
      return { event, timeLeft: getTimeLeft(event.targetDate) };
    });

    // Sort events by timeLeft, from the closest to the farthest
    upcomingEvents.sort((a, b) => {
      const timeA = a.timeLeft.days * 86400 + a.timeLeft.hours * 3600 + a.timeLeft.minutes * 60 + a.timeLeft.seconds;
      const timeB = b.timeLeft.days * 86400 + b.timeLeft.hours * 3600 + b.timeLeft.minutes * 60 + b.timeLeft.seconds;
      return timeA - timeB; // Ascending order (closest first)
    });

    return upcomingEvents.slice(0, 3); // Get top 3 closest events
  };

  const [nextEvents, setNextEvents] = useState(getNextEvents());

  useEffect(() => {
    const timer = setInterval(() => {
      setNextEvents(getNextEvents());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white min-h-screen">
  <h1 className="text-4xl sm:text-5xl font-bold mb-10 tracking-wide text-center transition-transform transform hover:scale-105">
    Countdown to Events of {currentYear + 1}
  </h1>
  <div className="grid gap-5 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
    {nextEvents.map((item, index) => (
      <div
        key={index}
        className={`p-5 rounded-lg shadow-lg bg-opacity-75 ${
          index % 3 === 0
            ? "bg-orange-500"
            : index % 3 === 1
            ? "bg-green-500"
            : "bg-blue-500"
        } text-center transform hover:scale-105 transition-transform`}
      >
        <h2 className="text-2xl font-semibold mb-3">
          {item.event.name} {currentYear + 1}
        </h2>
        <p className="text-sm sm:text-base mb-3 text-gray-200">
          {item.event.description}
        </p>
        <p className="text-sm sm:text-base font-semibold mb-3">
          {item.event.targetDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-sm sm:text-base mb-3">
          {item.event.countries === "World Wide"
            ? "Celebrated Worldwide"
            : `Celebrated in: ${item.event.countries}`}
        </p>
        <div className="text-lg font-bold text-yellow-300">
          {item.timeLeft.days}d : {item.timeLeft.hours}h : {item.timeLeft.minutes}m : {item.timeLeft.seconds}s
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default CountdownTimer;
