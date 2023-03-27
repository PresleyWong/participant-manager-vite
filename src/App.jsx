import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Events from "./pages/Events";
import Participants from "./pages/Participants";
import Users from "./pages/Users";
import Missing from "./pages/Missing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import EventDetail from "./pages/EventDetail";
import Signup from "./pages/Signup";
import "./App.css";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Missing />} />
          <Route
            path="/events"
            element={
              <PrivateRoute isAllowed={!!user}>
                <Events />
              </PrivateRoute>
            }
          />
          <Route
            path="/events/:eventId"
            element={
              <PrivateRoute isAllowed={!!user}>
                <EventDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAllowed={!!user}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/participants"
            element={
              <PrivateRoute isAllowed={!!user}>
                <Participants />
              </PrivateRoute>
            }
          />

          <Route
            path="/users"
            element={
              <PrivateRoute isAllowed={!!user && user.isAdmin}>
                <Users />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
