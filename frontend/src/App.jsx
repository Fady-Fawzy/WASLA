import { useCallback, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router";
import LogoIntro from "./components/auth/LogoIntro";
import AuthLayout from "./pages/auth/AuthLayout";

const INTRO_LAST_SHOWN = "wasla.intro.lastShown";
const INTRO_INTERVAL = 3 * 60 * 60 * 1000;

function isIntroDue() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  try {
    const now = Date.now();
    const lastShown = Number(localStorage.getItem(INTRO_LAST_SHOWN));
    const elapsed = now - lastShown;
    if (lastShown > 0 && elapsed >= 0 && elapsed < INTRO_INTERVAL) return false;

    // Count the opening so skipping or refreshing mid-animation respects the interval.
    localStorage.setItem(INTRO_LAST_SHOWN, String(now));
    return true;
  } catch {
    // Go directly to the form when the browser cannot remember the last visit.
    return false;
  }
}

function App() {
  const { pathname } = useLocation();
  const [showIntro, setShowIntro] = useState(false);
  const finishIntro = useCallback(() => setShowIntro(false), []);

  useLayoutEffect(() => {
    if (isIntroDue()) setShowIntro(true);
  }, [pathname]);

  return (
    <>
      <div inert={showIntro} style={{ display: "contents" }}>
        <AuthLayout />
      </div>
      {showIntro && <LogoIntro onFinish={finishIntro} />}
    </>
  );
}

export default App;
