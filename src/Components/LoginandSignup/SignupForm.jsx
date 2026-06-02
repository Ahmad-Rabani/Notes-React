import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import {
  AuthForm,
  BrandMark,
  ErrorMessage,
  FieldGroup,
  FormSubtitle,
  FormTitle,
  Input,
  Label,
  PrimaryButton,
} from "./authPageStyles";

const getSignupErrorMessage = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/operation-not-allowed":
      return "Email sign-up is not enabled for this app.";
    default:
      return "Unable to create account. Please try again.";
  }
};

const SignupForm = ({ onSwitchToLogin, isActive }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    createUserWithEmailAndPassword(auth, email.trim(), password)
      .then((value) => {
        console.log(value);
        onSwitchToLogin();
      })
      .catch((err) => {
        setError(getSignupErrorMessage(err.code));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <AuthForm onSubmit={handleSubmit} noValidate aria-hidden={!isActive}>
      <BrandMark aria-hidden="true">
        <span />
        Notes
      </BrandMark>
      <FormTitle id="signup-heading">Create account</FormTitle>
      <FormSubtitle>Start organizing your ideas today</FormSubtitle>

      {error && (
        <ErrorMessage role="alert" aria-live="polite">
          {error}
        </ErrorMessage>
      )}

      <FieldGroup>
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={Boolean(error)}
          disabled={isSubmitting}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          aria-invalid={Boolean(error)}
          disabled={isSubmitting}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="signup-confirm-password">Confirm password</Label>
        <Input
          id="signup-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          aria-invalid={Boolean(error)}
          disabled={isSubmitting}
        />
      </FieldGroup>

      <PrimaryButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating account…" : "Sign Up"}
      </PrimaryButton>
    </AuthForm>
  );
};

export default SignupForm;
