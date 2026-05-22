import { color } from "motion/react";
import "../styling/Login.css";

import GridAuth from "../components/GridAuth";
import { useAuth } from "../components/AuthManager";

import React, { useState, useEffect } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import StepperLogin, { Step } from "../components/StepperLogin";
import StepperRegister from "../components/StepperRegister";
import FormGroup from "react-bootstrap/esm/FormGroup";

const Login = () => {
  const API = "http://localhost:5000/api/users";
  const navigate = useNavigate();

  const { Login } = useAuth();
  const gridAuthChildRef = useRef();

  const [isSigning, setSigning] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const authCodeRef = useRef(null);
  const [url, setUrl] = useState(null);

  const [repass, setRepass] = useState(null);

  const [emailEntered, setEmailEntered] = useState(null);
  const [passwordEntered, setPasswordEntered] = useState(null);

  const ClearInputs = () => {
    setName(null);
    setSigning(true);
    setSurname(null);
    setEmail(null);
    setPassword(null);
    setRepass(null);
    authCodeRef.current = null;
    setEmailEntered(null);
    setPasswordEntered(null);
    setUrl(null);
  };

  const RegisterCheck = (step) => {
    switch (step) {
      case 1:
        if ([name, surname, email].some((val) => !val)) {
          return [false, "Please fill in all the fields to proceed."];
        } else if (!email.includes("@")) {
          return [false, "Please enter a valid email."];
        } else {
          return [true, ""];
        }
        break;

      case 2:
        if ([password, repass].some((val) => !val)) {
          return [false, "Please fill in all the fields to proceed."];
        } else if (password.length < 6 || password.length < 6) {
          return [false, "Password must be at least 6 characters long"];
        } else if (password != repass) {
          return [false, "Passwords don't match."];
        } else {
          return [true, ""];
        }
        break;

      case 3:
        let pattern = gridAuthChildRef.current.RunSave();

        if (!pattern) {
          return [false, "Please create a pattern."];
        } else if (pattern.length < 4) {
          return [false, "Please select at minimum of four squares"];
        } else {
          authCodeRef.current = pattern;
          return [true, ""];
        }
        break;

      case 4:
        if (!url) {
          return [false, "Please add your GIFs URL"];
        } else {
          return [true, ""];
        }
        break;

      default:
        break;
    }
  };

  const RegisterSubmit = async () => {
    try {

      const res = await fetch(API + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          password: password,
          authCode: authCodeRef.current,
          gif: url,
        }),
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.message);
      }
      const saved = await res.json();
    } catch (e) {
      console.log({ msg: e.message, type: "error" });
    } finally {
      navigate("/");
      ClearInputs();
    }
  };

  const LoginSubmit = async () => {
    try {
      const res = await fetch(API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailEntered,
          password: passwordEntered,
          authCode: authCodeRef.current,
        }),
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.message);
      }

      const data = await res.json();

      Login({ name: data.name, url: data.url }, data.token);
    } catch (e) {
      console.log({ msg: e.message, type: "error" });
    } finally {
      ClearInputs();
      navigate("/");
    }
  };

  const LoginCheck = (step) => {
    switch (step) {
      case 1:
        if ([emailEntered, passwordEntered].some((val) => !val)) {
          return [false, "Please fill in all the fields to proceed."];
        } else if (!emailEntered.includes("@")) {
          return [false, "Please enter a valid email."];
        } else {
          return [true, ""];
        }
        break;

      case 2:
        let pattern = gridAuthChildRef.current.RunSave();

        if (!pattern) {
          return [false, "Please create a pattern."];
        } else if (pattern.length < 4) {
          return [false, "Please select at minimum of four squares"];
        } else {
          authCodeRef.current = pattern;
          return [true, ""];
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {isSigning ? (
        <StepperRegister
          initialStep={1}
          backButtonText="Previous"
          nextButtonText="Next"
          _setSigning={setSigning}
          _Submit={RegisterSubmit}
          _checkStep={RegisterCheck}
        >
          <Step>
            <Form>
              <FormGroup className="mb-4">
                <Form.Label className="sign-in-labels col-12">Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label className="sign-in-labels col-12">
                  Surname
                </Form.Label>
                <Form.Control
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Your surname"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label className="sign-in-labels col-12">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                />
              </FormGroup>
            </Form>
          </Step>

          <Step>
            <Form>
              <FormGroup className="mb-4">
                <Form.Label className="sign-in-labels col-12">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password: minimum 6 characters"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label className="sign-in-labels col-12">
                  Re-enter Password
                </Form.Label>
                <Form.Control
                  type="password"
                  value={repass}
                  onChange={(e) => setRepass(e.target.value)}
                  placeholder="Confirm password"
                />
              </FormGroup>
            </Form>
          </Step>

          <Step>
            <GridAuth
              ref={gridAuthChildRef}
              _text={["Create your pattern", "Minimum four squares"]}
            />
          </Step>

          <Step>
            <Form>
              <FormGroup className="mb-4">
                <Form.Label className="sign-in-labels col-12">
                  Your GIFs URL
                </Form.Label>
                <Form.Control
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="http://cool_gif_place"
                />
              </FormGroup>
            </Form>
          </Step>
        </StepperRegister>
      ) : (
        <StepperLogin
          _setSigning={setSigning}
          _checkStep={LoginCheck}
          _Submit={LoginSubmit}
        >
          <Step>
            <h1 id="login-header" className="mb-4">
              WELCOME BACK
            </h1>
            <Form id="login-form-container">
              <FormGroup className="mb-4">
                <Form.Label className="sign-in-labels col-12">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={emailEntered}
                  onChange={(e) => setEmailEntered(e.target.value)}
                  placeholder="Your email"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label className="sign-in-labels col-12">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  value={passwordEntered}
                  onChange={(e) => setPasswordEntered(e.target.value)}
                  placeholder="Your password"
                />
              </FormGroup>
            </Form>
          </Step>

          <Step>
            <GridAuth
              ref={gridAuthChildRef}
              _text={["Enter your pattern", ""]}
            />
          </Step>
        </StepperLogin>
      )}
    </>
  );
};

export default Login;
