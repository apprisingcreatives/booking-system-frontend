import { useAuth } from '../../hooks';
import { useUserFacilities } from '../../hooks/useUserFacilities';
import { UserRole } from '../../models';
import { Calendar, Star } from 'lucide-react'; // Add icons for style

type Props = {
  servicesRef: React.RefObject<HTMLElement | null>;
};

const ServicesSection = ({ servicesRef }: Props) => {
  const { user } = useAuth();
  const { services } = useUserFacilities();

  const renderScheduleAppointmentButton = () => {
    if (
      user?.role === UserRole.ClientAdmin ||
      user?.role === UserRole.ClientUser
    )
      return null;

    return (
      <div className='flex justify-center pt-4'>
        <a
          href='/booking'
          className='inline-flex items-center gap-2 px-8 py-3 text-white font-semibold bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200'
        >
          <Calendar className='h-5 w-5' />
          Schedule an Appointment
        </a>
      </div>
    );
  };

  return (
    <section
      id='services'
      ref={servicesRef}
      className='min-h-screen bg-gradient-to-b from-white via-blue-50 to-gray-100 flex flex-col justify-center px-6 py-20'
    >
      <div className='max-w-6xl mx-auto text-center space-y-12'>
        {/* Header */}
        <div>
          <h2 className='text-4xl md:text-5xl font-extrabold text-blue-700 mb-4'>
            Our Services
          </h2>
          <p className='text-gray-600 text-lg md:text-xl max-w-3xl mx-auto'>
            Explore the range of care we provide to ensure your well-being and
            comfort.
          </p>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.length > 0 ? (
            services.map((service) => (
              <div
                key={service._id}
                className='group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border border-gray-100 hover:border-blue-200'
              >
                <div className='flex items-center justify-between mb-3'>
                  <div className='p-3 bg-blue-100 rounded-full group-hover:bg-blue-600 transition-colors duration-300'>
                    <Star className='h-5 w-5 text-blue-600 group-hover:text-white' />
                  </div>
                  {service.price && (
                    <span className='text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
                      ₱{service.price}
                    </span>
                  )}
                </div>

                <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                  {service.name}
                </h3>

                {service.description && (
                  <p className='text-gray-600 text-sm leading-relaxed line-clamp-3'>
                    {service.description}
                  </p>
                )}

                {service.durationMinutes && (
                  <p className='mt-3 text-sm text-gray-500'>
                    ⏱ {service.durationMinutes} mins
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className='text-gray-500 text-lg col-span-full'>
              No services available at the moment.
            </p>
          )}
        </div>

        {/* CTA */}
        {renderScheduleAppointmentButton()}
      </div>
    </section>
  );
};

export default ServicesSection;
