import React from 'react';

const ServicesIcon = ({ color, classes, handleClick }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="512.000000pt"
      height="512.000000pt"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      onClick={handleClick}
      fill={color || 'currentColor'}
      className={`w-5 h-5 ${classes}`}
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          fill={color || 'currentColor'}
          d="M2582 5105 c-225 -51 -420 -248 -467 -471 -29 -135 -12 -263 52 -393
52 -106 168 -222 274 -274 352 -173 751 16 850 401 76 297 -98 616 -390 718
-93 32 -227 40 -319 19z"
        />
        <path
          fill={color || 'currentColor'}
          d="M1982 3834 c-63 -85 -115 -189 -148 -301 -22 -74 -27 -114 -31 -249
-5 -156 -5 -163 18 -204 15 -25 38 -50 61 -61 36 -18 71 -19 823 -19 768 0
787 0 825 20 65 33 80 75 80 223 0 251 -54 420 -192 605 l-40 53 -57 -54
c-108 -103 -251 -181 -407 -223 -105 -28 -312 -26 -423 4 -154 42 -289 115
-398 216 l-61 56 -50 -66z"
        />
        <path
          fill={color || 'currentColor'}
          d="M1620 2735 c-106 -21 -180 -45 -265 -86 -73 -35 -103 -53 -220 -133
-22 -15 -86 -68 -142 -117 l-103 -90 428 -854 427 -855 885 0 c953 0 980 1
1127 53 135 47 301 158 384 259 20 23 241 337 493 697 493 706 494 709 483
817 -3 29 -14 72 -25 96 -72 164 -281 227 -432 130 -28 -18 -179 -196 -465
-547 -237 -290 -440 -531 -460 -544 -87 -58 -106 -60 -523 -61 -364 0 -385 1
-422 20 -45 23 -80 80 -80 130 0 45 35 107 73 127 28 16 72 19 392 23 342 5
362 6 406 26 60 28 125 93 152 153 30 64 30 178 0 242 -27 60 -92 125 -152
153 -44 20 -62 21 -501 26 -400 4 -459 7 -480 21 -14 9 -60 46 -104 82 -207
173 -416 248 -686 246 -69 0 -154 -7 -190 -14z"
        />
        <path
          fill={color || 'currentColor'}
          d="M191 2135 c-144 -71 -153 -77 -171 -118 -11 -23 -20 -54 -20 -70 0
-16 186 -399 470 -967 461 -922 471 -940 509 -960 22 -11 56 -20 75 -20 50 0
286 120 338 172 76 76 104 187 74 290 -8 30 -193 411 -410 846 -368 736 -398
793 -441 828 -63 53 -116 73 -201 73 -70 1 -77 -1 -223 -74z"
        />
      </g>
    </svg>
  );
};

export default ServicesIcon;
