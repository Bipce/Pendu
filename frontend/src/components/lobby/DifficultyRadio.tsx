interface DifficultyProps {
  id: string;
  label: string;
  className?: string;
}

const DifficultyRadio = ({ id, label, className }: DifficultyProps) => {
  return (
    <div>
      <input type="radio" id={id} className="peer sr-only" name="difficulty" />
      <label
        htmlFor={id}
        className={`input-border hover:bg-accent-hover peer-checked:bg-accent text-content-secondary peer-checked:text-content peer-focus-visible:border-content cursor-pointer px-4 py-2 ${className}`}
      >
        {label}
      </label>
    </div>
  );
};

export default DifficultyRadio;
