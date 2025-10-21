import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth, useGetFacilityPatients, useSnackbar } from '../hooks';
import { CircularLoading, ErrorTypography, Input } from '../components/common';
import { User } from '../models/user';
import {
  PatientCard,
  PatientDetailsModal,
  AddPatientModal,
} from '../components/patients';
import { SnackbarType } from '../constants/snackbar';
import Select from '../components/common/Select';

const PatientManagementPage = () => {
  const { facilityId } = useParams<{ facilityId: string }>();
  const { user } = useAuth();
  const { snackbar } = useSnackbar();

  const {
    patients,
    loading,
    errorMessage,
    sendRequest: fetchPatients,
  } = useGetFacilityPatients();

  const [selectedPatient, setSelectedPatient] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addPatientModalOpen, setAddPatientModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (facilityId || user?.facilityId) {
      fetchPatients((facilityId || user?.facilityId) as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilityId, user?.facilityId]);

  const handlePatientClick = (patient: User) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPatient(null);
  };

  const handleStatusUpdate = () => {
    // Refresh the patient list after status update
    if (facilityId || user?.facilityId) {
      fetchPatients((facilityId || user?.facilityId) as string);
    }
    snackbar(
      'Patient status updated successfully',
      SnackbarType.SUCCESS,
      true,
      3000
    );
  };

  const handlePatientAdded = () => {
    // Refresh the patient list after adding a new patient
    if (facilityId || user?.facilityId) {
      fetchPatients((facilityId || user?.facilityId) as string);
    }
  };

  // Filter and search patients
  const filteredPatients = useMemo(() => {
    if (!patients) return [];

    return patients.filter((patient) => {
      // Search filter
      const matchesSearch =
        patient.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (patient.phone && patient.phone.includes(searchQuery));

      // Status filter
      const matchesStatus =
        statusFilter === 'all' || patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, searchQuery, statusFilter]);

  if (loading && !patients.length) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <CircularLoading size='lg' />
      </div>
    );
  }

  return (
    <div className='w-full p-8 max-w-7xl mx-auto'>
      {/* Header */}
      <div className='mb-8 flex justify-between items-start'>
        <div>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>
            Patient Management
          </h2>
          <p className='text-gray-600'>
            View and manage all patients with appointments at your facility
          </p>
        </div>
        <button
          onClick={() => setAddPatientModalOpen(true)}
          className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          + Add Patient
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className='mb-4'>
          <ErrorTypography>{errorMessage}</ErrorTypography>
        </div>
      )}

      {/* Search and Filter */}
      <div className='mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Search */}

          <Input
            label='Search Patients'
            id='search'
            name='search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            placeholder='Search by name, email, or phone...'
          />

          {/* Status Filter */}

          <Select
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Active', value: 'active' },
              { label: 'Pending', value: 'pending' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Suspended', value: 'suspended' },
            ]}
            label='Filter by Status'
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>

        {/* Results count */}
        <div className='mt-4 text-sm text-gray-600'>
          Showing {filteredPatients.length} of {patients.length} patients
        </div>
      </div>

      {/* Patients Grid */}
      {filteredPatients.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient._id}
              patient={patient}
              onClick={() => handlePatientClick(patient)}
            />
          ))}
        </div>
      ) : (
        <div className='text-center py-16 bg-white rounded-lg shadow-sm'>
          <div className='w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6'>
            <span className='text-4xl'>👥</span>
          </div>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>
            {searchQuery || statusFilter !== 'all'
              ? 'No patients found'
              : 'No patients yet'}
          </h3>
          <p className='text-gray-500 max-w-md mx-auto'>
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Patients will appear here once they book appointments at your facility'}
          </p>
        </div>
      )}

      {/* Patient Details Modal */}
      <PatientDetailsModal
        isOpen={modalOpen}
        patient={selectedPatient}
        facilityId={(facilityId || user?.facilityId) as string}
        onClose={handleCloseModal}
        onStatusUpdate={handleStatusUpdate}
      />

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={addPatientModalOpen}
        facilityId={(facilityId || user?.facilityId) as string}
        onClose={() => setAddPatientModalOpen(false)}
        onPatientAdded={handlePatientAdded}
      />
    </div>
  );
};

export default PatientManagementPage;
