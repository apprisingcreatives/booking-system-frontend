const TableHeader = () => {
  return (
    <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
      <tr>
        <th className="px-6 py-3">Name</th>
        <th className="px-6 py-3">Email</th>
        <th className="px-6 py-3">Role</th>
        <th className="px-6 py-3 text-right">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
