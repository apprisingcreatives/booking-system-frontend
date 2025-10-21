/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useReducer,
} from 'react';

import { ApiErrorResponse } from '../models/common/apiResponse';
import useGetFacilityPatients from '../hooks/useGetFacilityPatients';
import useGetFacilityServices from '../hooks/useGetFacilityServices';
import useGetFacilityChiropractors from '../hooks/useGetFacilityChiropractors';
import useGetFacilityAppointments from '../hooks/useGetFacilityAppointments';
import useGetFacilityUsers from '../hooks/useGetFacilityUsers';

import {
  SET_FACILITIES_LOADING,
  SET_FACILITIES_ERROR,
  SET_SELECTED_FACILITY,
  CLEAR_FACILITIES_DATA,
  ADD_FACILITY_SERVICE,
  UPDATE_FACILITY_SERVICE,
  REMOVE_FACILITY_SERVICE,
  ADD_FACILITY_APPOINTMENT,
  UPDATE_FACILITY_APPOINTMENT,
  REMOVE_FACILITY_APPOINTMENT,
} from './userFacilities/constants';
import { initialState } from './userFacilities/initialState';
import { reducer } from './userFacilities/reducer';
import { UserFacilitiesState, FacilityData } from './userFacilities/types';
import { Service, UserRole } from '../models';
import { Appointment } from '../models/appointments';
import { useAuth, useGetAllUsers, useGetFacility } from '../hooks';

export const UserFacilitiesContext =
  createContext<UserFacilitiesState>(initialState);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ProviderProps = {};

export const UserFacilitiesProvider: FC<PropsWithChildren<ProviderProps>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { user } = useAuth();
  const { facilityId, role } = user || {};

  // Initialize hooks
  const { patients, sendRequest: sendRequestFacilityPatients } =
    useGetFacilityPatients();
  const {
    fetchServices: sendRequestFacilityServices,
    services,
    loading: loadingServices,
  } = useGetFacilityServices();
  const { sendRequest: sendRequestFacilityChiropractors, chiropractors } =
    useGetFacilityChiropractors();

  const { appointments, sendRequest: sendRequestFacilityAppointments } =
    useGetFacilityAppointments();
  const { sendRequest: sendRequestFacilityUsers, users } =
    useGetFacilityUsers();

  const { sendRequest: getAllUsers, users: allUsers } = useGetAllUsers();

  const {
    fetchFacility,
    loading: facilityLoading,
    errorMessage: facilityErrorMessage,
    facility: currentFacility,
  } = useGetFacility();

  const setLoading = (loading: boolean) => {
    dispatch({ type: SET_FACILITIES_LOADING, payload: { loading } });
  };

  const setError = (error: string) => {
    dispatch({ type: SET_FACILITIES_ERROR, payload: { error } });
  };

  const setSelectedFacility = useCallback((facility: FacilityData | null) => {
    dispatch({ type: SET_SELECTED_FACILITY, payload: { facility } });
  }, []);

  const clearFacilitiesData = useCallback(() => {
    dispatch({ type: CLEAR_FACILITIES_DATA });
  }, []);

  // Load user facilities based on role
  const loadFacilityData = useCallback(
    async (facilityId: string) => {
      setLoading(true);
      setError('');

      try {
        await Promise.all([
          fetchFacility(facilityId),
          sendRequestFacilityServices(facilityId),
          (role === UserRole.ClientAdmin || role === UserRole.ClientUser) &&
            sendRequestFacilityPatients(facilityId),
          sendRequestFacilityChiropractors(facilityId),
          (role === UserRole.ClientAdmin || role === UserRole.ClientUser) &&
            sendRequestFacilityAppointments(facilityId),
          role === UserRole.ClientAdmin && sendRequestFacilityUsers(facilityId),
        ]);
      } catch (error) {
        console.error('Unable to load facility data.', error);
        const err = error as ApiErrorResponse;
        setError(err.data?.message || 'Failed to load facility data');
      } finally {
        setLoading(false);
      }
    },
    [role]
  );

  const addService = useCallback((facilityId: string, service: Service) => {
    dispatch({
      type: ADD_FACILITY_SERVICE,
      payload: { facilityId, service },
    });
  }, []);

  const updateService = useCallback(
    (facilityId: string, serviceId: string, service: Partial<Service>) => {
      dispatch({
        type: UPDATE_FACILITY_SERVICE,
        payload: { facilityId, serviceId, service },
      });
    },
    []
  );

  const removeService = useCallback((facilityId: string, serviceId: string) => {
    dispatch({
      type: REMOVE_FACILITY_SERVICE,
      payload: { facilityId, serviceId },
    });
  }, []);

  // Appointment management functions
  const addAppointment = useCallback(
    (facilityId: string, appointment: Appointment) => {
      dispatch({
        type: ADD_FACILITY_APPOINTMENT,
        payload: { facilityId, appointment },
      });
    },
    []
  );

  const updateAppointment = useCallback(
    (
      facilityId: string,
      appointmentId: string,
      appointment: Partial<Appointment>
    ) => {
      dispatch({
        type: UPDATE_FACILITY_APPOINTMENT,
        payload: { facilityId, appointmentId, appointment },
      });
    },
    []
  );

  const removeAppointment = useCallback(
    (facilityId: string, appointmentId: string) => {
      dispatch({
        type: REMOVE_FACILITY_APPOINTMENT,
        payload: { facilityId, appointmentId },
      });
    },
    []
  );

  useEffect(() => {
    if (facilityId) {
      loadFacilityData(facilityId as string);
    }
  }, [facilityId]);

  return (
    <UserFacilitiesContext.Provider
      value={{
        ...state,
        setSelectedFacility,
        clearFacilitiesData,
        getAllUsers,
        allUsers,
        addService,
        updateService,
        removeService,
        addAppointment,
        updateAppointment,
        removeAppointment,
        fetchFacility,
        facilityLoading,
        facilityErrorMessage,
        currentFacility,
        loadFacilityData,
        loadingServices,
        patients,
        services,
        chiropractors,
        appointments,
        users,
        sendRequestFacilityServices,
      }}
    >
      {children}
    </UserFacilitiesContext.Provider>
  );
};
