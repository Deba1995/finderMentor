import React from "react";
import Auth from "./components/auth/Auth";
import Home from "./components/Home";
import PrivateRoutes from "./utils/PrivateRoutes";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Profile from "./components/Pages/Profile/Profile";
import SuggestedProfile from "./components/Pages/Profile/SuggestedProfile";
import FeedbackForm from "./components/Pages/Form/FeedBackForm";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<SuggestedProfile />} path="/suggestedProfile/:id" />
          <Route element={<FeedbackForm />} path="/feedback" />
        </Route>
        <Route element={<Auth />} path="/auth" />
      </Routes>
    </Router>
  );
};

export default App;
