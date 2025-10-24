import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import { Settings, UserCheck, UserCog } from 'lucide-react';

type Props = {
  facilityId: string;
};

const FacilityManagement = ({ facilityId }: Props) => {
  const navigate = useNavigate();
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10'>
      <Button
        variant='secondary'
        onClick={() => navigate(`/facilities/${facilityId}/manage-services`)}
      >
        <Settings className='w-5 h-5' />
        <span>Manage Services</span>
      </Button>
      <Button
        variant='secondary'
        onClick={() => navigate(`/facilities/${facilityId}/manage-staff`)}
      >
        <UserCog className='w-5 h-5' />
        <span>Manage Staff</span>
      </Button>
      <Button
        variant='secondary'
        onClick={() => navigate(`/facilities/${facilityId}/manage-patients`)}
      >
        <UserCheck className='w-5 h-5' />
        <span>Manage Patients</span>
      </Button>
    </div>
  );
};

export default FacilityManagement;
