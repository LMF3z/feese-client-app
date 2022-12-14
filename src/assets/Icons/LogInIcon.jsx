import React from 'react';

const LogInIcon = ({ color, classes, handleClick }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="512.000000pt"
      height="512.000000pt"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      className={`w-5 h-5 ${classes}`}
      onClick={handleClick}
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill={color || '"#000000"'}
        stroke="none"
      >
        <path
          d="M2210 5104 c-229 -49 -431 -246 -484 -474 -22 -92 -22 -396 -1 -448
64 -152 273 -172 370 -34 30 44 30 44 35 215 6 185 16 222 72 274 56 53 58 53
610 52 l513 0 -55 -21 c-112 -42 -192 -117 -244 -227 l-31 -66 -3 -1653 -2
-1653 -359 3 -359 3 -44 30 c-23 17 -54 51 -68 75 -25 44 -25 50 -30 320 -5
299 -7 305 -67 362 -103 98 -267 67 -334 -64 -17 -34 -19 -61 -19 -320 0 -319
6 -363 68 -488 53 -109 168 -222 282 -279 134 -66 174 -71 578 -71 l352 0 0
-143 c0 -98 5 -159 15 -193 23 -79 86 -168 155 -218 83 -61 145 -81 255 -81
l90 0 670 224 c369 123 692 235 719 248 58 29 132 101 169 163 60 104 57 -21
57 2127 0 1398 -3 1977 -11 2015 -34 161 -173 297 -339 328 -34 6 -492 10
-1274 9 -1005 0 -1233 -3 -1286 -15z"
        />
        <path
          d="M1195 4036 c-40 -17 -95 -72 -111 -113 -11 -25 -14 -109 -14 -377 l0
-345 -463 -3 -463 -3 -42 -28 c-60 -39 -93 -94 -99 -164 -7 -80 31 -154 102
-198 l48 -30 459 -3 458 -3 0 -342 c0 -309 2 -346 19 -382 48 -107 186 -155
289 -101 15 8 235 223 488 478 435 437 462 466 473 511 14 58 7 109 -24 162
-36 61 -902 921 -947 939 -45 19 -132 20 -173 2z"
        />
      </g>
    </svg>
  );
};

export default LogInIcon;
