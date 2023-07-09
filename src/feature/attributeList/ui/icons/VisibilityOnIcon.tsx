import React from 'react';

export default function VisibilityOnIcon({
  width = 20,
  height = 20,
  color = 'currentColor',
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0002 4.99992C13.1585 4.99992 15.9752 6.77492 17.3502 9.58325C15.9752 12.3916 13.1585 14.1666 10.0002 14.1666C6.84183 14.1666 4.02516 12.3916 2.65016 9.58325C4.02516 6.77492 6.84183 4.99992 10.0002 4.99992ZM10.0002 3.33325C5.8335 3.33325 2.27516 5.92492 0.833496 9.58325C2.27516 13.2416 5.8335 15.8333 10.0002 15.8333C14.1668 15.8333 17.7252 13.2416 19.1668 9.58325C17.7252 5.92492 14.1668 3.33325 10.0002 3.33325ZM10.0002 7.49992C11.1502 7.49992 12.0835 8.43325 12.0835 9.58325C12.0835 10.7333 11.1502 11.6666 10.0002 11.6666C8.85016 11.6666 7.91683 10.7333 7.91683 9.58325C7.91683 8.43325 8.85016 7.49992 10.0002 7.49992ZM10.0002 5.83325C7.9335 5.83325 6.25016 7.51659 6.25016 9.58325C6.25016 11.6499 7.9335 13.3333 10.0002 13.3333C12.0668 13.3333 13.7502 11.6499 13.7502 9.58325C13.7502 7.51659 12.0668 5.83325 10.0002 5.83325Z"
        fill={color}
      />
    </svg>
  );
}