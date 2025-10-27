import { Patient, User } from '../../../models';
type Props = {
  patient: User | Patient;
};
const PatientInfoSection = ({ patient }: Props) => {
  return (
    <div>
      <h3 className='text-sm font-semibold text-gray-700 mb-2'>
        Patient Information
      </h3>
      <div className='bg-white border border-gray-200 rounded-lg p-4'>
        <p className='font-medium text-gray-900'>{patient?.fullName}</p>
        {patient?.email && (
          <p className='text-sm text-gray-600'>📧 {patient?.email}</p>
        )}
        {patient?.phone && (
          <p className='text-sm text-gray-600'>📱 {patient?.phone}</p>
        )}
      </div>
    </div>
  );
};

export default PatientInfoSection;
