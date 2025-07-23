export function Mars(props) {
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
        <path d="M16 3h5v5m0-5l-6.75 6.75" />
        <circle cx="10" cy="14" r="6" />
      </g>
    </svg>
  );
}

export default Mars;
