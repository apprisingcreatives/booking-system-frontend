import { useState } from 'react';
import { PaymentHistory } from '../payment';
import Dashboard from './Dashboard';

const TabbedDashboard = () => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'payments'>(
    'appointments'
  );

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'payments', label: 'Payments', icon: '💳' },
  ];

  return (
    <div className='w-full max-w-6xl mx-auto'>
      {/* Tab Navigation */}
      <div className='border-b border-gray-200 mb-6'>
        <nav className='-mb-px flex space-x-8'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id as 'appointments' | 'payments')
              }
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className='mr-2'>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className='mt-6'>
        {activeTab === 'appointments' ? <Dashboard /> : <PaymentHistory />}
      </div>
    </div>
  );
};

export default TabbedDashboard;
