import { Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./pages/products/Products";
import Product_detail from "./pages/product_detail/Product_detail";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/add"
          element={
            <Layout>
              <AddProduct />
            </Layout>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Layout>
              <EditProduct />
            </Layout>
          }
        />
        <Route
          path="/:id"
          element={
            <Layout>
              <Product_detail />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
