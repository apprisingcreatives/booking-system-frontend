import React from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface TimeSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookedTimes: string[];
  onSelect: (time: string) => void;
}

const generateHourlySlots = (): string[] => {
  const slots: string[] = [];
  const start = 9;
  const end = 17; // 5 PM

  for (let hour = start; hour < end; hour++) {
    const time = `${String(hour).padStart(2, '0')}:00`;
    slots.push(time);
  }

  return slots;
};

const TimeSlotModal: React.FC<TimeSlotModalProps> = ({
  isOpen,
  onClose,
  bookedTimes,
  onSelect,
}) => {
  if (!isOpen) return null;

  const slots = generateHourlySlots();

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn'>
        {/* Header */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-800'>
            Select a Time Slot
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 transition'
          >
            <X size={20} />
          </button>
        </div>

        {/* Slots Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4'>
          {slots.map((slot) => {
            const isBooked = bookedTimes.includes(slot);
            return (
              <button
                key={slot}
                onClick={() => !isBooked && onSelect(slot)}
                disabled={isBooked}
                className={clsx(
                  'p-3 rounded-lg border font-medium text-center transition-all',
                  isBooked
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                )}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotModal;
