# Adding Navigation to Appointments Calendar

This guide shows how to add navigation links to the Appointments Calendar from various parts of your application.

## Using the Navigation Utilities

A helper file has been created at `src/utils/appointmentsNavigation.ts` with utilities for appointments navigation.

### Example 1: Adding a Navigation Link to Header

```tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import {
  getAppointmentsUrl,
  canAccessAppointmentsCalendar,
  getAppointmentsLabel,
} from '../utils/appointmentsNavigation';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoToAppointments = () => {
    if (user && canAccessAppointmentsCalendar(user.role)) {
      const url = getAppointmentsUrl(
        user.role,
        user._id,
        user.facilityId as string
      );
      navigate(url);
    }
  };

  return (
    <header>
      {/* Other navigation items */}
      {user && canAccessAppointmentsCalendar(user.role) && (
        <button onClick={handleGoToAppointments}>
          {getAppointmentsLabel(user.role)}
        </button>
      )}
    </header>
  );
};
```

### Example 2: Navigation from Dashboard

Add this to your Dashboard component:

```tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { getAppointmentsUrl } from '../utils/appointmentsNavigation';
import Button from '../components/common/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleViewCalendar = () => {
    if (user) {
      const url = getAppointmentsUrl(
        user.role,
        user._id,
        user.facilityId as string
      );
      navigate(url);
    }
  };

  return (
    <div>
      {/* Dashboard content */}
      <Button onClick={handleViewCalendar}>📅 View Calendar</Button>
    </div>
  );
};
```

### Example 3: Adding to Sidebar Navigation

```tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import {
  getAppointmentsUrl,
  getAppointmentsLabel,
} from '../utils/appointmentsNavigation';

const Sidebar = () => {
  const { user } = useAuth();

  const appointmentsUrl = user
    ? getAppointmentsUrl(user.role, user._id, user.facilityId as string)
    : '#';

  return (
    <nav className='sidebar'>
      {/* Other menu items */}
      <Link to={appointmentsUrl} className='sidebar-link'>
        <span>📅</span>
        {user && getAppointmentsLabel(user.role)}
      </Link>
    </nav>
  );
};
```

### Example 4: Dropdown Menu Item

```tsx
import { Menu } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import {
  getAppointmentsUrl,
  getAppointmentsLabel,
} from '../utils/appointmentsNavigation';

const UserMenu = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavigate = () => {
    if (user) {
      const url = getAppointmentsUrl(
        user.role,
        user._id,
        user.facilityId as string
      );
      navigate(url);
    }
  };

  return (
    <Menu>
      <Menu.Items>
        {/* Other menu items */}
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleNavigate}
              className={`${
                active ? 'bg-gray-100' : ''
              } flex items-center w-full px-4 py-2`}
            >
              📅 {user && getAppointmentsLabel(user.role)}
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
```

### Example 5: Dashboard Card/Widget

```tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { getAppointmentsUrl } from '../utils/appointmentsNavigation';

const AppointmentsWidget = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleViewAll = () => {
    if (user) {
      const url = getAppointmentsUrl(
        user.role,
        user._id,
        user.facilityId as string
      );
      navigate(url);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h3 className='text-lg font-semibold mb-4'>Upcoming Appointments</h3>

      {/* Show some appointments here */}

      <button
        onClick={handleViewAll}
        className='text-blue-600 hover:text-blue-800 font-medium'
      >
        View Calendar →
      </button>
    </div>
  );
};
```

## Quick Copy-Paste Snippets

### Simple Navigate Function

```tsx
const navigateToAppointments = () => {
  if (user) {
    const url = getAppointmentsUrl(
      user.role,
      user._id,
      user.facilityId as string
    );
    navigate(url);
  }
};
```

### Link with Conditional Rendering

```tsx
{
  user && canAccessAppointmentsCalendar(user.role) && (
    <Link
      to={getAppointmentsUrl(user.role, user._id, user.facilityId as string)}
    >
      {getAppointmentsLabel(user.role)}
    </Link>
  );
}
```

### Button with Icon

```tsx
<Button
  onClick={() =>
    navigate(getAppointmentsUrl(user.role, user._id, user.facilityId as string))
  }
  variant='primary'
>
  <span className='mr-2'>📅</span>
  {getAppointmentsLabel(user.role)}
</Button>
```

## Styling Suggestions

### With Tailwind CSS

```tsx
<button
  onClick={navigateToAppointments}
  className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
>
  <svg
    className='w-5 h-5'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    />
  </svg>
  Calendar
</button>
```

### Card Style Link

```tsx
<div
  onClick={navigateToAppointments}
  className='bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white cursor-pointer hover:shadow-lg transition-shadow'
>
  <div className='text-4xl mb-2'>📅</div>
  <h3 className='text-xl font-semibold'>Appointments</h3>
  <p className='text-blue-100'>View your calendar</p>
</div>
```

## Best Practices

1. **Always check if user exists** before getting the URL
2. **Use canAccessAppointmentsCalendar** to conditionally show navigation
3. **Use getAppointmentsLabel** for consistent labeling
4. **Handle loading states** if user data isn't immediately available
5. **Provide visual feedback** on navigation actions

## Role-Specific Notes

### Patients

- Show as "My Appointments" or "My Calendar"
- Emphasize personal schedule
- Consider adding appointment count badge

### Facility Users (Admin/User)

- Show as "Appointments Calendar" or "Schedule Management"
- May want to show facility name in navigation
- Consider adding filters or quick views

### Chiropractors

- Show as "My Schedule" or "My Appointments"
- Consider adding today's appointment count
- May want quick access to today/this week view

### Super Admins

- May need facility selector before showing calendar
- Consider showing multiple facility calendars
- Add admin-specific features in navigation

## Common Patterns

### Dashboard Quick Actions

```tsx
const quickActions = [
  {
    label: getAppointmentsLabel(user?.role),
    icon: '📅',
    onClick: () =>
      navigate(getAppointmentsUrl(user.role, user._id, user.facilityId)),
    color: 'blue',
  },
  // ... other actions
];
```

### Navigation Menu Items

```tsx
const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
  {
    label: getAppointmentsLabel(user?.role),
    path: getAppointmentsUrl(user.role, user._id, user.facilityId),
    icon: '📅',
  },
  { label: 'Profile', path: '/profile', icon: '👤' },
];
```

## Troubleshooting

### Link not working?

- Verify user object exists and has required fields
- Check that role is valid
- Ensure facilityId exists for facility users

### Wrong page showing?

- Verify role is correctly set
- Check user permissions
- Ensure IDs are correct (userId vs facilityId)

### Navigation not showing?

- Check if canAccessAppointmentsCalendar returns true
- Verify user is authenticated
- Check conditional rendering logic

---

**Happy navigating! 🚀**
