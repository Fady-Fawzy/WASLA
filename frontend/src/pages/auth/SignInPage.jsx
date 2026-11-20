// Pairs the workspace sign-in form with the jobsite photograph.
import waslaLogo from "../../assets/DB_FINAL_LOGO.png";
import BrandingPanel from "../../components/auth/BrandingPanel";
import LoginForm from "../../components/auth/LoginForm";
import "./SignInPage.css";

function SignInPage({ onSignIn, onForgotPassword }) {
  return (
    <main className="signin-page">
      <section className="signin-panel" aria-labelledby="signin-heading">
        <header className="signin-brand">
          <img
            className="wasla-logo"
            src={waslaLogo}
            alt="WASLA"
            width="1536"
            height="1024"
            decoding="async"
          />
        </header>

        <div className="signin-content">
          <LoginForm onSubmit={onSignIn} onForgotPassword={onForgotPassword} />
        </div>

        <footer className="signin-footer">
          © {new Date().getFullYear()} WASLA
        </footer>
      </section>

      <BrandingPanel />
    </main>
  );
}

export default SignInPage;
