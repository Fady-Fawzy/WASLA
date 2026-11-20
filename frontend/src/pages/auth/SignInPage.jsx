// Provides the workspace sign-in form for the authentication route.
import LoginForm from "../../components/auth/LoginForm";

function SignInPage({ onSignIn, onForgotPassword }) {
  return <LoginForm onSubmit={onSignIn} onForgotPassword={onForgotPassword} />;
}

export default SignInPage;
