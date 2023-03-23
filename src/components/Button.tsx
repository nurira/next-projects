type ButtonProps = {
  className?: string;
  variant?: "default" | "primary" | "secondary" | "text";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const VARIANT_STYLES = {
  default:
    "rounded-3xl font-bold hover:scale-110 active:scale-100 transition duration-200 ease-in-out",
  primary: "bg-violet-500 text-white border-transparent hover:bg-violet-600",
  secondary:
    "bg-white text-black border-gray-400 hover:bg-gray-100 border-solid border-2 border-gray-800",
  text: "bg-transparent text-black hover:bg-gray-100",
};

const SIZE_STYLES = {
  sm: "text-md py-1 px-2",
  md: "text-lg px-6 py-2",
  lg: "text-xlg px-8 py-4",
};

const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) => {
  const classNames = `${VARIANT_STYLES.default} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`;
  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};

export default Button;
