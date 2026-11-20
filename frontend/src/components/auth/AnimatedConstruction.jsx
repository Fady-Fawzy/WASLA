// Draws the animated construction skyline below the sign-in form.
import { useId } from "react";

function AnimatedConstruction() {
  const idPrefix = useId();
  const windowsPatternId = `${idPrefix}-skyline-windows`;
  const groundGradientId = `${idPrefix}-skyline-ground`;

  return (
    <div className="construction-scene" aria-hidden="true">
      <svg
        className="construction-svg"
        viewBox="0 0 900 170"
        preserveAspectRatio="xMidYMax meet"
        focusable="false"
      >
        <defs>
          <pattern id={windowsPatternId} width="19" height="17" patternUnits="userSpaceOnUse">
            <rect className="building-window" x="4" y="4" width="8" height="8" rx="1" />
          </pattern>
          <linearGradient id={groundGradientId}>
            <stop stopColor="#d4dbe2" stopOpacity="0" />
            <stop offset=".18" stopColor="#d4dbe2" />
            <stop offset=".82" stopColor="#d4dbe2" />
            <stop offset="1" stopColor="#d4dbe2" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="skyline-distant">
          <path
            className="building-outline"
            d="M34 152V109h74v43 M130 152V78h39V65h34v87 M219 152V99h62v53 M455 152v-46h61v46 M737 152V86h52v66 M799 152v-48h75v48"
          />
          <path
            fill={`url(#${windowsPatternId})`}
            d="M140 83h53v66h-53z M748 91h32v56h-32z M806 111h60v32h-60z"
          />
        </g>

        <g className="skyline-near">
          <path
            className="building-outline"
            d="M70 152V92h88v60 M241 152V57h98v95 M349 152V108h96v44 M480 152V96h86v56 M707 152V116h108v36"
          />
          <path
            className="building-detail"
            d="M241 77h98m-98 22h98m-98 22h98m-76-64v95m53-95v95 M480 113h86m-86 18h86m-65-35v56m45-56v56 M707 135h108 M262 57V42m18 15V39m35 18V42 M80 92V83h34v9"
          />
          <path
            fill={`url(#${windowsPatternId})`}
            d="M79 97h69v49H79z M359 112h77v35h-77z M717 119h88v28h-88z"
          />
          <g className="window-glow">
            <rect x="102" y="106" width="8" height="8" rx="1" />
            <rect x="121" y="123" width="8" height="8" rx="1" />
            <rect x="387" y="123" width="8" height="8" rx="1" />
            <rect x="748" y="123" width="8" height="8" rx="1" />
          </g>
        </g>

        <g className="crane-frame">
          <path d="M632 152V33h22v119 M632 46l22 20-22 20 22 20-22 20 22 20 M632 66h22m-22 40h22m-22 40h22 M618 152h50" />
          <g className="crane-boom">
            <path d="M586 33h236L797 20H612z M610 33l16-13 16 13 16-13 16 13 16-13 16 13 16-13 16 13 16-13 16 13 16-13 16 13 M612 20l31-13 36 13" />
            <rect className="crane-cab" x="631" y="27" width="24" height="18" rx="2" />
            <g transform="translate(785 33)">
              <g className="crane-hook">
                <path d="M0 0v47m-13 9 13-9 13 9" />
                <rect className="crane-load" x="-19" y="56" width="38" height="5" rx="1" />
              </g>
            </g>
          </g>
        </g>

        <path d="M0 152h900" stroke={`url(#${groundGradientId})`} />
      </svg>
    </div>
  );
}

export default AnimatedConstruction;
