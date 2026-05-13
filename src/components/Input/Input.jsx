import styles from "./Input.module.scss"
import { useId } from "react";

const Input = ({ label, error, ...props }) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input className={styles.input} id={id} {...props} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
