import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const avatar = params.get("avatar");
    const birthday = params.get("birthday");
    const gender = params.get("gender");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, avatar, birthday, gender }));
      navigate("/profile");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleSuccess;
