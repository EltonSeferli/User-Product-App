import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./pages/products/Products";
import Product_detail from "./pages/product_detail/Product_detail";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import Layout from "./components/Layout";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const current_user = JSON.parse(localStorage.getItem("current_user"));
    setIsAuthorized(!!token && !!current_user);
  }, []);

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
                <Products />{" "}
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
                <AddProduct />{" "}
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
                <EditProduct />{" "}
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
                <Product_detail />{" "}
              </ProtectedRoute>
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
