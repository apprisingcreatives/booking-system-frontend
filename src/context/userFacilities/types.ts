import { User, UserRole, Facility, Service, Chiropractor } from '../../models';
import { Appointment } from '../../models/appointments';
import {
  SET_FACILITIES_LOADING,
  SET_FACILITIES_ERROR,
  SET_USER_FACILITIES,
  SET_FACILITY_PATIENTS,
  SET_FACILITY_SERVICES,
  SET_FACILITY_STAFF,
  SET_FACILITY_APPOINTMENTS,
  SET_FACILITY_USERS,
  CLEAR_FACILITIES_DATA,
  SET_SELECTED_FACILITY,
  UPDATE_FACILITY_SERVICE,
  ADD_FACILITY_SERVICE,
  REMOVE_FACILITY_SERVICE,
  UPDATE_FACILITY_APPOINTMENT,
  ADD_FACILITY_APPOINTMENT,
  REMOVE_FACILITY_APPOINTMENT,
} from './constants';

export interface FacilityData {
  facility: Facility;
  patients?: User[];
  services?: Service[];
  staff?: Chiropractor[];
  appointments?: Appointment[];
  users?: User[]; // Only for client_admin role
}

export interface UserFacilitiesState {
  currentFacilityData: FacilityData | null; // Changed from facilities array to a single object
  selectedFacility: FacilityData | null;
  loading: boolean;
  error: string;
  userRole: UserRole | null;

  // Actions
  loadUserFacilitiesData: (facilityId: string) => Promise<void>;
  loadFacilityData: (facilityId: string) => Promise<void>;
  setSelectedFacility: (facility: FacilityData | null) => void;
  clearFacilitiesData: () => void;

  // SuperAdmin specific methods
  getAllFacilities: () => Promise<void>;
  getAllUsers: () => Promise<void>;
  allUsers: User[] | null;

  // Service management
  addService: (facilityId: string, service: Service) => void;
  updateService: (
    facilityId: string,
    serviceId: string,
    service: Partial<Service>
  ) => void;
  removeService: (facilityId: string, serviceId: string) => void;

  // Appointment management
  addAppointment: (facilityId: string, appointment: Appointment) => void;
  updateAppointment: (
    facilityId: string,
    appointmentId: string,
    appointment: Partial<Appointment>
  ) => void;
  removeAppointment: (facilityId: string, appointmentId: string) => void;
  fetchFacility: (facilityId: string) => void;
  facilityLoading: boolean;
  facilityErrorMessage: string;
  currentFacility: Facility | null;
  loadingServices: boolean;
  patients: User[];
  services: Service[];
  chiropractors: Chiropractor[] | null;
  appointments: Appointment[] | null;
  users: User[];
  sendRequestFacilityServices: (facilityId: string) => Promise<void>;
}

export type UserFacilitiesAction =
  | { type: typeof SET_FACILITIES_LOADING; payload: { loading: boolean } }
  | { type: typeof SET_FACILITIES_ERROR; payload: { error: string } }
  | {
      type: typeof SET_USER_FACILITIES;
      payload: { currentFacilityData: FacilityData | null; userRole: UserRole };
    }
  | {
      type: typeof SET_FACILITY_PATIENTS;
      payload: { facilityId: string; patients: User[] };
    }
  | {
      type: typeof SET_FACILITY_SERVICES;
      payload: { facilityId: string; services: Service[] };
    }
  | {
      type: typeof SET_FACILITY_STAFF;
      payload: { facilityId: string; staff: Chiropractor[] };
    }
  | {
      type: typeof SET_FACILITY_APPOINTMENTS;
      payload: { facilityId: string; appointments: Appointment[] };
    }
  | {
      type: typeof SET_FACILITY_USERS;
      payload: { facilityId: string; users: User[] };
    }
  | {
      type: typeof SET_SELECTED_FACILITY;
      payload: { facility: FacilityData | null };
    }
  | { type: typeof CLEAR_FACILITIES_DATA }
  | {
      type: typeof ADD_FACILITY_SERVICE;
      payload: { facilityId: string; service: Service };
    }
  | {
      type: typeof UPDATE_FACILITY_SERVICE;
      payload: {
        facilityId: string;
        serviceId: string;
        service: Partial<Service>;
      };
    }
  | {
      type: typeof REMOVE_FACILITY_SERVICE;
      payload: { facilityId: string; serviceId: string };
    }
  | {
      type: typeof ADD_FACILITY_APPOINTMENT;
      payload: { facilityId: string; appointment: Appointment };
    }
  | {
      type: typeof UPDATE_FACILITY_APPOINTMENT;
      payload: {
        facilityId: string;
        appointmentId: string;
        appointment: Partial<Appointment>;
      };
    }
  | {
      type: typeof REMOVE_FACILITY_APPOINTMENT;
      payload: { facilityId: string; appointmentId: string };
    };
