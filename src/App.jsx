import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import Layout from "./layouts/Layout";
// Pages
import Profile from "./pages/Profile/Profile";
import UserForm from "./pages/UserForm/UserForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import Vendors from "./pages/Vendors/Vendors";
import CreateAdmin from "./pages/Admin/CreateAdmin";
import AdminList from "./pages/Admin/AdminList";
import CarListing from "./pages/CarListing/CarListing";
import CarSettingsForm from "./pages/Setting/CarSettingsForm";
import AddLocations from "./pages/Setting/AddLocation";
import EmailTemplate from "./pages/Setting/EmailTemplate";

// Authentication
import Signin from "./pages/Authentication/Signin";
import ResetPassword from "./pages/Authentication/ResetPassword";
import ForgetPassword from "./pages/Authentication/ForgetPassword";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes  */}
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/reset-pass" element={<ResetPassword />} />
        <Route
          path="/unauthorized"
          element={<h2 className="NotAuthorized">🚫 Not Authorized 404</h2>}
        />
        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRole={1}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="user-form" element={<UserForm />} />
          <Route path="cars-list" element={<CarListing />} />
          <Route path="vendors-list" element={<Vendors />} />
          <Route path="admin-list" element={<AdminList />} />
          <Route path="admin-create" element={<CreateAdmin />} />
          <Route path="carsettingsform" element={<CarSettingsForm />} />
          <Route path="locations" element={<AddLocations />} />
          <Route path="email-template" element={<EmailTemplate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
