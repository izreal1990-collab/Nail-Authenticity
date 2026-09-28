import React from 'react';
import { CheckCircle2, Clock, DollarSign } from 'lucide-react';

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
};

export const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'Full Set Acrylics', description: 'Premium acrylic application with custom shaping.', price: 65, duration: 120 },
  { id: '2', name: 'Gel Manicure', description: 'Long-lasting gel polish with cuticle care.', price: 45, duration: 60 },
  { id: '3', name: 'Nail Art (Detailed)', description: 'Custom hand-painted art on 2-4 nails.', price: 20, duration: 45 },
  { id: '4', name: 'Fill-in / Rebalance', description: 'Maintenance for acrylics or gel extensions.', price: 40, duration: 90 },
  { id: '5', name: 'Pedicure Deluxe', description: 'Complete foot care, scrub, and polish.', price: 55, duration: 90 },
];

export default function ServiceSelection({ onSelect }: { onSelect: (service: Service) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {MOCK_SERVICES.map((service) => (
        <button
          key={service.id}
          onClick={() => onSelect(service)}
          className="flex flex-col text-left p-6 rounded-2xl border-2 border-gray-100 hover:border-pink-400 transition-all bg-white shadow-sm hover:shadow-md group"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600">{service.name}</h3>
            <div className="flex items-center text-pink-600 font-semibold">
              <DollarSign size={16} />
              <span>{service.price}</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-4 flex-grow">{service.description}</p>
          <div className="flex items-center text-gray-400 text-xs gap-1">
            <Clock size={14} />
            <span>{service.duration} mins</span>
          </div>
        </button>
      ))}
    </div>
  );
}
