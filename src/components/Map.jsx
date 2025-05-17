
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useArtists } from '@/contexts/ArtistsContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import AddArtistModal from '@/components/AddArtistModal';
import "leaflet/dist/leaflet.css";

function LocationMarker({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

function Map() {
  const { artists } = useArtists();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (latlng) => {
    setSelectedLocation(latlng);
    setIsModalOpen(true);
  };

  return (
    <div className="relative h-[calc(100vh-8rem)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full rounded-lg overflow-hidden shadow-xl"
      >
        <MapContainer
          center={[-34.603722, -58.381592]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker onLocationSelect={handleLocationSelect} />
          {artists.map((artist) => (
            <Marker
              key={artist.id}
              position={[artist.location.lat, artist.location.lng]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{artist.name}</h3>
                  <p className="text-sm">{artist.type}</p>
                  <p className="text-xs text-gray-600 mt-1">{artist.address}</p>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      artist.isLive
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {artist.isLive ? 'En vivo' : 'Próximamente'}
                    </span>
                  </div>
                  <Button
                    className="mt-2 w-full"
                    onClick={() => navigate(`/artist/${artist.id}`)}
                  >
                    Ver perfil
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>

      <Button
        className="floating-button"
        size="lg"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" /> Agregar Artista
      </Button>

      <AddArtistModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLocation(null);
        }}
        selectedLocation={selectedLocation}
      />
    </div>
  );
}

export default Map;
