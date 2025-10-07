import AppRoutes from './routes/Routes';
import { Provider as SnackbarProvider } from './context/SnackbarContext';
import { Provider as AuthProvider } from './context/AuthContext';
import { UserFacilitiesProvider } from './context/UserFacilitiesContext';

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <UserFacilitiesProvider>
          <AppRoutes />
        </UserFacilitiesProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
