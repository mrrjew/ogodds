import React, { useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import "@radix-ui/themes/styles.css";
import About from "./components/About";
import Premium from "./components/Premium";
import Contact from "./components/Contact";
import AdminCreate from "./components/auth/AdminCreateSlip";
import AdminEdit from "./components/auth/AdminEdit";
import AdminPage from "./components/auth/AdminPage";
import Navbar from "./components/utils/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/utils/Footer";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { GetUser } from "./redux/auth/auth.reducer";
import {ToastContainer} from "react-toastify"

const App: React.FC = () => {
  // check if user is logged in

  //user
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          console.log("user");
          await dispatch(GetUser(token));
        }
      } catch (e) {
        console.log(e);
        throw new Error("error creating session");
      }
    };

    fetchData();
  }, []);

  return (
    <React.StrictMode>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/vip" element={<Premium />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/adminEdit" element={<AdminEdit />} />
        <Route path="/adminCreate" element={<AdminCreate />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
              {/* react toastify */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />v
    </React.StrictMode>
  );
};

export default App;
