
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Map from '@/components/Map';
import ArtistProfile from '@/components/ArtistProfile';
import { ArtistsProvider } from '@/contexts/ArtistsContext';

function App() {
  return (
    <Router>
      <ArtistsProvider>
        <div className="min-h-[100dvh] bg-background flex flex-col">
          <Navbar />
          <main className="flex-1 relative">
            <div className="absolute inset-0">
              <Routes>
                <Route path="/" element={<Map />} />
                <Route path="/artist/:id" element={<ArtistProfile />} />
              </Routes>
            </div>
          </main>
          <Toaster />
        </div>
      </ArtistsProvider>
    </Router>
  );
}

export default App;
