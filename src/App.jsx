import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Layouts 
import Layout from "././layouts/Layout";
// Pages 
import Profile from "././pages/Profile/Profile";
import UserForm from "././pages/UserForm/UserForm";
import Details from "././pages/DetailsForm/DetailsForm";
import AdminDashboard from "././pages/AdminDashboard/AdminDashboard";
import StatesList from "././pages/States/StatesList";
import Dashboard from "././pages/Dashboard/Dashboard";

import CountryList from "./pages/Country/CountryList";
import AddCountry from "./pages/Country/AddCountry";
import AddStates from "./pages/States/AddStates";
import CityList from "./pages/City/CityList";
import AddCity from "./pages/City/AddCity";
import Vendors from "./pages/Vendors/Vendors";
import CreateAdmin from "./pages/Admin/CreateAdmin";
import AdminList from "./pages/Admin/AdminList";
import Signup from "./pages/Authentication/Signup";
import Signin from "./pages/Authentication/Signin";
import CarListing from "./pages/CarListing/CarListing";
import CarSettingsForm from "./pages/Setting/CarSettingsForm";
import AddLocations from "./pages/Setting/AddLocation";
import EmailTemplate from "./pages/Setting/EmailTemplate";







function App() {
  return (
 <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/cars-list" element={<CarListing />} />
          {/* <Route path="/admin-car" element={<CarListing />} /> */}
          <Route path="/states-list" element={<StatesList />} />
          <Route path="/country-list" element={<CountryList />} />
          <Route path="/add-country" element={<AddCountry />} />
          <Route path="/add-states" element={<AddStates />} /> 
          <Route path="/city-list" element={<CityList />} /> 
          <Route path="/add-city" element={<AddCity />} />         
          <Route path="/vendors-list" element={<Vendors />} />         
          <Route path="/admin-list" element={<AdminList />} />         
          <Route path="/admin-create" element={<CreateAdmin />} /> 
          <Route path="/sign-up" element={<Signup />} />         
          <Route path="/sign-in" element={<Signin />} />         
          {/* Redirect old routes to new ones */}
          <Route path="/sing-up" element={<Navigate to="/sign-up" replace />} />
          <Route path="/sing-in" element={<Navigate to="/sign-in" replace />} />
          <Route path="/carsettingsform" element={<CarSettingsForm />} />
          <Route path="/locations" element={<AddLocations />} />
          <Route path="/email-template" element={<EmailTemplate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
