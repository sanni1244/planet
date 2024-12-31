// LandmarksGlobe.js
import React, { useState } from 'react';
import Globe from 'react-globe.gl';

const LandmarksGlobe = () => {
  // Array of landmarks with additional information
  const landmarks = [
    {
      lat: 48.8584,
      lng: 2.2945,
      name: 'Eiffel Tower',
      color: 'red',
      description: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It was designed by Gustave Eiffel and completed in 1889.',
      image: 'https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It was the tallest man-made structure in the world until the Chrysler Building was finished in New York City in 1930.',
      pinImage: '/img/paris.png'
    }, {
      lat: 40.748817,
      lng: -73.985428,
      name: 'Empire State Building',
      color: 'blue',
      description: 'The Empire State Building is a 102-story Art Deco skyscraper in Midtown Manhattan, New York City.',
      image: 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It was the tallest building in the world when it was completed in 1931 and remained so for nearly 40 years.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Empire_State_Building_Icon.svg'
    }
    ,
    {
      lat: 51.5074,
      lng: -0.1278,
      name: 'Big Ben',
      color: 'green',
      description: 'Big Ben is the nickname for the Great Bell of the Great Clock of Westminster, at the north end of the Palace of Westminster in London.',
      image: 'https://images.pexels.com/photos/77171/pexels-photo-77171.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'The clock tower was renamed Elizabeth Tower in 2012 in honor of Queen Elizabeth II’s Diamond Jubilee.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Big_Ben_icon.svg'
    },
    {
      lat: 34.0522,
      lng: -118.2437,
      name: 'Hollywood Sign',
      color: 'purple',
      description: 'The Hollywood Sign is an American cultural icon located in the Hollywood Hills, Los Angeles, California.',
      image: 'https://images.pexels.com/photos/2695679/pexels-photo-2695679.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'Originally created as an advertisement, the sign has become a symbol of the entertainment industry.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Hollywood_Sign_Icon.svg'
    },
    {
      lat: 41.8902,
      lng: 12.4922,
      name: 'Colosseum',
      color: 'orange',
      description: 'The Colosseum is an ancient amphitheater located in the center of Rome, Italy.',
      image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It is the largest amphitheater ever built and could hold up to 80,000 spectators.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Colosseum_icon.svg'
    },
    {
      lat: 37.7749,
      lng: -122.4194,
      name: 'Golden Gate Bridge',
      color: 'pink',
      description: 'The Golden Gate Bridge is a suspension bridge spanning the Golden Gate Strait in San Francisco, California.',
      image: 'https://images.pexels.com/photos/1006965/pexels-photo-1006965.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'At the time of completion in 1937, it was the longest suspension bridge in the world.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Golden_Gate_Bridge_icon.svg'
    }, {
      lat: -33.8688,
      lng: 151.2093,
      name: 'Sydney Opera House',
      color: 'lightblue',
      description: 'The Sydney Opera House is a multi-venue performing arts center in Sydney, Australia.',
      image: 'https://images.pexels.com/photos/1086852/pexels-photo-1086852.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'Known for its unique shell-like design, it is one of the 20th century\'s most recognizable and photographed buildings.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Sydney_Opera_House_Icon.svg'
    },
    {
      lat: -34.0522,
      lng: 18.4232,
      name: 'Robben Island',
      color: 'blue',
      description: 'Robben Island is a former prison island off the coast of Cape Town, South Africa, where Nelson Mandela was imprisoned for many years.',
      image: 'https://capetowndaytours.checkfront.com/media/L7-10--1707423175034704.jpg',
      moreInfo: 'It is now a museum and a symbol of the struggle for freedom in South Africa.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Robben_Island_Icon.svg'
    },
    {
      lat: -22.9519,
      lng: 14.4808,
      name: 'Sossusvlei',
      color: 'orange',
      description: 'Sossusvlei is a salt and clay pan located in the Namib Desert, Namibia, famous for its towering red sand dunes.',
      image: 'https://images.pexels.com/photos/3714898/pexels-photo-3714898.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It is one of the most iconic desert landscapes in the world, often used as a backdrop for photography.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Sossusvlei_Icon.svg'
    },
    {
      lat: 9.0667,
      lng: 7.2833,
      name: 'Zuma Rock',
      color: 'brown',
      description: 'Zuma Rock is a large monolithic rock formation located in Niger State, Nigeria. It is a prominent landmark and a natural wonder.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Zuma_Rock.jpg/800px-Zuma_Rock.jpg',
      moreInfo: 'Zuma Rock is often referred to as the "Gateway to Abuja" because of its position along the major highway to Nigeria\'s capital.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Zuma_Rock_Icon.svg'
    },
    {
      lat: -13.1631,
      lng: -72.5450,
      name: 'Machu Picchu',
      color: 'green',
      description: 'Machu Picchu is a 15th-century Inca citadel located in the Andes mountains in Peru. It is one of the most famous archaeological sites in the world.',
      image: 'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It is believed to have been a royal estate or religious retreat for Inca emperors.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Machu_Picchu_Icon.svg'
    },
    {
      lat: -22.9068,
      lng: -43.1729,
      name: 'Christ the Redeemer',
      color: 'white',
      description: 'Christ the Redeemer is a giant statue of Jesus Christ located on the Corcovado Mountain in Rio de Janeiro, Brazil.',
      image: 'https://images.pexels.com/photos/2868248/pexels-photo-2868248.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'The statue is one of the New Seven Wonders of the World and a symbol of Christianity.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Christ_the_Redeemer_Icon.svg'
    },
    {
      lat: -34.6037,
      lng: -58.3816,
      name: 'Obelisco de Buenos Aires',
      color: 'gray',
      description: 'The Obelisco de Buenos Aires is a historic monument in the center of Buenos Aires, Argentina, built to commemorate the 400th anniversary of the founding of the city.',
      image: 'https://img.freepik.com/premium-photo/vibrant-street-scene-with-obelisco-monument-free-activities-buenos-aires_902820-4701.jpg',
      moreInfo: 'The monument stands 67 meters tall and is a symbol of the city.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Obelisco_de_Buenos_Aires_Icon.svg'
    },
    {
      lat: -23.5505,
      lng: -46.6333,
      name: 'São Paulo Cathedral',
      color: 'lightgray',
      description: 'São Paulo Cathedral, also known as the Catedral da Sé, is a Neo-Gothic cathedral located in the heart of São Paulo, Brazil.',
      image: 'https://placestovisitbrazil.com/wp-content/uploads/2016/02/catedral-da-se.jpg',
      moreInfo: 'It is the largest cathedral in Brazil and the fourth largest in the world.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Sao_Paulo_Cathedral_Icon.svg'
    },
    {
      lat: -14.2350,
      lng: -51.9253,
      name: 'Iguazu Falls',
      color: 'blue',
      description: 'Iguazu Falls is a massive waterfall system located on the border between Argentina and Brazil. It is one of the largest and most spectacular waterfall systems in the world.',
      image: 'https://images.pexels.com/photos/695214/pexels-photo-695214.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'The falls are a UNESCO World Heritage Site and are surrounded by lush rainforest.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Iguazu_Falls_Icon.svg'
    },
    {
      lat: 27.1751,
      lng: 78.0421,
      name: 'Taj Mahal',
      color: 'turquoise',
      description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India.',
      image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It was built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Taj_Mahal_Icon.svg'
    },
    {
      lat: 40.6892,
      lng: -76.0445,
      name: 'Statue of Liberty',
      color: 'gold',
      description: 'The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor, USA.',
      image: 'https://images.pexels.com/photos/2767739/pexels-photo-2767739.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'A gift from France in 1886, it is a symbol of freedom and democracy.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Statue_of_Liberty_Icon.svg'
    },
    {
      lat: 48.2082,
      lng: 16.3738,
      name: 'Vienna State Opera',
      color: 'brown',
      description: 'The Vienna State Opera is one of the most important opera houses in the world, located in the heart of Vienna, Austria.',
      image: 'https://images.pexels.com/photos/15779835/pexels-photo-15779835/free-photo-of-a-large-building-with-lights-on-it-at-night.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It was inaugurated in 1869 and is home to the Vienna Philharmonic Orchestra.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Opera_House_Icon.svg'
    },
    {
      lat: 35.6895,
      lng: 139.6917,
      name: 'Tokyo Tower',
      color: 'grey',
      description: 'Tokyo Tower is a communications and observation tower located in Minato, Tokyo, Japan.',
      image: 'https://images.pexels.com/photos/5745048/pexels-photo-5745048.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It was inspired by the Eiffel Tower and stands 333 meters tall.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Tokyo_Tower_Icon.svg'
    },
    {
      lat: 52.5200,
      lng: 13.4050,
      name: 'Brandenburg Gate',
      color: 'silver',
      description: 'The Brandenburg Gate is an 18th-century neoclassical monument located in Berlin, Germany.',
      image: 'https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It has stood through various historical events, including the Cold War and the reunification of Germany.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Brandenburg_Gate_Icon.svg'
    },
    {
      lat: 40.4319,
      lng: 116.5704,
      name: 'Great Wall of China',
      color: 'brown',
      description: 'The Great Wall of China is a series of fortifications made of various materials, stretching across northern China.',
      image: 'https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It was built to protect Chinese states from invasions and raids by nomadic tribes.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Great_Wall_Icon.svg'
    },
    {
      lat: 39.7392,
      lng: -104.9903,
      name: 'Denver Union Station',
      color: 'red',
      description: 'Denver Union Station is a historic landmark located in downtown Denver, Colorado.',
      image: 'https://denverarchitecture.org/wp-content/uploads/2017/06/Union-Station-e1515544592340.png',
      moreInfo: 'It serves as a transportation hub for Amtrak, the light rail, and buses.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Denver_Union_Station_Icon.svg'
    },
    {
      lat: 19.4326,
      lng: -99.1332,
      name: 'Palacio de Bellas Artes',
      color: 'red',
      description: 'The Palacio de Bellas Artes is a prominent cultural center and opera house located in Mexico City, Mexico.',
      image: 'https://images.pexels.com/photos/604661/pexels-photo-604661.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It is famous for its stunning architecture, murals by Diego Rivera, and hosting of important cultural events.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Palacio_de_Bellas_Artes_Icon.svg'
    },
    {
      lat: 43.65107,
      lng: -79.347015,
      name: 'CN Tower',
      color: 'blue',
      description: 'The CN Tower is a communications and observation tower in Toronto, Canada.',
      image: 'https://images.pexels.com/photos/443416/pexels-photo-443416.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'At 553 meters, it was once the world’s tallest free-standing structure.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/CN_Tower_Icon.svg'
    },
    {
      lat: 41.2565,
      lng: 95.9345,
      name: 'Omaha Beach',
      color: 'beige',
      description: 'Omaha Beach is a famous World War II site located in Normandy, France.',
      image: 'https://images.pexels.com/photos/18099946/pexels-photo-18099946/free-photo-of-les-braves-omaha-beach-memorial-on-the-beach-in-saint-laurent-sur-mer-france.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It was one of the landing beaches during the Normandy Invasion on June 6, 1944.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Omaha_Beach_Icon.svg'
    },
    {
      lat: 27.9881,
      lng: 86.9250,
      name: 'Mount Everest Base Camp',
      color: 'white',
      description: 'Mount Everest Base Camp is the starting point for climbing the world’s highest peak, located in Nepal.',
      image: 'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It’s a popular trekking destination with stunning views of the surrounding mountains.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mount_Everest_Base_Camp_Icon.svg'
    },
    {
      lat: 51.5074,
      lng: -0.1278,
      name: 'London Eye',
      color: 'blue',
      description: 'The London Eye is a giant observation wheel situated on the South Bank of the River Thames.',
      image: 'https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It is one of the tallest observation wheels in the world and offers a spectacular view of London.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/0/06/London_Eye_Icon.svg'
    },
    {
      lat: 48.2082,
      lng: 16.3738,
      name: 'St. Stephen\'s Cathedral',
      color: 'purple',
      description: 'St. Stephen\'s Cathedral is a Romanesque and Gothic church located in the heart of Vienna, Austria.',
      image: 'https://images.pexels.com/photos/20407113/pexels-photo-20407113/free-photo-of-st-stephens-cathedral-seen-from-the-river-danube-in-passau-germany.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It is the mother church of the Archdiocese of Vienna and one of the most recognized landmarks of Austria.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/St_Stephen%27s_Cathedral_Icon.svg'
    },
    {
      lat: 43.0731,
      lng: -89.4012,
      name: 'Wisconsin State Capitol',
      color: 'darkgreen',
      description: 'The Wisconsin State Capitol is the seat of the government of the U.S. state of Wisconsin.',
      image: 'https://images.pexels.com/photos/4217697/pexels-photo-4217697.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'Its dome is the fifth tallest in the world and is the tallest building in Madison, Wisconsin.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Wisconsin_State_Capitol_Icon.svg'
    },
    {
      lat: 21.4225,
      lng: 39.8262,
      name: 'Kaaba',
      color: 'black',
      description: 'The Kaaba is a sacred building located at the center of the Masjid al-Haram mosque in Mecca, Saudi Arabia.',
      image: 'https://images.pexels.com/photos/4346403/pexels-photo-4346403.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It is the most sacred site in Islam, and Muslims around the world face it during daily prayers.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Kaaba_Icon.svg'
    },
    {
      lat: -33.9249,
      lng: 18.4241,
      name: 'Table Mountain',
      color: 'brown',
      description: 'Table Mountain is a flat-topped mountain in Cape Town, South Africa.',
      image: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It is one of the New7Wonders of Nature and offers stunning views of the surrounding city.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Table_Mountain_Icon.svg'
    },
    {
      lat: 41.7484,
      lng: -73.9857,
      name: 'One World Trade Center',
      color: 'lightblue',
      description: 'One World Trade Center is the main building of the World Trade Center complex in Lower Manhattan, New York City.',
      image: 'https://images.pexels.com/photos/1400249/pexels-photo-1400249.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It is the tallest building in the Western Hemisphere, standing at 1,776 feet.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/One_World_Trade_Center_Icon.svg'
    },
    {
      lat: 28.7041,
      lng: 77.1025,
      name: 'India Gate',
      color: 'orange',
      description: 'India Gate is a war memorial located in New Delhi, India.',
      image: 'https://images.pexels.com/photos/978245/pexels-photo-978245.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It was built in honor of the soldiers who died in World War I and is a symbol of national pride.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/India_Gate_Icon.svg'
    },
    {
      lat: 43.0029,
      lng: 12.4534,
      name: 'Vatican City',
      color: 'pink',
      description: 'Vatican City is an independent city-state enclaved within Rome, Italy, and is the spiritual and administrative center of the Roman Catholic Church.',
      image: 'https://images.pexels.com/photos/326709/pexels-photo-326709.jpeg?auto=compress&cs=tinysrgb&w=600',
      moreInfo: 'It is the smallest state in the world by both area and population.',
      pinImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Vatican_City_Icon.svg'
    },
  ];

  const [selectedLandmark, setSelectedLandmark] = useState(null);

  // Handle closing the modal
  const closeModal = () => {
    setSelectedLandmark(null);
  };

  // Prevent rendering the Globe until landmarks data is valid
  if (!landmarks || landmarks.length === 0) {
    return <p className="text-white text-center">Loading landmarks...</p>;
  }

  return (
    <section className="">
      <div className="text-center text-white landmark-name">
        {/* Globe Component */}
        <div className="">
          <h2 className='text-white'>Explore! Learn! Guess!!!</h2>
          <Globe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
            pointsData={landmarks}
            pointLat={(d) => d.lat}
            pointLng={(d) => d.lng}
            pointLabel={(d) => d.name}
            pointAltitude={0.04}
            pointRadius={0.7}
            pointColor={(d) => d.color || 'gray'}
            onPointClick={(point) => setSelectedLandmark(point)}
            pointRender={(d) => (
              <img
                src={d.pinImage || '/img/paris.png'}
                alt={d.name}
                className="w-8 h-8 object-cover"
              />
            )}
          />
        </div>

        {/* Modal for landmark information */}
        {selectedLandmark && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl text-black">
              <h3 className="text-3xl font-bold mb-4">{selectedLandmark.name}</h3>
              <img
                src={selectedLandmark.image}
                alt={selectedLandmark.name}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <p className="text-lg mb-4">{selectedLandmark.description}</p>
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LandmarksGlobe;