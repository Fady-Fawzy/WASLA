import { useEffect, useState } from "react";
import logo from "../../assets/wasla-intro.webp";
import "./LogoIntro.css";

// All coordinates follow the approved artwork on a 600 × 400 drawing sheet.
const centerFacade = "196,63 267,104 267,155 299,135 368,180 368,228 196,229";
const finishedFacade = "324,101 394,56 463,104 463,244 368,228 368,176 324,149";
// Offset the vertical joints on alternate courses, following the wall's perspective.
const bricks = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 6 }, (_, column) => {
    const x = 99 + column * 20 - (row % 2) * 10;
    const y = 241 - (x - 108) * .27 - row * 10;
    return {
      id: `intro-brick-${row}-${column}`,
      outline: `M${x} ${y}l20.2-5.45v-10.2l-20.2 5.45z`,
      delay: `${.34 + row * .15 + column * .044}s`,
    };
  })
).flat();
const glazing = "M348 121l17-9v51l-17-10z M412 117l28 15v47l-28-12z";
const floors = [
  { id: "base", outline: "M96 192l102-29v85H96z", delay: ".08s" },
  { id: "middle", outline: "M96 139l102-32v57L96 193z", delay: ".36s" },
  { id: "upper", outline: "M96 10h102v98L96 140z", delay: ".66s" },
];

function dockToHeader(overlay) {
  const headerLogo = document.querySelector(".signin-brand .wasla-logo");
  const art = overlay.querySelector(".intro-art");
  if (headerLogo) {
    const target = headerLogo.getBoundingClientRect();
    const start = art.getBoundingClientRect();
    // Match the header's object-fit: cover crop to the intro's SVG viewBox.
    const fit = Math.max(target.width / 600, target.height / 400);
    const x = target.left + (target.width - 600 * fit) * .48 + 78 * fit;
    const y = target.top + (target.height - 400 * fit) / 2;
    art.style.setProperty("--dock-x", `${x - start.left}px`);
    art.style.setProperty("--dock-y", `${y - start.top}px`);
    art.style.setProperty("--dock-scale", String(445 * fit / start.width));
  }
  overlay.dataset.docking = "true";
}

export default function LogoIntro({ onFinish }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const artwork = new Image();
    artwork.onload = () => setReady(true);
    artwork.onerror = onFinish;
    artwork.src = logo;
    return () => {
      artwork.onload = null;
      artwork.onerror = null;
    };
  }, [onFinish]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function handlePreference() {
      if (preference.matches) onFinish();
    }
    handlePreference();
    preference.addEventListener("change", handlePreference);
    const timeout = window.setTimeout(onFinish, 6500);
    return () => {
      window.clearTimeout(timeout);
      preference.removeEventListener("change", handlePreference);
    };
  }, [onFinish, ready]);

  return (
    <main className="logo-intro" data-ready={ready} aria-label="WASLA introduction"
      onAnimationEnd={(event) => {
        if (event.animationName === "intro-appear") dockToHeader(event.currentTarget);
        if (event.animationName === "intro-dock") onFinish();
      }}>
      <svg className="intro-art" viewBox="78 0 445 390" role="img" aria-label="WASLA">
        <defs>
          <image id="intro-original" href={logo} width="600" height="400" />
          <filter id="intro-remove-paper" colorInterpolationFilters="sRGB">
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -6 -6 -6 18 -.4" />
          </filter>
          <clipPath id="intro-frame"><path d="M99 17h96v214l-89 16v-10l82-16v-47l-80 22z" /></clipPath>
          {floors.map(({ id, outline }) => (
            <clipPath key={id} id={`intro-floor-${id}`}><path d={outline} /></clipPath>
          ))}
          <clipPath id="intro-bricks"><path d="m108 195 80-22v49l-80 16z" /></clipPath>
          <clipPath id="intro-center"><polygon points={centerFacade} /></clipPath>
          <clipPath id="intro-finished"><polygon points={finishedFacade} /></clipPath>
          <clipPath id="intro-name"><path d="M98 260q117-56 367-15l32 16v109H98z" /></clipPath>
          <clipPath id="intro-rule"><path d="M98 225h400v37H98z" /></clipPath>
          <clipPath id="intro-english"><rect x="98" y="262" width="400" height="58" /></clipPath>
          <clipPath id="intro-arabic"><rect x="98" y="320" width="400" height="51" /></clipPath>
          <clipPath id="intro-roof"><path d="M324 101l70-45 69 48v139h-12V110l-58-39-59 36v45l-10-4z" /></clipPath>
          <clipPath id="intro-glass"><path d={glazing} /></clipPath>
          <mask id="intro-bare-facade" maskUnits="userSpaceOnUse" x="320" y="52" width="150" height="200">
            <rect x="320" y="52" width="150" height="200" fill="white" />
            <path d={glazing} fill="black" />
          </mask>
          {bricks.map(({ id, outline }) => (
            <clipPath key={id} id={id}>
              <path d={outline} />
            </clipPath>
          ))}
        </defs>

        <g className="intro-guides" fill="none" stroke="#93836e" strokeWidth=".75">
          <path strokeDasharray="3 5" d="M88 242h404 M194 13v237 M394 28v224" />
          <path d="M92 61v180m-3-177 6-6m-6 186 6-6 M323 46h140m-142 3 6-6m132 6 6-6" />
        </g>
        <g className="intro-drawing" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="intro-trace" pathLength="1" d="M107 240V106l85-44v166 M102 163l86-28m-75 20v-42m6-21V37m-12 57V43m61 24V26m11 35V20" />
          <path className="intro-trace" pathLength="1" d="M196 228V64l70 41v47m-41 57 74-49 70 46 M324 146v-44l70-45 68 47v138" />
        </g>

        <g clipPath="url(#intro-frame)">
          {floors.map(({ id, delay }) => (
            <g key={id} clipPath={`url(#intro-floor-${id})`}>
              <use className="intro-floor" style={{ "--delay": delay }} href="#intro-original" />
            </g>
          ))}
        </g>
        <g clipPath="url(#intro-bricks)">
          {bricks.map(({ id, delay }) => (
            <g key={id} className="intro-brick" style={{ "--delay": delay }}>
              <use clipPath={`url(#${id})`} href="#intro-original" />
            </g>
          ))}
        </g>

        <g clipPath="url(#intro-center)">
          <g className="intro-plaster">
            <use href="#intro-original" />
            <path d="m200 153 19-12m-19 21 16-10m-16 24 21-14m18 35 18-11"
              fill="none" stroke="#9c9485" strokeWidth="1.4" strokeLinecap="round" />
          </g>
          <use className="intro-center-color" href="#intro-original" />
        </g>

        <g clipPath="url(#intro-finished)">
          <g clipPath="url(#intro-roof)"><use className="intro-roof" href="#intro-original" /></g>
          <g mask="url(#intro-bare-facade)"><use className="intro-finish" href="#intro-original" /></g>
          <g className="intro-glass"><use clipPath="url(#intro-glass)" href="#intro-original" /></g>
          <g className="intro-lights" fill="#ffedbe">
            <ellipse cx="362" cy="99" rx="4.2" ry="1.9" transform="rotate(-20 362 99)" />
            <ellipse cx="425" cy="100" rx="4.2" ry="1.9" transform="rotate(20 425 100)" />
          </g>
        </g>
        <g clipPath="url(#intro-name)">
          <g clipPath="url(#intro-rule)"><use className="intro-rule" href="#intro-original" /></g>
          <g clipPath="url(#intro-english)"><use className="intro-english" href="#intro-original" /></g>
          <g clipPath="url(#intro-arabic)"><use className="intro-arabic" href="#intro-original" /></g>
        </g>
        <use className="intro-complete" href="#intro-original" />
      </svg>
    </main>
  );
}
