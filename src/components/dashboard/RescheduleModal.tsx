import { useState, useMemo } from 'react';
import clsx from 'clsx';
import { Modal } from '../common';
import { combineDateTime } from '../../utils/dateFormatter';
import { Appointment } from '../../models';
import Button from '../common/Button';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDateTime: string) => void;
  appointments: Appointment[];
  loading?: boolean;
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

const RescheduleModal = ({
  isOpen,
  onClose,
  onConfirm,
  appointments,
  loading = false,
}: RescheduleModalProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const slots = generateHourlySlots();

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  // Filter booked times for the selected date only
  const bookedTimesForSelectedDate = useMemo(() => {
    if (!selectedDate || !appointments) return [];

    return appointments
      .filter((appt) => {
        const apptDate = new Date(appt.appointmentDate);
        const apptDateString = apptDate.toISOString().split('T')[0];
        return apptDateString === selectedDate;
      })
      .map((appt) => {
        // Extract time in HH:mm format
        return appt.appointmentTime;
      });
  }, [selectedDate, appointments]);

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const newDateTime = combineDateTime(selectedDate, selectedTime);
      onConfirm(newDateTime);
    }
  };

  const handleClose = () => {
    setSelectedDate('');
    setSelectedTime('');
    onClose();
  };

  const isConfirmDisabled = !selectedDate || !selectedTime;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title='Reschedule Appointment'
      size='md'
    >
      <div className='space-y-6'>
        {/* Date Selection */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Select New Date
          </label>
          <input
            type='date'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={today}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

        {/* Time Slot Selection */}
        {selectedDate && (
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Select New Time Slot
            </label>
            <div className='grid grid-cols-3 gap-3 max-h-64 overflow-y-auto p-2'>
              {slots.map((slot) => {
                const isBooked = bookedTimesForSelectedDate.includes(slot);
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    type='button'
                    onClick={() => !isBooked && setSelectedTime(slot)}
                    disabled={isBooked}
                    className={clsx(
                      'p-3 rounded-lg border font-medium text-center transition-all',
                      isBooked &&
                        'bg-gray-200 text-gray-500 cursor-not-allowed',
                      !isBooked &&
                        !isSelected &&
                        'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200',
                      isSelected &&
                        'bg-blue-500 text-white border-blue-600 ring-2 ring-blue-300'
                    )}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex justify-end gap-3 pt-4 border-t'>
          <Button
            variant='ghost'
            onClick={handleClose}
            disabled={loading}
            className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50'
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            loading={loading}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Rescheduling...' : 'Confirm Reschedule'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RescheduleModal;
