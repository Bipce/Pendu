import type { Difficulty } from "../../types/room.types.ts";

interface DifficultyProps {
  id: string;
  label: string;
  className?: string;
  value: Difficulty;
  checked: boolean;
  onSelect: (value: Difficulty) => void;
  disabled?: boolean;
}

const DifficultyRadio = ({ id, label, value, checked, onSelect, disabled, className = "" }: DifficultyProps) => {
  return (
    <div>
      <input
        type="radio"
        id={id}
        className="peer sr-only"
        name="difficulty"
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={`input-border peer-enabled:hover:bg-accent-hover peer-checked:bg-accent text-content-secondary peer-checked:text-content peer-focus-visible:border-content cursor-pointer px-4 py-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-80 ${className}`}
      >
        {label}
      </label>
    </div>
  );
};

export default DifficultyRadio;
