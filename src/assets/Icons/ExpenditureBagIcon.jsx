import React from 'react';

const ExpenditureBagIcon = ({ color, classes, handleClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="682.667"
      height="682.667"
      version="1"
      viewBox="0 0 512 512"
      className={`w-5 h-5 ${classes}`}
      onClick={handleClick}
      fill={color || 'currentColor'}
    >
      <path
        d="M1855 5106c-121-30-232-116-286-221l-34-65h-253c-235 0-256-1-293-21-42-21-78-80-79-127 0-12 39-143 86-290 48-147 102-315 121-374l34-108h1618l34 108c19 59 73 227 121 374 47 147 86 278 86 290-1 47-37 106-79 127-37 20-58 21-293 21h-253l-30 57c-94 181-305 277-500 229zM1115 3582c-98-34-172-114-195-213-16-67-9-126 25-196l28-56-21-16c-11-9-60-45-109-81-114-84-309-279-400-401C140 2215-17 1738 3 1281 23 800 220 465 602 257 874 109 1201 33 1675 9c470-24 1017 20 1295 104l44 14 2 104c1 78 6 119 23 163 23 64 69 142 101 171 25 23 25 47 0 70-32 29-78 107-102 171-30 84-30 254 0 338 24 64 70 142 102 171 11 10 20 26 20 35s-9 25-20 35c-32 29-78 107-102 171-30 84-30 254 0 338 24 64 70 142 102 171 25 23 25 47 0 70-32 29-78 107-102 171-17 47-21 82-21 169-1 96 3 119 26 178 32 83 54 115 125 189 31 32 54 59 51 61-2 2-36 30-74 63-39 32-101 79-137 104l-66 45 32 55c27 48 31 64 31 130 0 55-6 87-22 121-27 60-92 125-152 153-46 21-51 21-856 23-748 2-814 1-860-15zm915-902c65-33 80-75 80-224v-126l52-26c120-61 214-188 238-323 13-74 7-123-22-163-57-81-189-76-244 8-10 14-21 51-25 82-13 92-71 146-157 144-110-1-180-132-119-222 32-49 71-67 166-78 323-39 503-371 354-655-41-78-120-156-194-189l-49-23v-83c0-63-5-92-20-122-23-45-80-80-130-80s-107 35-130 80c-15 30-20 59-20 122v83l-46 19c-56 23-156 113-191 173-36 61-63 155-63 217 0 89 61 157 142 158 86 2 144-52 157-144 13-96 66-148 152-148 62 0 108 32 133 92 45 109-37 207-174 208-84 0-203 56-276 129-215 215-162 567 106 710l60 32v125c0 105 3 131 20 164 37 73 124 99 200 60zM3460 2687c-76-24-150-129-150-212 0-87 75-189 156-213 31-9 221-12 749-12s718 3 749 12c81 24 156 126 156 213s-75 189-156 213c-56 16-1452 15-1504-1zM3460 1937c-76-24-150-129-150-212 0-87 75-189 156-213 31-9 221-12 749-12s718 3 749 12c81 24 156 126 156 213s-75 189-156 213c-56 16-1452 15-1504-1zM3460 1187c-76-24-150-129-150-212 0-87 75-189 156-213 59-17 1439-17 1498 0 81 24 156 126 156 213s-75 189-156 213c-56 16-1452 15-1504-1zM3460 437c-76-24-150-129-150-212 0-87 75-189 156-213 59-17 1439-17 1498 0 81 24 156 126 156 213s-75 189-156 213c-56 16-1452 15-1504-1z"
        transform="matrix(.1 0 0 -.1 0 512)"
      ></path>
    </svg>
  );
};

export default ExpenditureBagIcon;