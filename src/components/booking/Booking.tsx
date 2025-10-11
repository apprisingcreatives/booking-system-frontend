import BookingForm from './BookingForm';

const Booking = () => {
  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-2xl'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Book an Appointment
          </h1>
          <p className='text-lg text-gray-600 max-w-md mx-auto'>
            Schedule your dental appointment with our experienced professionals
          </p>
        </div>

        <div className='bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100'>
          <div className='bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6'>
            <h2 className='text-2xl font-bold text-white text-center'>
              Appointment Details
            </h2>
          </div>
          <div className='p-8'>
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
