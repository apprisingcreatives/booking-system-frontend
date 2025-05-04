import { useAuth } from "../../hooks";
import { UserRole } from "../../models";
import { services } from "./constants";

type Props = {
  servicesRef: React.RefObject<HTMLElement | null>;
};

const ServicesSection = ({ servicesRef }: Props) => {
  const { user } = useAuth();

  const renderSchedulAppointmentButton = () => {
    if (user?.role === UserRole.Admin || user?.role === UserRole.Dentist) {
      return null;
    }
    return (
      <a
        href="/booking"
        className="mt-8 inline-block px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-700 transition duration-200"
      >
        Schedule an Appointment
      </a>
    );
  };

  return (
    <section
      id="services"
      ref={servicesRef}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col justify-center px-6 py-16"
    >
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div>
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We offer a range of services to keep your smile healthy and bright.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left text-gray-800 text-lg">
          {services.map((service) => (
            <li
              key={service.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              {service.label}
            </li>
          ))}
        </ul>

        <div>{renderSchedulAppointmentButton()}</div>
      </div>
    </section>
  );
};

export default ServicesSection;
