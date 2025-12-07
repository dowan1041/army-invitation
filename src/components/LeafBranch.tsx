export default function LeafBranch() {
  return (
    <svg
      width="200"
      height="40"
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-800"
    >
      {/* Left branch */}
      <path
        d="M100 20 L5 20"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse cx="10" cy="14" rx="8" ry="5" fill="currentColor" transform="rotate(-20 10 14)" />
      <ellipse cx="25" cy="12" rx="8" ry="5" fill="currentColor" transform="rotate(-30 25 12)" />
      <ellipse cx="42" cy="14" rx="8" ry="5" fill="currentColor" transform="rotate(-20 42 14)" />
      <ellipse cx="60" cy="12" rx="8" ry="5" fill="currentColor" transform="rotate(-25 60 12)" />
      <ellipse cx="78" cy="14" rx="8" ry="5" fill="currentColor" transform="rotate(-20 78 14)" />
      <ellipse cx="10" cy="26" rx="8" ry="5" fill="currentColor" transform="rotate(20 10 26)" />
      <ellipse cx="25" cy="28" rx="8" ry="5" fill="currentColor" transform="rotate(30 25 28)" />
      <ellipse cx="42" cy="26" rx="8" ry="5" fill="currentColor" transform="rotate(20 42 26)" />
      <ellipse cx="60" cy="28" rx="8" ry="5" fill="currentColor" transform="rotate(25 60 28)" />
      <ellipse cx="78" cy="26" rx="8" ry="5" fill="currentColor" transform="rotate(20 78 26)" />

      {/* Right branch */}
      <path
        d="M100 20 L195 20"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse cx="190" cy="14" rx="8" ry="5" fill="currentColor" transform="rotate(20 190 14)" />
      <ellipse cx="175" cy="12" rx="8" ry="5" fill="currentColor" transform="rotate(30 175 12)" />
      <ellipse cx="158" cy="14" rx="8" ry="5" fill="currentColor" transform="rotate(20 158 14)" />
      <ellipse cx="140" cy="12" rx="8" ry="5" fill="currentColor" transform="rotate(25 140 12)" />
      <ellipse cx="122" cy="14" rx="8" ry="5" fill="currentColor" transform="rotate(20 122 14)" />
      <ellipse cx="190" cy="26" rx="8" ry="5" fill="currentColor" transform="rotate(-20 190 26)" />
      <ellipse cx="175" cy="28" rx="8" ry="5" fill="currentColor" transform="rotate(-30 175 28)" />
      <ellipse cx="158" cy="26" rx="8" ry="5" fill="currentColor" transform="rotate(-20 158 26)" />
      <ellipse cx="140" cy="28" rx="8" ry="5" fill="currentColor" transform="rotate(-25 140 28)" />
      <ellipse cx="122" cy="26" rx="8" ry="5" fill="currentColor" transform="rotate(-20 122 26)" />
    </svg>
  );
}
