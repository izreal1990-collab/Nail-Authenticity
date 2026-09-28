import React from 'react';
import { format, addDays, startOfToday, eachDayOfInterval, isSameDay } from 'date-fns';
import { supabase } from '@/lib/supabase';

export default function CalendarPicker({ 
  selectedService, 
  onSelectTime 
}: { 
  selectedService: any; 
  onSelectTime: (date: Date) => void;
}) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [slots, setSlots] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const days = eachDayOfInterval({
    start: startOfToday(),
    end: addDays(startOfToday(), 14),
  });

  const fetchSlots = async (date: Date) => {
    setLoading(true);
    try {
      // In a real app, we fetch availability and existing appointments from Supabase
      // For now, we generate slots based on the selectedService.duration
      // This logic will be replaced by a DB query once Supabase is connected
      const mockSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];
      setSlots(mockSlots);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate]);

  return (
    <div className="space-y-8">
      {/* Date Selection */}
      <div className="flex overflow-x-auto gap-3 pb-4 snap-x">
        {days.map((day) => (
          <button
            key={day.toString()}
            onClick={() => setSelectedDate(day)}
            className={`flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center transition-all snap-start ${
              isSameDay(day, selectedDate) 
              ? 'bg-pink-500 text-white shadow-lg scale-110' 
              : 'bg-white text-gray-600 border border-pink-100 hover:border-pink-300'
            }`}
          >
            <span className="text-xs uppercase font-bold opacity-70">{format(day, 'eee')}</span>
            <span className="text-lg font-bold">{format(day, 'd')}</span>
          </button>
        ))}
      </div>

      {/* Time Slot Selection */}
      <div className="grid grid-cols-3 gap-3">
        {loading ? (
          <div className="col-span-3 text-center py-8 text-gray-400">Loading available slots...</div>
        ) : (
          slots.map((slot) => (
            <button
              key={slot}
              onClick={() => onSelectTime(new Date(`${format(selectedDate, 'yyyy-MM-dd')} ${slot}`))}
              className="p-3 rounded-xl border border-pink-200 text-pink-600 font-medium hover:bg-pink-500 hover:text-white transition-colors text-sm"
            >
              {slot}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
