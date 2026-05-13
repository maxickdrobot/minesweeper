import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./StartGameForm.module.scss"

const StartGameForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    dispatch(setUser(data));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Ім'я"
        error={errors.name?.message}
        {...register("name", { required: "Введи ім'я" })}
      />

      <Input
        label="Email"
        error={errors.email?.message}
        {...register("email", {
          required: "Email обов'язковий",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Невірний email"
          }
        })}
      />

      <Button type="submit">Почати</Button>
    </form>
  );
};

export default StartGameForm;