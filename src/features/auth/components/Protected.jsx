import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return children;
};

export default Protected;
