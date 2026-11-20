import { Eye, EyeOff } from "lucide-react";

export default function PasswordToggle({ visible, onToggle, disabled }) {
  const Icon = visible ? EyeOff : Eye;

  return (
    <button
      type="button"
      className="password-toggle"
      aria-label={visible ? "Hide password" : "Show password"}
      aria-pressed={visible}
      onClick={onToggle}
      disabled={disabled}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
