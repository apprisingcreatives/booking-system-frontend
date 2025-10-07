import Sidebar from './Sidebar';
import { UpdatePasswordForm, UpdateProfileInfoForm } from '.';

import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const { view } = useParams();
  const navigate = useNavigate();

  const onChangeView = (view: string) => {
    navigate(`/profile/${view}`);
  };

  const renderContent = () => {
    if (view === 'update-profile') {
      return <UpdateProfileInfoForm />;
    }
    if (view === 'update-password') {
      return <UpdatePasswordForm />;
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-50 overflow-hidden'>
      <Sidebar currentView={view || 'profile'} onChangeView={onChangeView} />

      <main className='flex-1 p-6 flex justify-center items-start'>
        <div className='w-full max-w-md'>{renderContent()}</div>
      </main>
    </div>
  );
};

export default Profile;
