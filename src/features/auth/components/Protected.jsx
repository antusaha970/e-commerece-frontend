import { useSelector } from "react-redux";
import { selectLoggedInUser, selectUserChecking } from "../authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const location = useLocation();
  const userChecked = useSelector(selectUserChecking);

  useEffect(() => {
    if (!user && userChecked) {
      navigate("/login", { replace: true, state: { from: location.pathname } });
    }
  }, [user, navigate, location, userChecked]);

  return children;
};

export default Protected;
