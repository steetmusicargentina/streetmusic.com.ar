
import React, { useState } from 'react';
import { useArtists } from '@/contexts/ArtistsContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function AddArtistModal({ isOpen, onClose, selectedLocation }) {
  const { addArtist } = useArtists();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    schedule: '',
    nextPerformance: '',
    address: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newArtist = {
      ...formData,
      isLive: false,
      location: selectedLocation || { lat: -34.603722, lng: -58.381592 },
      tipAmount: 0,
    };

    addArtist(newArtist);
    toast({
      title: "¡Artista agregado!",
      description: "El artista ha sido agregado exitosamente al mapa.",
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
          >
            <Button
              variant="ghost"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Artista</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tipo de Artista</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Horario</label>
                <input
                  type="text"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Próxima Actuación</label>
                <input
                  type="datetime-local"
                  name="nextPerformance"
                  value={formData.nextPerformance}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Agregar Artista
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default AddArtistModal;
