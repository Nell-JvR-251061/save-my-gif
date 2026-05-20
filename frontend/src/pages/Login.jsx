import { color } from "motion/react";
import "../styling/Login.css";

import GridAuth from "../components/GridAuth";

import React, { useState } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import StepperLogin, { Step } from "../components/StepperLogin";
import StepperRegister from "../components/StepperRegister";
import FormGroup from "react-bootstrap/esm/FormGroup";

const Login = ({ _isLogin, _setLogin, _userInitial, _setGif }) => {
  const API = "http://localhost:5000/api/users";
  const navigate = useNavigate();

  const gridAuthChildRef = useRef();

  const [isSigning, setSigning] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [authCode, setAuthCode] = useState(null);
  const [url, setUrl] = useState(null);

  const [repass, setRepass] = useState(null);

  const [usernameEntered, setUsernameEntered] = useState(null);
  const [passwordEntered, setPasswordEntered] = useState(null);

  const ClearInputs = () => {
    setName(null);
    setSigning(true);
    setSurname(null);
    setUsername(null);
    setEmail(null);
    setPassword(null);
    setRepass(null);
    setUsernameEntered(null);
    setPasswordEntered(null);
    setUrl(null);
  };

  const RegisterSubmit = async () => {
    console.log("Submitted!");
    console.log(authCode);

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          surname: surname,
          username: username,
          email: email,
          password: password,
          authCode: authCode,
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
      _setGif(url);
      _setLogin(true);
      _userInitial(name[0]);
      navigate("/display");
      ClearInputs();
    }
  };

  const RegisterCheck = (step) => {
    switch (step) {
      case 1:
        if ([name, surname, username, email].some((val) => !val)) {
          return [false, "Please fill in all the fields to proceed."];
        } else {
          return [true, ""];
        }
        break;
      case 2:
        if ([password, repass].some((val) => !val)) {
          return [false, "Please fill in all the fields to proceed."];
        } else if(password != repass){
          return [false, "Passwords don't match."];
        }
        else{
          return [true, ""];
        }
        break;
      case 3:
        let code = gridAuthChildRef.current.RunSave();
        console.log(code);

        if (!code) {
          return [false, "Please create a pattern."];
        } else {
          setAuthCode(code);
          console.log(authCode);
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

  return (
    <>
      {isSigning ? (
        <StepperRegister
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
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
                <Form.Label className="sign-in-labels col-12">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
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
                  placeholder="Create a password"
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
            <GridAuth ref={gridAuthChildRef} _text={"Create a pattern"} />
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
        <StepperLogin _setSigning={setSigning}>
          <Step>
            <h1 id="login-header" className="mb-4">
              WELCOME BACK
            </h1>
            <Form id="login-form-container">
              <FormGroup className="mb-4">
                <Form.Label className="sign-in-labels col-12">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  value={usernameEntered}
                  onChange={(e) => setUsernameEntered(e.target.value)}
                  placeholder="Your username"
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
            <GridAuth ref={gridAuthChildRef} _text={"Enter your pattern"} />
          </Step>
        </StepperLogin>
      )}
    </>
  );
};

export default Login;
