import { Service } from '../../models';

type Props = {
  service: Service;
};

const ServiceInfoSection = ({ service }: Props) => {
  return (
    <div>
      <h3 className='text-sm font-semibold text-gray-700 mb-2'>Service</h3>
      <div className='bg-white border border-gray-200 rounded-lg p-4'>
        <p className='font-medium text-gray-900'>{service?.name}</p>
        {service?.description && (
          <p className='text-sm text-gray-600 mt-1'>{service?.description}</p>
        )}
        <div className='flex gap-4 mt-2'>
          {service?.durationMinutes && (
            <p className='text-sm text-gray-600'>
              ⏱️ {service?.durationMinutes} minutes
            </p>
          )}
          {service?.price && (
            <p className='text-sm font-semibold text-gray-900'>
              💰 ₱{service?.price?.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoSection;
