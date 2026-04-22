import styles from "./Button.module.scss";

const Button = ({ children, className, ...props }) => {
  return (
    <button className={`${styles.btn} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
