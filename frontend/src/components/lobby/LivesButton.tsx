interface LivesProps {
  delta: string;
  onClick?: () => void;
  className?: string;
}

const LivesButton = ({ onClick, delta, className }: LivesProps) => {
  return (
    <button className={`input-border hover:bg-accent-hover cursor-pointer px-3 py-2 ${className}`} onClick={onClick}>
      {delta}
    </button>
  );
};

export default LivesButton;
