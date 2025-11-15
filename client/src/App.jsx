import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Layout from "./components/Layout";
import { useState } from "react";
import { useEffect } from "react";
import Contacts from "./pages/contacts/Contacts";
import AddContact from "./pages/contacts/AddContact";
import EditContact from "./pages/contacts/EditContact";
import Contact_detail from "./pages/contact_detail/Contact_detail";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const current_user = JSON.parse(localStorage.getItem("current_user"));
    setIsAuthorized(!!token && !!current_user);
  }, [location]);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthorized) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const GuestRoute = ({ children }) => {
    if (isAuthorized) {
      return <Navigate to="/" />;
    }
    return children;
  };
  return (
    <>
      <Routes>
        {" "}
        <Route
          path="/login"
          element={
            <Layout isAuthorized={isAuthorized}>
              <GuestRoute>
                <Login />
              </GuestRoute>
            </Layout>
          }
        />{" "}
        <Route
          path="/register"
          element={
            <Layout isAuthorized={isAuthorized}>
              {" "}
              <GuestRoute>
                <Register />{" "}
              </GuestRoute>
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout isAuthorized={isAuthorized}>
              {" "}
              <ProtectedRoute>
                <Contacts />{" "}
              </ProtectedRoute>
            </Layout>
          }
        />{" "}
        <Route
          path="/add"
          element={
            <Layout isAuthorized={isAuthorized}>
              {" "}
              <ProtectedRoute>
                <AddContact />{" "}
              </ProtectedRoute>
            </Layout>
          }
        />{" "}
        <Route
          path="/edit/:id"
          element={
            <Layout isAuthorized={isAuthorized}>
              {" "}
              <ProtectedRoute>
                <EditContact />{" "}
              </ProtectedRoute>
            </Layout>
          }
        />{" "}
        <Route
          path="/:id"
          element={
            <Layout isAuthorized={isAuthorized}>
              {" "}
              <ProtectedRoute>
                <Contact_detail />{" "}
              </ProtectedRoute>
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
