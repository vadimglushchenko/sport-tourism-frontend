import React, {useState} from "react";
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import {useFormFields} from "../libs/hooksLib";
import "./Signup.css";
import {API, Auth} from "aws-amplify";

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    userName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
        fields.email.length > 0 &&
        fields.userName.length > 0 &&
        fields.phoneNumber.length > 0 &&
        fields.password.length >= 8 &&
        fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        email: fields.userName,
        phone_number: fields.phoneNumber,
        password: fields.password
      });
      await createUser(fields);

      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  function createUser(user) {
    return API.post("sport_tourism", "/addUser", {
      body: user
    });
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
        <form onSubmit={handleConfirmationSubmit}>
          <FormGroup controlId="confirmationCode" bsSize="large">
            <ControlLabel>Confirmation Code</ControlLabel>
            <FormControl
                autoFocus
                type="tel"
                onChange={handleFieldChange}
                value={fields.confirmationCode}
            />
            <HelpBlock>Please check your email for the code.</HelpBlock>
          </FormGroup>
          <LoaderButton
              block
              type="submit"
              bsSize="large"
              isLoading={isLoading}
              disabled={!validateConfirmationForm()}
          >
            Verify
          </LoaderButton>
        </form>
    );
  }

  function renderForm() {
    return (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
                autoFocus
                type="email"
                value={fields.email}
                onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
                autoFocus
                type="text"
                value={fields.userName}
                onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="phone_number" bsSize="large">
            <ControlLabel>Phone number</ControlLabel>
            <FormControl
                autoFocus
                type="phone"
                value={fields.phoneNumber}
                onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password (Password must be longer than 7 symbols,
              contain upper case and lower case letters,
              a number and a special symbol)</ControlLabel>
            <FormControl
                type="password"
                value={fields.password}
                onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
                type="password"
                onChange={handleFieldChange}
                value={fields.confirmPassword}
            />
          </FormGroup>
          <LoaderButton
              block
              type="submit"
              bsSize="large"
              isLoading={isLoading}
              disabled={!validateForm()}
          >
            Signup
          </LoaderButton>
        </form>
    );
  }

  return (
      <div className="Signup">
        {newUser === null ? renderForm() : renderConfirmationForm()}
      </div>
  );
}
