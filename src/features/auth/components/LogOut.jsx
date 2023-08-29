import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(signOutAsync());
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [dispatch, user, navigate]);

  return <div>Wait</div>;
};

export default LogOut;
