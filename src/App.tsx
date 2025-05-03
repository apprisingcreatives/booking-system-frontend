import AppRoutes from "./routes/Routes";
import { Provider as SnackbarProvider } from "./context/SnackbarContext";
import { Provider as AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
