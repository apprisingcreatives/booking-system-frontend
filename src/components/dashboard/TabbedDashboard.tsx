import { useState } from 'react';
import { PaymentHistory } from '../payment';
import Dashboard from './Dashboard';

type TabType = 'appointments' | 'payments';

const TabbedDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('appointments');

  // Define available tabs - same for all client users
  const tabs = [
    { id: 'appointments' as TabType, label: 'Appointments', icon: '📅' },
    { id: 'payments' as TabType, label: 'Payments', icon: '💳' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <Dashboard />;
      case 'payments':
        return <PaymentHistory />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className='w-full max-w-6xl mx-auto'>
      {/* Tab Navigation */}
      <div className='bg-white rounded-t-xl shadow-sm border border-gray-200 mb-6'>
        <nav className='flex space-x-0'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 font-medium text-sm transition-all duration-200 first:rounded-tl-xl last:rounded-tr-xl ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className='flex items-center justify-center space-x-2'>
                <span className='text-lg'>{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className='bg-white rounded-b-xl shadow-lg border border-gray-200 border-t-0'>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TabbedDashboard;
