interface LivesProps {
  delta: string;
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const LivesButton = ({ onClick, delta, label, disabled, className = "" }: LivesProps) => {
  return (
    <button
      className={`input-border enabled:hover:bg-accent-hover disabled:bg-accent-disabled cursor-pointer px-3 py-2 disabled:cursor-not-allowed disabled:opacity-65 ${className}`}
      onClick={onClick}
      aria-label={label}
      type="button"
      disabled={disabled}
    >
      {delta}
    </button>
  );
};

export default LivesButton;
