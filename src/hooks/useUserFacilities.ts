import { useContext } from 'react';
import { UserFacilitiesContext } from '../context/UserFacilitiesContext';

// Custom hook to use the UserFacilities context
export const useUserFacilities = () => {
  const context = useContext(UserFacilitiesContext);
  if (context === undefined) {
    throw new Error(
      'useUserFacilities must be used within a UserFacilitiesProvider'
    );
  }
  return context;
};
