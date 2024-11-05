import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import bgImage from "../Assets/bg.png"; // Import the image

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login successful");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-container">
      {loading && <Spinner />}
      <div className="login-image" style={{ backgroundImage: `url(${bgImage})` }}></div> {/* Set the background inline */}
      <div className="login-form">
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/register">Not a user? Click here to register</Link>
            <button className="btn btn-primary rounded-pill">Login</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
