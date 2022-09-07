import React from 'react';

const ApproveIcon = ({ color, classes, handleClick }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="512.000000pt"
      height="512.000000pt"
      className={`w-5 h-5 ${classes}`}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      onClick={handleClick}
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill={color || '#000000'}
        stroke="none"
      >
        <path
          d="M1271 5092 c-19 -9 -44 -30 -55 -45 l-21 -28 -3 -1997 c-2 -1886 -1
-1999 15 -2032 10 -19 33 -45 52 -57 l34 -23 508 0 c401 0 509 3 509 13 0 6
-7 48 -17 92 -26 127 -24 399 5 542 65 323 209 590 447 829 240 241 503 381
830 442 139 26 417 23 562 -6 133 -26 285 -78 394 -133 43 -21 83 -39 89 -39
7 0 10 366 8 1179 -3 1179 -3 1180 -24 1208 -11 15 -36 38 -54 51 l-33 22
-1606 0 c-1509 0 -1608 -1 -1640 -18z m2675 -488 c96 -46 100 -200 7 -261 -26
-17 -83 -18 -1028 -21 -899 -2 -1004 -1 -1042 13 -110 42 -124 195 -24 262
l34 23 1009 0 c907 0 1013 -2 1044 -16z m0 -600 c47 -22 74 -70 74 -130 0 -65
-28 -110 -85 -135 -43 -19 -71 -19 -1042 -17 -978 3 -999 3 -1031 23 -40 24
-72 81 -72 127 0 46 29 99 69 125 l34 23 1009 0 c907 0 1013 -2 1044 -16z m0
-600 c99 -47 100 -208 2 -261 -31 -17 -90 -18 -1044 -18 l-1010 0 -36 25 c-89
61 -89 187 1 247 l34 23 1009 0 c907 0 1013 -2 1044 -16z m-1452 -603 c66 -44
88 -140 46 -208 -39 -65 -53 -68 -367 -68 -270 0 -283 1 -310 21 -96 71 -97
196 -1 254 31 19 51 20 318 20 262 0 287 -2 314 -19z"
        />
        <path
          d="M318 4601 c-79 -26 -136 -61 -189 -118 -94 -100 -129 -196 -129 -350
l0 -93 450 0 450 0 0 85 c0 154 -35 255 -122 350 -28 31 -70 67 -95 82 -107
62 -252 80 -365 44z"
        />
        <path d="M0 2820 l0 -920 448 2 447 3 3 918 2 917 -450 0 -450 0 0 -920z" />
        <path
          d="M3720 2544 c-162 -21 -315 -66 -445 -132 -235 -118 -453 -338 -573
-577 -167 -336 -167 -764 2 -1121 166 -351 470 -588 866 -677 130 -29 413 -31
540 -3 119 26 221 61 323 112 132 66 201 116 313 228 185 184 285 376 346 660
28 134 31 362 5 486 -72 339 -264 625 -548 818 -114 77 -284 148 -439 183 -83
19 -315 32 -390 23z m677 -784 c52 -31 79 -100 63 -161 -14 -50 -598 -797
-642 -821 -38 -21 -96 -23 -134 -6 -34 16 -361 390 -380 435 -19 45 -18 72 9
123 38 74 134 103 202 62 17 -11 73 -69 125 -130 52 -62 98 -112 101 -112 3 0
107 129 230 286 123 157 229 291 234 298 40 49 133 62 192 26z"
        />
        <path
          d="M57 1603 c-6 -12 260 -643 280 -665 57 -63 169 -64 225 -2 17 20 278
639 278 661 0 11 -73 13 -389 13 -215 0 -392 -3 -394 -7z"
        />
      </g>
    </svg>
  );
};

export default ApproveIcon;