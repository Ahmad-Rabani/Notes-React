import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import {
  AuthCard,
  CardInner,
  FormPanel,
  FormSection,
  FormsSlider,
  GhostButton,
  MobileToggle,
  OverlayPanel,
  OverlaySection,
  OverlaySlider,
  OverlayText,
  OverlayTitle,
  PageWrapper,
} from "./authPageStyles";

const LoginSignupPage = ({ defaultView = "login" }) => {
  const [isSignup, setIsSignup] = useState(defaultView === "signup");
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("userLoggedIn");
    if (isUserLoggedIn) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    setIsSignup(defaultView === "signup");
  }, [defaultView]);

  const switchToSignup = () => {
    setIsSignup(true);
    navigate("/", { replace: true });
  };

  const switchToLogin = () => {
    setIsSignup(false);
    navigate("/login", { replace: true });
  };

  return (
    <PageWrapper>
      <AuthCard role="main" aria-label="Authentication">
        <CardInner>
          <FormSection>
            <FormsSlider $isSignup={isSignup} aria-live="polite">
              <FormPanel $mobileHidden={!isSignup}>
                <SignupForm isActive={isSignup} onSwitchToLogin={switchToLogin} />
              </FormPanel>

              <FormPanel $mobileHidden={isSignup}>
                <LoginForm isActive={!isSignup} />
              </FormPanel>
            </FormsSlider>
          </FormSection>

          <OverlaySection aria-hidden="true">
            <OverlaySlider $isSignup={isSignup}>
              <OverlayPanel>
                <OverlayTitle>Hello, friend!</OverlayTitle>
                <OverlayText>
                  New here? Create an account and start capturing your notes.
                </OverlayText>
                <GhostButton type="button" onClick={switchToSignup}>
                  Sign Up
                </GhostButton>
              </OverlayPanel>

              <OverlayPanel>
                <OverlayTitle>Welcome back!</OverlayTitle>
                <OverlayText>
                  Already have an account? Sign in to pick up where you left off.
                </OverlayText>
                <GhostButton type="button" onClick={switchToLogin}>
                  Login
                </GhostButton>
              </OverlayPanel>
            </OverlaySlider>
          </OverlaySection>
        </CardInner>

        <MobileToggle>
          {isSignup ? (
            <>
              <p>Already have an account?</p>
              <GhostButton type="button" onClick={switchToLogin}>
                Login
              </GhostButton>
            </>
          ) : (
            <>
              <p>Don&apos;t have an account yet?</p>
              <GhostButton type="button" onClick={switchToSignup}>
                Sign Up
              </GhostButton>
            </>
          )}
        </MobileToggle>
      </AuthCard>
    </PageWrapper>
  );
};

export default LoginSignupPage;
