interface LivesProps {
  delta: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

const LivesButton = ({ onClick, delta, label, className = "" }: LivesProps) => {
  return (
    <button
      className={`input-border hover:bg-accent-hover cursor-pointer px-3 py-2 ${className}`}
      onClick={onClick}
      aria-label={label}
      type="button"
    >
      {delta}
    </button>
  );
};

export default LivesButton;
