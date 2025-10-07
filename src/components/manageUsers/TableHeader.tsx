const tableHeaderStyle =
  'px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider';
const tableHeaderStyle2 = 'flex items-center space-x-2';

const TableHeader = () => {
  return (
    <thead className='bg-gradient-to-r from-gray-50 to-gray-100'>
      <tr>
        <th className={tableHeaderStyle}>
          <div className={tableHeaderStyle2}>
            <span>👤</span>
            <span>Name</span>
          </div>
        </th>
        <th className={tableHeaderStyle}>
          <div className={tableHeaderStyle2}>
            <span>📧</span>
            <span>Email</span>
          </div>
        </th>
        <th className={tableHeaderStyle}>
          <div className={tableHeaderStyle2}>
            <span>🏢</span>
            <span>Facility</span>
          </div>
        </th>
        <th className={tableHeaderStyle}>
          <div className={`${tableHeaderStyle2} justify-start`}>
            <span>🔑</span>
            <span>Role</span>
          </div>
        </th>
        <th className={tableHeaderStyle}>
          <div className={`${tableHeaderStyle2} justify-end`}>
            <span>⚙️</span>
            <span>Actions</span>
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
