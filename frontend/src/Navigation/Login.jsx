import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../hooks/AuthProvider";
import { Validation } from "../functions/Validation";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  document.title = "Login";
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const { loggedIn, username, message, login, logout } =
    useContext(AuthContext);
  const [fields, setFields] = useState([
    {
      type: "text",
      name: "username",
      value: "",
      validations: [
        {
          rule: (value) => value.length > 0,
          message: "Username is required",
        },
      ],
    },
    {
      type: "password",
      name: "password",
      value: "",
      validations: [
        {
          rule: (value) => value.length > 0,
          message: "Password is required",
        },
        {
          rule: (value) => value.length < 10,
          message: "Password less than 10 characters",
        },
      ],
    },
  ]);
  const [errors, setErrors] = useState({});
  const handleLogin = async () => {
    // Reset errors
    setErrors({});
    // Perform form validation using Validation component
    const validationErrors = Validation({ fields });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = fields.reduce((data, field) => {
      data[field.name] = field.value;
      return data;
    }, {});    
    try {
      login(formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index].value = value;
      return updatedFields;
    });
  };
  return (
    <>
      <section style={{ paddingBlock: "5rem" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-5 ps-0 d-none d-md-block bg-dark">
                      Login sdfdsfdsfdsf
                  </div>
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <h3 className="mb-3">Login Now</h3>
                      {response && (
                        <span className="error">{response.message}</span>
                      )}
                      <form className="row g-4">
                        {fields?.map((field, index) => (
                          <div key={field.name} className="col-12">
                            {errors[field.name] && (
                              <div className="bg-danger p-2 rounded mb-2">
                                <span className="error">
                                  {errors[field.name].join(", ")}
                                </span>
                              </div>
                            )}
                            <label className="form-label">
                              {field.name.charAt(0).toUpperCase() +
                                field.name.slice(1)}
                              :
                            </label>
                            <div className="input-group">
                              <div className="input-group-text">
                                <i className="bi bi-person-fill"></i>
                              </div>
                              <input
                                type={field.type}
                                autoComplete="off"
                                className="form-control"
                                name={field.name}
                                value={field.value}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>
                          </div>
                        ))}
                        <div className="col-12">
                          <p>
                            Don't have an account?{" "}
                            <span>
                              <Link to={"/register"}>Sign up now!</Link>
                            </span>{" "}
                          </p>
                          <button
                            type="button"
                            className="btn btn-primary px-4 float-end mt-4"
                            onClick={handleLogin}
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
