import { useMemo } from 'react';

import { useAuth } from '../../hooks';
import { UserRole } from '../../models';

type Props = {
  currentView: string;
  onChangeView: (view: string) => void;
};

const Sidebar = ({ currentView, onChangeView }: Props) => {
  const { user } = useAuth();
  const { role } = user || {};

  const navItems = useMemo(() => {
    const baseItems: { label: string; view: string }[] = [
      { label: 'Update Profile', view: 'update-profile' },
      { label: 'Change Password', view: 'update-password' },
    ];

    if (role === UserRole.ClientUser) {
      baseItems.push({
        label: 'Create dentist profile',
        view: 'dentist-profile',
      });
    }

    return baseItems;
  }, [role]);
  const getButtonClass = (view: string) =>
    `w-full text-left px-4 py-2 rounded-md transition cursor-pointer ${
      currentView === view
        ? 'bg-blue-100 text-blue-700 font-semibold'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <aside className='w-64 bg-white p-6 shadow-md border-r'>
      <nav className='space-y-4'>
        {navItems.map(({ label, view }) => (
          <button
            key={view}
            onClick={() => onChangeView(view)}
            className={getButtonClass(view)}
          >
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
