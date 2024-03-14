type ButtonProps = {
  type: "button" | "submit" | "reset";
  label: string;
  className?: string;
  onClick: () => void;
};

const Button = ({ type, label, className }: ButtonProps) => {
  return (
    <button
      className={
        `
    px-3 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
    ` + className
      }
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
