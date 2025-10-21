/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

// Import FullCalendar styles
// import '@fullcalendar/core/dist/index.css';
// import '@fullcalendar/daygrid/dist/index.css';
// import '@fullcalendar/timegrid/dist/index.css';
// import '@fullcalendar/list/dist/index.css';

import { useAuth } from '../hooks';
import useGetAppointments from '../hooks/useGetAppointments';
import { CircularLoading, ErrorTypography } from '../components/common';
import { Appointment, AppointmentStatus, UserRole } from '../models';
import AppointmentDetailsModal from '../components/dashboard/AppointmentDetailsModal';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const AppointmentsPage = () => {
  const { user } = useAuth();
  const { facilityId, role, _id: userId } = user || {};

  const navigate = useNavigate();

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    sendRequest: fetchAppointments,
    loading,
    appointments,
    errorMessage,
  } = useGetAppointments();

  useEffect(() => {
    if (!user) return;

    // Fetch based on user role
    if (role === UserRole.ClientAdmin || role === UserRole.ClientUser) {
      fetchAppointments({ facilityId: facilityId as string });
    } else if (role === UserRole.Patient) {
      fetchAppointments({ patientId: userId });
    } else if (role === UserRole.Chiropractor) {
      // For chiropractor, we need their chiropractor profile ID
      // This would need to be added to the user context or fetched separately
      fetchAppointments({ chiropractorId: userId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Transform appointments to FullCalendar events
  const calendarEvents = useMemo(() => {
    if (!appointments) return [];

    return appointments.map((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate);
      const [hours, minutes] = appointment.appointmentTime.split(':');
      appointmentDate.setHours(parseInt(hours), parseInt(minutes));

      // Calculate end time (default 30 minutes, or use service duration)
      const durationMinutes =
        (appointment.service as any)?.durationMinutes || 30;
      const endDate = new Date(
        appointmentDate.getTime() + durationMinutes * 60000
      );

      // Determine color based on status
      let backgroundColor = '#3b82f6'; // blue - default
      let borderColor = '#2563eb';

      switch (appointment.status) {
        case AppointmentStatus.Confirmed:
          backgroundColor = '#3b82f6'; // blue
          borderColor = '#2563eb';
          break;
        case AppointmentStatus.Completed:
          backgroundColor = '#22c55e'; // green
          borderColor = '#16a34a';
          break;
        case AppointmentStatus.Cancelled:
          backgroundColor = '#ef4444'; // red
          borderColor = '#dc2626';
          break;
        case AppointmentStatus.Pending:
          backgroundColor = '#eab308'; // yellow
          borderColor = '#ca8a04';
          break;
        case AppointmentStatus.InProgress:
          backgroundColor = '#a855f7'; // purple
          borderColor = '#9333ea';
          break;
        case AppointmentStatus.NoShow:
          backgroundColor = '#6b7280'; // gray
          borderColor = '#4b5563';
          break;
      }

      // Build event title
      let title = '';
      if (role === UserRole.ClientAdmin || role === UserRole.ClientUser) {
        // For facility users, show patient name
        title = `${(appointment.patient as any)?.fullName || 'Patient'} - ${
          (appointment.service as any)?.name || 'Service'
        }`;
      } else if (role === UserRole.Patient) {
        // For patients, show chiropractor name
        title = `${
          (appointment.chiropractor as any)?.name || 'Chiropractor'
        } - ${(appointment.service as any)?.name || 'Service'}`;
      } else if (role === UserRole.Chiropractor) {
        // For chiropractors, show patient name
        title = `${(appointment.patient as any)?.fullName || 'Patient'} - ${
          (appointment.service as any)?.name || 'Service'
        }`;
      }

      return {
        id: appointment._id,
        title,
        start: appointmentDate,
        end: endDate,
        backgroundColor,
        borderColor,
        extendedProps: {
          appointment,
        },
      };
    });
  }, [appointments, role]);

  const handleEventClick = (clickInfo: any) => {
    const appointment = clickInfo.event.extendedProps.appointment;
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleBookAppointment = () => {
    navigate('/booking');
  };

  const handleManagePatients = () => {
    navigate(`/facilities/${facilityId}/manage-patients`);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <CircularLoading size='lg' />
      </div>
    );
  }

  return (
    <div className='w-full p-8 max-w-7xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Appointments Calendar
            </h2>
            <p className='text-gray-600'>
              View and manage all appointments in calendar view
            </p>
          </div>
          <div className='flex items-center gap-2'>
            {role === UserRole.ClientUser && (
              <Button variant='primary' onClick={handleManagePatients}>
                Manage Patients
              </Button>
            )}
            {(role === UserRole.Patient ||
              role === UserRole.ClientAdmin ||
              role === UserRole.ClientUser) && (
              <Button variant='primary' onClick={handleBookAppointment}>
                {role === UserRole.Patient
                  ? 'Book Appointment'
                  : 'Create Appointment'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className='mb-4'>
          <ErrorTypography>{errorMessage}</ErrorTypography>
        </div>
      )}

      {/* Legend */}
      <div className='mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200'>
        <h3 className='text-sm font-semibold text-gray-700 mb-3'>
          Status Legend
        </h3>
        <div className='flex flex-wrap gap-4'>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 rounded bg-yellow-400'></div>
            <span className='text-sm text-gray-700'>Pending</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 rounded bg-blue-500'></div>
            <span className='text-sm text-gray-700'>Confirmed</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 rounded bg-purple-500'></div>
            <span className='text-sm text-gray-700'>In Progress</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 rounded bg-green-500'></div>
            <span className='text-sm text-gray-700'>Completed</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 rounded bg-red-500'></div>
            <span className='text-sm text-gray-700'>Cancelled</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 rounded bg-gray-500'></div>
            <span className='text-sm text-gray-700'>No Show</span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className='bg-white rounded-lg shadow-lg p-6 border border-gray-200'>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView='dayGridMonth'
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          events={calendarEvents}
          eventClick={handleEventClick}
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          height='auto'
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }}
          slotMinTime='07:00:00'
          slotMaxTime='20:00:00'
          allDaySlot={false}
          nowIndicator={true}
          eventDisplay='block'
        />
      </div>

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        open={modalOpen}
        appointment={selectedAppointment}
        onClose={handleCloseModal}
      />

      {/* No appointments message */}
      {!loading && (!appointments || appointments.length === 0) && (
        <div className='text-center py-16 mt-8 bg-white rounded-lg shadow-sm'>
          <div className='w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6'>
            <span className='text-4xl'>📅</span>
          </div>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>
            No appointments scheduled
          </h3>
          <p className='text-gray-500 max-w-md mx-auto mb-6'>
            {role === UserRole.Patient
              ? "You don't have any appointments yet. Book your first appointment to get started!"
              : 'There are no appointments scheduled at this time.'}
          </p>
          {(role === UserRole.Patient ||
            role === UserRole.ClientAdmin ||
            role === UserRole.ClientUser) && (
            <Button variant='primary' onClick={handleBookAppointment}>
              {role === UserRole.Patient
                ? 'Book Appointment'
                : 'Create Appointment'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
