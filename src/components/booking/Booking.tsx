import BookingForm from "./BookingForm";

const Booking = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 md:-mt-16">
      <div className="w-full max-w-xl bg-gray-50 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Book an Appointment
        </h2>
        <BookingForm />
      </div>
    </div>
  );
};

export default Booking;
