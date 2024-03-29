import React from 'react';

export default function CloseIcon({ width = 20, height = 20, color = 'currentColor' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8332 5.34175L14.6582 4.16675L9.99984 8.82508L5.3415 4.16675L4.1665 5.34175L8.82484 10.0001L4.1665 14.6584L5.3415 15.8334L9.99984 11.1751L14.6582 15.8334L15.8332 14.6584L11.1748 10.0001L15.8332 5.34175Z" fill={color} />
    </svg>
  )
}
