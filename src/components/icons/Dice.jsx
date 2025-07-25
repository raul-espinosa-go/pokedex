export function Dice(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <path d="M16 8h.01M16 12h.01M16 16h.01M8 8h.01M8 12h.01M8 16h.01" />
      </g>
    </svg>
  );
}

export default Dice;
