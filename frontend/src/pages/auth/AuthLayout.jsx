// Shares the WASLA logo, jobsite photograph, and page styling across auth screens.
import { Activity, useLayoutEffect, useRef } from "react";
import { Link, useMatch } from "react-router";
import waslaLogo from "../../assets/wasla-auth-logo.webp";
import BrandingPanel from "../../components/auth/BrandingPanel";
import AnimatedConstruction from "../../components/auth/AnimatedConstruction";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import "./SignInPage.css";

export default function AuthLayout() {
  const isSignUp = Boolean(useMatch("/auth/sign-up"));
  const mode = isSignUp ? "sign-up" : "sign-in";
  const headingId = isSignUp ? "signup-heading" : "signin-heading";
  const contentRef = useRef(null);
  const previousHeadingId = useRef(headingId);

  useLayoutEffect(() => {
    if (previousHeadingId.current !== headingId) {
      previousHeadingId.current = headingId;
      contentRef.current.dataset.switched = "";
      document.getElementById(headingId)?.focus({ preventScroll: true });
    }
  }, [headingId]);

  return (
    <main className="signin-page" data-auth-mode={mode}>
      <section className="signin-panel" aria-labelledby={headingId}>
        <header className="signin-brand">
          <img
            className="wasla-logo"
            src={waslaLogo}
            alt="WASLA"
            width="360"
            height="240"
            decoding="async"
          />
          <nav className="auth-mode-nav" aria-label="Account access">
            <Link to="/" aria-current={!isSignUp ? "page" : undefined}>Sign in</Link>
            <Link to="/auth/sign-up" aria-current={isSignUp ? "page" : undefined}>Sign up</Link>
          </nav>
        </header>

        <div className="signin-content" ref={contentRef}>
          <Activity mode={isSignUp ? "hidden" : "visible"}>
            <div className="auth-view"><SignInPage /></div>
          </Activity>
          <Activity mode={isSignUp ? "visible" : "hidden"}>
            <div className="auth-view"><SignUpPage /></div>
          </Activity>
        </div>

        <AnimatedConstruction />
        <footer className="signin-footer">
          © {new Date().getFullYear()} WASLA
        </footer>
      </section>

      <BrandingPanel mode={mode} />
    </main>
  );
}
