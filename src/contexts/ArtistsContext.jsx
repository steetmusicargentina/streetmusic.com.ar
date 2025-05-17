
import React, { createContext, useContext, useState } from 'react';

const ArtistsContext = createContext();

export function ArtistsProvider({ children }) {
  const [artists, setArtists] = useState([
    {
      id: 1,
      name: "Lucas Rodríguez",
      type: "Músico",
      instrument: "Guitarra y voz",
      location: { lat: -34.603722, lng: -58.381592 },
      isLive: true,
      nextPerformance: "2025-04-25T18:00:00",
      schedule: "Lunes a Viernes 17:00 - 20:00",
      description: "Música folclórica argentina y tango",
      videoUrl: "https://example.com/video1",
      image: "https://example.com/image1",
      tipAmount: 0,
      address: "Plaza de Mayo, CABA"
    },
    {
      id: 2,
      name: "Ana Martínez",
      type: "Bailarina de Tango",
      location: { lat: -34.608139, lng: -58.373213 },
      isLive: false,
      nextPerformance: "2025-04-26T16:00:00",
      schedule: "Fines de semana 16:00 - 19:00",
      description: "Espectáculo de tango callejero",
      videoUrl: "https://example.com/video2",
      image: "https://example.com/image2",
      tipAmount: 0,
      address: "Plaza Dorrego, San Telmo"
    },
    {
      id: 3,
      name: "Grupo La Boca",
      type: "Banda de Música",
      location: { lat: -34.628611, lng: -58.353889 },
      isLive: true,
      nextPerformance: "2025-04-25T19:00:00",
      schedule: "Todos los días 15:00 - 20:00",
      description: "Música tradicional porteña",
      videoUrl: "https://example.com/video3",
      image: "https://example.com/image3",
      tipAmount: 0,
      address: "Caminito, La Boca"
    }
  ]);

  const addArtist = (newArtist) => {
    const id = artists.length + 1;
    setArtists([...artists, { ...newArtist, id }]);
  };

  const sendTip = (artistId, amount) => {
    setArtists(artists.map(artist => 
      artist.id === artistId 
        ? { ...artist, tipAmount: (artist.tipAmount || 0) + amount }
        : artist
    ));
  };

  return (
    <ArtistsContext.Provider value={{ artists, addArtist, sendTip }}>
      {children}
    </ArtistsContext.Provider>
  );
}

export function useArtists() {
  const context = useContext(ArtistsContext);
  if (!context) {
    throw new Error('useArtists debe usarse dentro de ArtistsProvider');
  }
  return context;
}
