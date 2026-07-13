interface TertiaryTitleProps {
  title: string;
  className?: string;
}

const TertiaryTitle = ({ title, className }: TertiaryTitleProps) => {
  return <h3 className={`text-content-secondary mb-3 ${className}`}>{title}</h3>;
};

export default TertiaryTitle;
