export default function LeafDecoration() {
  return (
    <div className="leaf-decoration">
      <svg
        width="80"
        height="160"
        viewBox="0 0 80 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white/80"
      >
        {/* Main stem */}
        <path
          d="M40 160 L40 20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />

        {/* Leaves - left side */}
        <ellipse cx="25" cy="40" rx="18" ry="10" fill="currentColor" transform="rotate(-30 25 40)" />
        <ellipse cx="22" cy="70" rx="16" ry="9" fill="currentColor" transform="rotate(-35 22 70)" />
        <ellipse cx="25" cy="100" rx="14" ry="8" fill="currentColor" transform="rotate(-30 25 100)" />
        <ellipse cx="28" cy="125" rx="12" ry="7" fill="currentColor" transform="rotate(-25 28 125)" />

        {/* Leaves - right side */}
        <ellipse cx="55" cy="55" rx="18" ry="10" fill="currentColor" transform="rotate(30 55 55)" />
        <ellipse cx="58" cy="85" rx="16" ry="9" fill="currentColor" transform="rotate(35 58 85)" />
        <ellipse cx="55" cy="112" rx="14" ry="8" fill="currentColor" transform="rotate(30 55 112)" />
        <ellipse cx="52" cy="138" rx="12" ry="7" fill="currentColor" transform="rotate(25 52 138)" />

        {/* Top leaf */}
        <ellipse cx="40" cy="15" rx="10" ry="15" fill="currentColor" />
      </svg>
    </div>
  );
}
