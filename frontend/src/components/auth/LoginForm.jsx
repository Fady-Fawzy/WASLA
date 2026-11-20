// Renders the sign-in fields, client-side validation, and form feedback.
import { useRef, useState } from "react";
import { Mail, LockKeyhole, ArrowRight, Loader2 } from "lucide-react";
import PasswordToggle from "./PasswordToggle";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginForm({ onSubmit, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function validate() {
    const nextErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      nextErrors.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Enter your password.";
    }

    return { nextErrors, trimmedEmail };
  }

  function clearFieldError(field) {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (notice) {
      setNotice(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const { nextErrors, trimmedEmail } = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setNotice(null);

      if (nextErrors.email) {
        emailRef.current?.focus();
      } else if (nextErrors.password) {
        passwordRef.current?.focus();
      }
      return;
    }

    setErrors({});

    if (typeof onSubmit !== "function") {
      setNotice({
        type: "info",
        message: "Sign-in is currently unavailable.",
      });
      return;
    }

    setIsSubmitting(true);
    setNotice(null);

    try {
      await onSubmit({ email: trimmedEmail, password, rememberMe });
    } catch (error) {
      setNotice({
        type: "error",
        message: error?.message || "Unable to sign in. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleForgotPassword() {
    if (typeof onForgotPassword === "function") {
      onForgotPassword(email.trim());
      return;
    }

    setNotice({
      type: "info",
      message: "Password recovery is not connected yet.",
    });
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <header className="signin-header">
        <h1 id="signin-heading" tabIndex={-1}>Sign in</h1>
        <p>Use your email to access WASLA.</p>
      </header>

      <div className="form-fields">
        <div className="field-group">
          <label htmlFor="email">Email address</label>

          <div className={`input-shell${errors.email ? " has-error" : ""}`}>
            <Mail size={18} aria-hidden="true" />
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              inputMode="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearFieldError("email");
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              disabled={isSubmitting}
              required
            />
          </div>

          {errors.email && (
            <p id="email-error" className="field-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="password">Password</label>

          <div className={`input-shell${errors.password ? " has-error" : ""}`}>
            <LockKeyhole size={18} aria-hidden="true" />
            <input
              ref={passwordRef}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                clearFieldError("password");
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              disabled={isSubmitting}
              required
            />

            <PasswordToggle
              visible={showPassword}
              onToggle={() => setShowPassword((visible) => !visible)}
              disabled={isSubmitting}
            />
          </div>

          {errors.password && (
            <p id="password-error" className="field-error" role="alert">
              {errors.password}
            </p>
          )}
        </div>
      </div>

      <div className="form-options">
        <label className="remember-option">
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            disabled={isSubmitting}
          />
          Remember me
        </label>

        <button
          type="button"
          className="forgot-link"
          onClick={handleForgotPassword}
          disabled={isSubmitting}
        >
          Forgot password?
        </button>
      </div>

      <button type="submit" className="signin-button" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="signin-spinner" aria-hidden="true" />
            Signing in...
          </>
        ) : (
          <>
            Sign in
            <ArrowRight size={18} aria-hidden="true" />
          </>
        )}
      </button>

      <p
        className={`signin-notice${notice ? ` signin-notice--${notice.type}` : ""}`}
        role={notice?.type === "error" ? "alert" : "status"}
        aria-live={notice?.type === "error" ? "assertive" : "polite"}
      >
        {notice?.message || ""}
      </p>
    </form>
  );
}

export default LoginForm;
