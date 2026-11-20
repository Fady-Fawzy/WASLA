// Provides public registration for the authentication route.
import SignUpForm from "../../components/auth/SignUpForm";
import "./SignUpPage.css";

export default function SignUpPage({ onSignUp }) {
  return <SignUpForm onSubmit={onSignUp} />;
}
