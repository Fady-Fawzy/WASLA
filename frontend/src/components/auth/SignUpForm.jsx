// Collects public account details and the fields required for each account type.
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Building2, Loader2, LockKeyhole, Mail, Truck, UserRound } from "lucide-react";
import PasswordToggle from "./PasswordToggle";

const TEXT_LIMIT = 250;
const PASSWORD_GUIDANCE = "Use at least 10 characters, including a letter and a number.";
const PASSWORD_PATTERN = String.raw`(?=.*\p{L})(?=.*\p{Nd}).{10,128}`;
const NON_BLANK = String.raw`.*\S.*`;
const ACCOUNT_TYPES = [
  { value: "Client", label: "Client", description: "Start and manage construction projects.", icon: Building2 },
  { value: "Supplier", label: "Supplier", description: "Apply to supply materials to WASLA projects.", icon: Truck },
  { value: "Applicant", label: "Job applicant", description: "Apply as an engineer, worker or administrative staff member.", icon: BriefcaseBusiness },
];

function RegistrationField({
  name, label, as: Control = "input", icon: Icon, optional, trailing, children, error,
  "aria-describedby": hintId, ...controlProps
}) {
  const id = `signup-${name}`;
  const description = [hintId, error && `${id}-error`].filter(Boolean).join(" ");

  return (
    <div className="field-group">
      <label htmlFor={id}>
        {label}{optional && <span className="signup-optional"> Optional</span>}
      </label>
      <div className={error ? "input-shell has-error" : "input-shell"}>
        {Icon && <Icon size={18} aria-hidden="true" />}
        <Control id={id} name={name} aria-describedby={description || undefined} aria-invalid={error ? true : undefined} {...controlProps}>
          {children}
        </Control>
        {trailing}
      </div>
      {error && <p className="field-error" id={`${id}-error`}>{error.message}</p>}
    </div>
  );
}

function registrationDetails(form, accountType) {
  const fields = new FormData(form);
  const text = (name) => (fields.get(name) ?? "").trim();
  const details = {
    name: text("name"),
    email: text("email"),
    password: fields.get("password"),
    phone: text("phone"),
    type: accountType,
  };

  if (accountType === "Client") {
    return {
      ...details,
      clientType: text("clientType"),
      companyName: text("companyName"),
      address: text("address"),
    };
  }

  if (accountType === "Supplier") {
    return { ...details, companyName: text("companyName"), address: text("address") };
  }

  return {
    ...details,
    position: text("position"),
    skills: text("skills"),
    experience: Number(text("experience")),
    coverLetter: text("coverLetter"),
  };
}

function validateRegistration(form) {
  const { password, confirmPassword } = form.elements;
  const errors = {};

  for (const field of form.elements) {
    if (!field.willValidate) continue;

    let message = field.validationMessage;
    if (field === password && field.validity.patternMismatch) {
      message = PASSWORD_GUIDANCE;
    }
    if (field === confirmPassword && !message && field.value !== password.value) {
      message = "The passwords do not match.";
    }
    if (message) {
      errors[field.name] = { label: field.labels[0].textContent.trim(), message };
    }
  }

  return errors;
}

function focusField(field) {
  const disclosure = field.closest("details");
  if (disclosure) disclosure.open = true;
  field.focus();
}

export default function SignUpForm({ onSubmit }) {
  const [step, setStep] = useState("type");
  const [accountType, setAccountType] = useState("");
  const [clientType, setClientType] = useState("Individual");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);
  const [errors, setErrors] = useState({});
  const headingRef = useRef(null);
  const errorSummaryRef = useRef(null);
  const pendingInvalidField = useRef(null);
  const previousStep = useRef(step);
  const choosingType = step === "type";
  const submitsApplication = accountType !== "Client";
  const accountLabel = ACCOUNT_TYPES.find(({ value }) => value === accountType)?.label;

  useLayoutEffect(() => {
    if (previousStep.current !== step) {
      previousStep.current = step;
      headingRef.current?.focus();
    }
  }, [step]);

  useLayoutEffect(() => {
    if (!pendingInvalidField.current) return;
    if (errorSummaryRef.current) errorSummaryRef.current.focus();
    else focusField(pendingInvalidField.current);
    pendingInvalidField.current = null;
  }, [errors]);

  function handleInput(event) {
    const { name } = event.target;
    setNotice(null);
    setErrors((current) => {
      if (!current[name] && !(name === "password" && current.confirmPassword)) return current;
      const next = { ...current };
      delete next[name];
      if (name === "password") delete next.confirmPassword;
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    if (choosingType) {
      if (!accountType) {
        setErrors({ type: "Choose an account type to continue." });
        form.querySelector("[name=type]").focus();
        return;
      }
      setStep("details");
      return;
    }

    const validationErrors = validateRegistration(form);
    const [firstInvalidName] = Object.keys(validationErrors);
    setErrors(validationErrors);
    if (firstInvalidName) {
      pendingInvalidField.current = form.elements.namedItem(firstInvalidName);
      return;
    }

    if (typeof onSubmit !== "function") {
      setNotice({ message: submitsApplication ? "Application submission is not connected yet." : "Account creation is not connected yet." });
      return;
    }

    const details = registrationDetails(form, accountType);
    setIsSubmitting(true);
    setNotice(null);

    try {
      await onSubmit(details);
      form.reset();
      setAccountType("");
      setClientType("Individual");
      setShowPassword(false);
      setStep("type");
      setNotice({ message: submitsApplication ? "Your application was submitted." : "Your registration was submitted." });
    } catch {
      setNotice({
        error: true,
        message: submitsApplication
          ? "We couldn’t submit your application. Please try again."
          : "We couldn’t create your account. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function selectAccountType(event) {
    setAccountType(event.target.value);
    setClientType("Individual");
    setErrors({});
    setNotice(null);
  }

  function returnToAccountType() {
    setErrors({});
    setNotice(null);
    setShowPassword(false);
    setStep("type");
  }

  return (
    <form className="signup-form" noValidate onSubmit={handleSubmit} onInput={handleInput}>
      <header className="signin-header">
        <p className="signup-step">Step {choosingType ? "1" : "2"} of 2</p>
        <h1 id="signup-heading" tabIndex={-1} ref={headingRef}>
          {choosingType ? "Choose your account type" : "Your details"}
        </h1>
        {!choosingType && <p>{accountLabel}</p>}
      </header>

      {!choosingType && Object.keys(errors).length > 1 && (
        <section className="signup-error-summary" ref={errorSummaryRef} tabIndex={-1} aria-labelledby="signup-errors-heading">
          <h2 id="signup-errors-heading">Check these fields</h2>
          <ul>
            {Object.entries(errors).map(([name, { label, message }]) => (
              <li key={name}>
                <a href={`#signup-${name}`} onClick={(event) => {
                  event.preventDefault();
                  focusField(event.currentTarget.closest("form").elements.namedItem(name));
                }}>
                  {label} — {message}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {choosingType && (
        <fieldset className="signup-fields signup-types" aria-labelledby="signup-heading">
          {ACCOUNT_TYPES.map(({ value, label, description, icon: Icon }) => (
            <label className="signup-type" key={value}>
              <input
                type="radio"
                name="type"
                value={value}
                checked={accountType === value}
                onChange={selectAccountType}
                aria-describedby={`signup-type-${value}${errors.type ? " signup-type-error" : ""}`}
                aria-invalid={errors.type ? true : undefined}
                aria-label={label}
                required
              />
              <Icon size={21} aria-hidden="true" />
              <span>
                <strong>{label}</strong>
                <span className="signup-type-description" id={`signup-type-${value}`}>{description}</span>
              </span>
            </label>
          ))}
          {errors.type && <p className="field-error" id="signup-type-error" role="alert">{errors.type}</p>}
        </fieldset>
      )}

      <fieldset className="signup-fields" hidden={choosingType} disabled={choosingType || isSubmitting}>
        <div className="signup-pair">
          <RegistrationField
            name="name" label="Full name" icon={UserRound} autoComplete="name"
            maxLength={TEXT_LIMIT} pattern={NON_BLANK} error={errors.name} required
          />
          <RegistrationField
            name="email" label="Email address" icon={Mail} type="email"
            autoComplete="email" maxLength={TEXT_LIMIT} error={errors.email} required
          />
        </div>

        <div className="signup-pair">
          <RegistrationField
            name="password"
            label="Password"
            icon={LockKeyhole}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            maxLength={128}
            pattern={PASSWORD_PATTERN}
            title={PASSWORD_GUIDANCE}
            aria-describedby="signup-password-hint"
            error={errors.password}
            required
            trailing={(
              <PasswordToggle
                visible={showPassword}
                onToggle={() => setShowPassword((visible) => !visible)}
              />
            )}
          />
          <RegistrationField
            name="confirmPassword" label="Confirm password" type="password"
            autoComplete="new-password" maxLength={128} error={errors.confirmPassword} required
          />
        </div>
        <p className="signup-hint" id="signup-password-hint">{PASSWORD_GUIDANCE}</p>

        {accountType === "Client" && (
          <div className="signup-pair">
            <RegistrationField
              name="clientType" label="Client type" as="select" value={clientType}
              onChange={(event) => setClientType(event.target.value)} error={errors.clientType} required
            >
              <option value="Individual">Individual</option>
              <option value="Corporate">Company or organization</option>
            </RegistrationField>
            {clientType === "Corporate" && (
              <RegistrationField name="companyName" label="Company name" autoComplete="organization" maxLength={TEXT_LIMIT} optional />
            )}
          </div>
        )}

        {accountType === "Supplier" && (
          <div className="signup-role-details" key="supplier-company">
            <RegistrationField
              name="companyName" label="Company name" autoComplete="organization"
              maxLength={TEXT_LIMIT} pattern={NON_BLANK} aria-describedby="signup-supplier-hint" error={errors.companyName} required
            />
            <p className="signup-hint" id="signup-supplier-hint">WASLA reviews supplier applications before granting supplier access.</p>
          </div>
        )}

        {accountType === "Applicant" && (
          <div className="signup-role-details">
            <RegistrationField
              name="position" label="Position" as="select" defaultValue=""
              aria-describedby="signup-position-hint" error={errors.position} required
            >
              <option value="" disabled>Select a position</option>
              <option value="Engineer">Engineer</option>
              <option value="Worker">Worker</option>
              <option value="Administrative">Administrative staff</option>
            </RegistrationField>
            <p className="signup-hint" id="signup-position-hint">WASLA reviews job applications before granting staff access.</p>
          </div>
        )}

        <details className="signup-additional">
          <summary>Additional details <span className="signup-optional">Optional</span></summary>
          <div className="signup-role-details">
            <RegistrationField name="phone" label="Phone number" type="tel" autoComplete="tel" maxLength={TEXT_LIMIT} />
            {(accountType === "Client" || accountType === "Supplier") && (
              <RegistrationField key={accountType} name="address" label="Address" autoComplete="street-address" maxLength={TEXT_LIMIT} />
            )}
            {accountType === "Applicant" && (
              <>
                <RegistrationField name="skills" label="Skills" maxLength={TEXT_LIMIT} />
                <RegistrationField name="experience" label="Years of experience" type="number" min={0} max={60} error={errors.experience} />
                <RegistrationField name="coverLetter" label="Cover letter" as="textarea" rows={3} maxLength={4000} />
              </>
            )}
          </div>
        </details>
      </fieldset>

      <div className="signup-actions">
        {!choosingType && (
          <button type="button" className="signup-back" onClick={returnToAccountType} disabled={isSubmitting}>
            <ArrowLeft size={16} aria-hidden="true" /> Back
          </button>
        )}
        <button type="submit" className="signin-button" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 size={18} className="signin-spinner" aria-hidden="true" /> {submitsApplication ? "Sending application…" : "Creating account…"}</>
          ) : (
            <>{choosingType ? "Continue" : submitsApplication ? "Send application" : "Create account"} <ArrowRight size={18} aria-hidden="true" /></>
          )}
        </button>
      </div>

      <p className={`signin-notice${notice?.error ? " signin-notice--error" : ""}`} role={notice?.error ? "alert" : "status"}>
        {notice?.message || ""}
      </p>
    </form>
  );
}
