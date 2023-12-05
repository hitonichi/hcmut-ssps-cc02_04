import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import Homepage from './pages/Homepage';
import ProtectedLayout from './components/ProtectedLayout';
import HomeLayout from './components/HomeLayout';
import Printing from './pages/Printing';
import Records from './pages/Records';
import PrinterManagement from './pages/PrinterManagement';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import PoliciesPage from './pages/Policies';
import PrinterInformation from './pages/PrinterInformation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/actions/authActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('[App.js] fetching user');
    dispatch(fetchUser());
  }, []);

  return (
    <div>
      <Routes>
        {/* TODO: implement a not-found page */}
        <Route path="*" element={<NotFound />} />

        {/* routes when not logged in */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* routes after login */}
        <Route path="/dashboard" element={<ProtectedLayout />}>
          <Route
            path="profile"
            element={
              <div className="h-[100vh] bg-slate-300">This is Profile Page</div>
            }
          />
          <Route path="printing" element={<Printing />} />
          <Route path="printers" element={<PrinterManagement />} />
          <Route path="printers/:_id" element={<PrinterInformation />} />
          <Route path="records" element={<Records />} />
          <Route
            path="management"
            element={<div>This is Management Page</div>}
          />
          <Route
            path="policies"
            element={
              <ProtectedRoute allowedRoles={['spso']}>
                <PoliciesPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
