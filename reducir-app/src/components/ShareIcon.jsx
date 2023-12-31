import React from "react";

export const ShareIcon = ({
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  fill = "#005840",
  stroke="#005840",
  ...props
}) => (
  <svg 
    aria-hidden="true"
    fill={fill}
    stroke={stroke}
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
        d="M3416 4690 c-81 -26 -144 -97 -178 -202 -19 -55 -22 -94 -26 -310 -5 -279 3 -258 -92 -258 -71 0 -282 -28 -420 -56 -290 -57 -544 -145 -825 -284 -331 -163 -586 -344 -849 -600 -294 -287 -502 -571 -676 -924 -219 -444 -329 -876 -346 -1361 -5 -143 -4 -164 13 -195 37 -71 132 -102 201 -66 16 8 70 67 121 131 542 678 1270 1145 2096 1345 234 57 443 90 676 106 l97 7 4 -249 c6 -303 17 -349 102 -442 53 -57 101 -77 186 -76 88 1 136 20 225 87 33 25 335 321 671 659 l612 613 45 95 c89 185 89 360 0 540 -35 72 -67 105 -692 731 -732 731 -706 709 -846 715 -38 2 -83 -1 -99 -6z"

      strokeWidth={strokeWidth}
    />
  </svg>
);