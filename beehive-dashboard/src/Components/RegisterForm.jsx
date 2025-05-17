import Logo from "../Assets/logos.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import "../Styles/Pages/SignIn.scss";

function RegisterForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Check password match live
    if (id === "password_confirmation" || id === "password") {
      setPasswordMatch(
        id === "password_confirmation"
          ? value === formData.password
          : formData.password_confirmation === value
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!passwordMatch) return;

    const success = await register(formData);
    if (success !== false) {
      navigate("/dashboard");
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <form className="login_right" onSubmit={handleRegister}>
        <Link to="/">
          <img src={Logo} alt="Logo" className="signin-logo" />
        </Link>
        <h3>Create your account</h3>
        <div className="inputs">
          <div className="input">
            <div className="email-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input
              type="text"
              id="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="input">
            <div className="email-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input
              type="text"
              id="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>

          <div className="input">
            <div className="email-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <div className="email-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <div className="email-icon">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={toggleShowPassword}
            />
          </div>

          <div className="input">
            <div className="email-icon">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              type="password"
              id="password_confirmation"
              placeholder="Confirm Password"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
        </div>

        <div className="signin-button">
          <button type="submit">SIGN UP</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
