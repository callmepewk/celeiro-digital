import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { MapPin, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CitySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const cities = await base44.entities.City.filter({ is_active: true });
      return cities;
    },
    initialData: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem('celeiro_city');
    if (stored) {
      setSelectedCity(JSON.parse(stored));
    } else if (cities.length > 0) {
      const matriz = cities.find(c => c.is_matriz) || cities[0];
      setSelectedCity(matriz);
      localStorage.setItem('celeiro_city', JSON.stringify(matriz));
    }
  }, [cities]);

  const handleSelect = (city) => {
    setSelectedCity(city);
    localStorage.setItem('celeiro_city', JSON.stringify(city));
    setIsOpen(false);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      
      let closest = cities[0];
      let minDistance = Infinity;

      cities.forEach(city => {
        if (city.latitude && city.longitude) {
          const distance = Math.sqrt(
            Math.pow(city.latitude - latitude, 2) + 
            Math.pow(city.longitude - longitude, 2)
          );
          if (distance < minDistance) {
            minDistance = distance;
            closest = city;
          }
        }
      });

      if (closest) {
        handleSelect(closest);
      }
    });
  };

  if (!selectedCity || cities.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 text-white hover:border-[#39FF14]/50 transition-all duration-300 shadow-lg max-w-[calc(100vw-2rem)] sm:max-w-none"
      >
        <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#39FF14] flex-shrink-0" />
        <div className="text-left min-w-0 flex-1">
          <p className="text-[10px] sm:text-xs text-gray-400">Unidade</p>
          <p className="text-xs sm:text-sm font-semibold truncate">{selectedCity.name} - {selectedCity.state}</p>
        </div>
        <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400 flex-shrink-0" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Selecione a Unidade</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={detectLocation}
                className="w-full mb-4 px-4 py-3 rounded-xl bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-semibold hover:opacity-90 transition-opacity"
              >
                <MapPin className="w-4 h-4 inline mr-2" />
                Detectar Localização Mais Próxima
              </button>

              <div className="space-y-2">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleSelect(city)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      selectedCity?.id === city.id
                        ? 'bg-[#39FF14]/10 border-[#39FF14]/50'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white font-semibold">{city.name}</p>
                        <p className="text-gray-400 text-sm">{city.state}</p>
                        {city.is_matriz && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/30">
                            Matriz
                          </span>
                        )}
                      </div>
                      {selectedCity?.id === city.id && (
                        <div className="w-5 h-5 rounded-full bg-[#39FF14] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-black" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}