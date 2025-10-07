import {
  SET_FACILITIES_LOADING,
  SET_FACILITIES_ERROR,
  SET_USER_FACILITIES,
  SET_FACILITY_PATIENTS,
  SET_FACILITY_SERVICES,
  SET_FACILITY_STAFF,
  SET_FACILITY_APPOINTMENTS,
  SET_FACILITY_USERS,
  SET_SELECTED_FACILITY,
  CLEAR_FACILITIES_DATA,
  ADD_FACILITY_SERVICE,
  UPDATE_FACILITY_SERVICE,
  REMOVE_FACILITY_SERVICE,
  ADD_FACILITY_APPOINTMENT,
  UPDATE_FACILITY_APPOINTMENT,
  REMOVE_FACILITY_APPOINTMENT,
} from './constants';
import { UserFacilitiesState, UserFacilitiesAction } from './types';

export const reducer = (
  state: UserFacilitiesState,
  action: UserFacilitiesAction
): UserFacilitiesState => {
  const { type } = action;

  switch (type) {
    case SET_FACILITIES_LOADING: {
      const { loading } = action.payload;
      return { ...state, loading };
    }

    case SET_FACILITIES_ERROR: {
      const { error } = action.payload;
      return { ...state, error, loading: false };
    }

    case SET_USER_FACILITIES: {
      const { currentFacilityData, userRole } = action.payload;
      return {
        ...state,
        currentFacilityData,
        userRole,
        loading: false,
        error: '',
      };
    }

    case SET_SELECTED_FACILITY: {
      const { facility } = action.payload;
      return { ...state, selectedFacility: facility };
    }

    case CLEAR_FACILITIES_DATA: {
      return {
        ...state,
        currentFacilityData: null,
        selectedFacility: null,
        error: '',
        userRole: null,
      };
    }

    case SET_FACILITY_PATIENTS: {
      const { facilityId, patients } = action.payload;
      return {
        ...state,
        currentFacilityData:
          state.currentFacilityData?.facility._id === facilityId
            ? { ...state.currentFacilityData, patients }
            : state.currentFacilityData,
        selectedFacility:
          state.selectedFacility?.facility._id === facilityId
            ? { ...state.selectedFacility, patients }
            : state.selectedFacility,
      };
    }

    case SET_FACILITY_SERVICES: {
      const { facilityId, services } = action.payload;
      return {
        ...state,
        currentFacilityData:
          state.currentFacilityData?.facility._id === facilityId
            ? { ...state.currentFacilityData, services }
            : state.currentFacilityData,
        selectedFacility:
          state.selectedFacility?.facility._id === facilityId
            ? { ...state.selectedFacility, services }
            : state.selectedFacility,
      };
    }

    case SET_FACILITY_STAFF: {
      const { facilityId, staff } = action.payload;
      return {
        ...state,
        currentFacilityData:
          state.currentFacilityData?.facility._id === facilityId
            ? { ...state.currentFacilityData, staff }
            : state.currentFacilityData,
        selectedFacility:
          state.selectedFacility?.facility._id === facilityId
            ? { ...state.selectedFacility, staff }
            : state.selectedFacility,
      };
    }

    case SET_FACILITY_APPOINTMENTS: {
      const { facilityId, appointments } = action.payload;
      return {
        ...state,
        currentFacilityData:
          state.currentFacilityData?.facility._id === facilityId
            ? { ...state.currentFacilityData, appointments }
            : state.currentFacilityData,
        selectedFacility:
          state.selectedFacility?.facility._id === facilityId
            ? { ...state.selectedFacility, appointments }
            : state.selectedFacility,
      };
    }

    case SET_FACILITY_USERS: {
      const { facilityId, users } = action.payload;
      return {
        ...state,
        currentFacilityData:
          state.currentFacilityData?.facility._id === facilityId
            ? { ...state.currentFacilityData, users }
            : state.currentFacilityData,
        selectedFacility:
          state.selectedFacility?.facility._id === facilityId
            ? { ...state.selectedFacility, users }
            : state.selectedFacility,
      };
    }

    case ADD_FACILITY_SERVICE: {
      const { facilityId, service } = action.payload;
      return {
        ...state,
        currentFacilityData:
          state.currentFacilityData?.facility._id === facilityId
            ? {
                ...state.currentFacilityData,
                services: [
                  ...(state.currentFacilityData.services || []),
                  service,
                ],
              }
            : state.currentFacilityData,
        selectedFacility:
          state.selectedFacility?.facility._id === facilityId
            ? {
                ...state.selectedFacility,
                services: [...(state.selectedFacility.services || []), service],
              }
            : state.selectedFacility,
      };
    }

    case UPDATE_FACILITY_SERVICE: {
      const { facilityId, serviceId, service } = action.payload;
      return {
        ...state,
        currentFacilityData:
          state.currentFacilityData?.facility._id === facilityId
            ? {
                ...state.currentFacilityData,
                services: state.currentFacilityData.services?.map((s) =>
                  s._id === serviceId ? { ...s, ...service } : s
                ),
              }
            : state.currentFacilityData,
        selectedFacility:
          state.selectedFacility?.facility._id === facilityId
            ? {
                ...state.selectedFacility,
                services: state.selectedFacility.services?.map((s) =>
                  s._id === serviceId ? { ...s, ...service } : s
                ),
              }
            : state.selectedFacility,
      };
    }

    case REMOVE_FACILITY_SERVICE: {
      const { facilityId, serviceId } = action.payload;
      return {
        ...state,
        currentFacilityData:
          state.currentFacilityData?.facility._id === facilityId
            ? {
                ...state.currentFacilityData,
                services: state.currentFacilityData.services?.filter(
                  (s) => s._id !== serviceId
                ),
              }
            : state.currentFacilityData,
        selectedFacility:
          state.selectedFacility?.facility._id === facilityId
            ? {
                ...state.selectedFacility,
                services: state.selectedFacility.services?.filter(
                  (s) => s._id !== serviceId
                ),
              }
            : state.selectedFacility,
      };
    }

    case ADD_FACILITY_APPOINTMENT: {
      const { facilityId, appointment } = action.payload;
      return {
        ...state,
        currentFacilityData:
          state.currentFacilityData?.facility._id === facilityId
            ? {
                ...state.currentFacilityData,
                appointments: [
                  ...(state.currentFacilityData.appointments || []),
                  appointment,
                ],
              }
            : state.currentFacilityData,
        selectedFacility:
          state.selectedFacility?.facility._id === facilityId
            ? {
                ...state.selectedFacility,
                appointments: [
                  ...(state.selectedFacility.appointments || []),
                  appointment,
                ],
              }
            : state.selectedFacility,
      };
    }

    case UPDATE_FACILITY_APPOINTMENT: {
      const { facilityId, appointmentId, appointment } = action.payload;
      return {
        ...state,
        currentFacilityData:
          state.currentFacilityData?.facility._id === facilityId
            ? {
                ...state.currentFacilityData,
                appointments: state.currentFacilityData.appointments?.map((a) =>
                  a.id === appointmentId ? { ...a, ...appointment } : a
                ),
              }
            : state.currentFacilityData,
        selectedFacility:
          state.selectedFacility?.facility._id === facilityId
            ? {
                ...state.selectedFacility,
                appointments: state.selectedFacility.appointments?.map((a) =>
                  a.id === appointmentId ? { ...a, ...appointment } : a
                ),
              }
            : state.selectedFacility,
      };
    }

    case REMOVE_FACILITY_APPOINTMENT: {
      const { facilityId, appointmentId } = action.payload;
      return {
        ...state,
        currentFacilityData:
          state.currentFacilityData?.facility._id === facilityId
            ? {
                ...state.currentFacilityData,
                appointments: state.currentFacilityData.appointments?.filter(
                  (a) => a.id !== appointmentId
                ),
              }
            : state.currentFacilityData,
        selectedFacility:
          state.selectedFacility?.facility._id === facilityId
            ? {
                ...state.selectedFacility,
                appointments: state.selectedFacility.appointments?.filter(
                  (a) => a.id !== appointmentId
                ),
              }
            : state.selectedFacility,
      };
    }

    default:
      return state;
  }
};
