import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
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

const getLoginErrorMessage = (code) => {
  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Your email or password is incorrect.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return "Unable to sign in. Please try again.";
  }
};

const LoginForm = ({ isActive }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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

    setIsSubmitting(true);

    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(() => {
        navigate("/home", { replace: true });
        localStorage.setItem("userLoggedIn", email.trim());
      })
      .catch((err) => {
        setError(getLoginErrorMessage(err.code));
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
      <FormTitle id="login-heading">Welcome back</FormTitle>
      <FormSubtitle>Sign in to access your notes</FormSubtitle>

      {error && (
        <ErrorMessage role="alert" aria-live="polite">
          {error}
        </ErrorMessage>
      )}

      <FieldGroup>
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
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
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          aria-invalid={Boolean(error)}
          disabled={isSubmitting}
        />
      </FieldGroup>

      <PrimaryButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Login"}
      </PrimaryButton>
    </AuthForm>
  );
};

export default LoginForm;
