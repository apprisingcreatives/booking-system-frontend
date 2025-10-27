import { Chiropractor } from '../../../models';

type Props = {
  chiropractor: Chiropractor;
};

const ChiropractorInfoSection = ({ chiropractor }: Props) => {
  return (
    <div>
      <h3 className='text-sm font-semibold text-gray-700 mb-2'>Chiropractor</h3>
      <div className='bg-white border border-gray-200 rounded-lg p-4'>
        <p className='font-medium text-gray-900'>{chiropractor?.name}</p>
        {chiropractor?.specialization && (
          <p className='text-sm text-gray-600'>
            {chiropractor?.specialization}
          </p>
        )}
        {chiropractor?.email && (
          <p className='text-sm text-gray-600'>📧 {chiropractor?.email}</p>
        )}
        {chiropractor?.phone && (
          <p className='text-sm text-gray-600'>📱 {chiropractor?.phone}</p>
        )}
      </div>
    </div>
  );
};

export default ChiropractorInfoSection;
