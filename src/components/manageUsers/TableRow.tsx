import { Facility, User } from '../../models';
import Button from '../common/Button';

type Props = {
  user: User;
  onEditUserClick: (user: User) => void;
};

const TableRow = ({ user, onEditUserClick }: Props) => {
  const { _id: id, fullName, email, role, facilityId } = user || {};

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'clientuser':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'dentist':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <tr
      key={id}
      className='hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100'
    >
      <td className='px-6 py-4'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
            <span className='text-white text-sm font-semibold'>
              {fullName?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <div className='font-medium text-gray-900'>{fullName}</div>
            <div className='text-sm text-gray-500'>ID: {id?.slice(-6)}</div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4'>
        <div className='text-sm text-gray-900'>{email}</div>
      </td>
      <td className='px-6 py-4'>
        <div className='text-sm text-gray-900'>
          {(facilityId as Facility)?.name || 'N/A'}
        </div>
      </td>
      <td className='px-6 py-4'>
        <span
          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(
            role
          )}`}
        >
          {role?.toLowerCase() === 'clientuser'
            ? 'Client User'
            : role?.charAt(0)?.toUpperCase() + role?.slice(1)?.toLowerCase()}
        </span>
      </td>
      <td className='px-6 py-4'>
        <div className='flex justify-end space-x-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => onEditUserClick(user)}
            className='border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300'
          >
            <span className='mr-1'>✏️</span>
            Edit
          </Button>
          <Button
            size='sm'
            variant='outline'
            className='border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
          >
            <span className='mr-1'>👁️</span>
            View
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
