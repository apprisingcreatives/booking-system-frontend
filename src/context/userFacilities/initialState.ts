import { UserFacilitiesState } from './types';

export const initialState: UserFacilitiesState = {
  currentFacilityData: null,
  selectedFacility: null,
  loading: false,
  error: '',
  userRole: null,
  fetchFacility: () => {},
  facilityLoading: false,
  facilityErrorMessage: '',
  currentFacility: null,

  // Actions - these will be overridden by the context provider
  loadUserFacilitiesData: async () => {},
  loadFacilityData: async () => {},
  setSelectedFacility: () => {},
  clearFacilitiesData: () => {},

  // SuperAdmin specific methods
  getAllFacilities: async () => {},
  getAllUsers: async () => {},
  allUsers: null,
  // Service management
  addService: () => {},
  updateService: () => {},
  removeService: () => {},

  // Appointment management
  addAppointment: () => {},
  updateAppointment: () => {},
  removeAppointment: () => {},
  loadingServices: false,
  patients: [],
  services: [],
  chiropractors: [],
  appointments: [],
  users: [],
  sendRequestFacilityServices: async () => {},
};
