import { color } from "motion/react";
import "../styling/Login.css";

import GridAuth from "../components/GridAuth";

import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Stepper, { Step } from "../components/Stepper";
import FormGroup from "react-bootstrap/esm/FormGroup";

const Login = ({ _isLogin, _setLogin }) => {
  const [isSigning, setSigning] = useState(false);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const [repass, setRepass] = useState(null);

  const change = () => {
    setSigning(true);
  };

  console.log(_isLogin);
  console.log("Signing in " + isSigning);

  return (
    <>
      {isSigning ? (
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Previous"
          nextButtonText="Next"
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
                <Form.Label className="sign-in-labels col-12">Surname</Form.Label>
                <Form.Control
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Your surname"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label className="sign-in-labels col-12">Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label className="sign-in-labels col-12">Username</Form.Label>
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
                <Form.Label className="sign-in-labels col-12">Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label className="sign-in-labels col-12">Re-enter Password</Form.Label>
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
            <GridAuth/>
          </Step>
        </Stepper>
      ) : (
        <div
          id="login-container"
          className="d-flex flex-column align-items-center"
        >
          <h1 id="login-header" className="mb-4">
            WELCOME BACK
          </h1>
          <Form
            id="login-form-container"
            className="col-12 d-flex flex-column align-items-center mb-4"
          >
            <FormGroup className="col-10 mb-4">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" />
            </FormGroup>

            <FormGroup className="col-10 mb-5">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </FormGroup>

            <Button
              id="login-btn"
              className="col-6"
              variant="primary"
              type="submit"
            >
              Log in
            </Button>
          </Form>

          <Button id="sign-in-tag" className="col-12" onClick={change}>
            Don't have an account: register here
          </Button>
        </div>
      )}
    </>
  );
};

export default Login;
