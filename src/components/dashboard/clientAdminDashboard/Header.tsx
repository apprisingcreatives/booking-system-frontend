import { Building2 } from 'lucide-react';
import React from 'react';
import { Facility } from '../../../models';

type Props = {
  facility: Facility;
};
const Header = ({ facility }: Props) => {
  return (
    <header className='mb-10'>
      <h1 className='text-4xl font-bold text-gray-900 mb-2'>
        {facility?.name || 'Facility'} Admin Dashboard
      </h1>
      <p className='text-lg text-gray-600'>
        Manage operations and users within your facility.
      </p>

      {facility && (
        <div className='mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200'>
          <div className='flex items-center space-x-4'>
            <Building2 className='w-6 h-6 text-blue-600' />
            <div>
              <h3 className='font-semibold text-blue-900'>{facility.name}</h3>
              <p className='text-sm text-blue-700'>{facility.address}</p>
              <p className='text-sm text-blue-600'>
                {facility.email} • {facility.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
