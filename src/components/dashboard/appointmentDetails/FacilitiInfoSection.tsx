import { Facility } from '../../models';

type Props = {
  facility: Facility;
};

const FacilitiInfoSection = ({ facility }: Props) => {
  return (
    <div>
      <h3 className='text-sm font-semibold text-gray-700 mb-2'>Facility</h3>
      <div className='bg-white border border-gray-200 rounded-lg p-4'>
        <p className='font-medium text-gray-900'>{facility?.name}</p>
        {facility?.address && (
          <p className='text-sm text-gray-600'>📍 {facility?.address}</p>
        )}
        {facility?.phoneNumber && (
          <p className='text-sm text-gray-600'>📱 {facility?.phoneNumber}</p>
        )}
      </div>
    </div>
  );
};

export default FacilitiInfoSection;
