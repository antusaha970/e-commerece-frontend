import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { selectLoggedInUser } from "../authSlice";

/* eslint-disable react/prop-types */
const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
    if (user && user.role === "user") {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return children;
};

export default ProtectedAdmin;
