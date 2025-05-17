
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useArtists } from '@/contexts/ArtistsContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

function ArtistProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { artists, sendTip } = useArtists();
  const { toast } = useToast();
  const [tipAmount, setTipAmount] = useState(500); // Comenzamos con 500 pesos

  const artist = artists.find(a => a.id === parseInt(id));

  if (!artist) {
    return <div>Artista no encontrado</div>;
  }

  const handleTip = () => {
    sendTip(artist.id, tipAmount);
    toast({
      title: "¡Gracias por tu propina!",
      description: `Has enviado $${tipAmount} a ${artist.name}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al mapa
      </Button>

      <div className="bg-card rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-48">
          <img 
            className="w-full h-full object-cover"
            alt={`${artist.name} actuando`}
            src="https://images.unsplash.com/photo-1503248421283-7ff46b3f50e7" />
          <div className="absolute top-4 right-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              artist.isLive
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}>
              {artist.isLive ? '¡En vivo ahora!' : 'No está actuando'}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{artist.name}</h1>
          <p className="text-muted-foreground mb-4">{artist.type}</p>
          <p className="text-sm text-gray-600 mb-4">{artist.description}</p>

          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{artist.address}</span>
            </div>

            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Próxima actuación: {format(new Date(artist.nextPerformance), "d 'de' MMMM 'a las' HH:mm", { locale: es })}</span>
            </div>

            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4" />
              <span>Horario habitual: {artist.schedule}</span>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Enviar una propina</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setTipAmount(Math.max(100, tipAmount - 100))}
                >
                  -
                </Button>
                <span className="text-xl font-bold">${tipAmount}</span>
                <Button
                  variant="outline"
                  onClick={() => setTipAmount(tipAmount + 100)}
                >
                  +
                </Button>
                <Button
                  className="ml-4"
                  onClick={handleTip}
                >
                  Enviar propina
                </Button>
              </div>
            </div>

            {artist.videoUrl && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Videos recientes</h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    src={artist.videoUrl}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ArtistProfile;
