import { useDispatch, useSelector } from "react-redux";
import { setSettings, startGame } from "../../store/gameSlice";
import { Link } from "react-router-dom";
import styles from "./Settings.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";

const Settings = () => {
  const dispatch = useDispatch();
  const { rows, cols, mines } = useSelector(state => state.game);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: { rows, cols, mines }
  });

  const values = watch();

  const onSubmit = (data) => {
    dispatch(setSettings(data));
    dispatch(startGame());
  };

  return (
    <div className={styles.settings}>
      <Link className="backBtn" to="/">
        {"<-- Назад"}
      </Link>

      <h2>Налаштування</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Рядки"
          type="number"
          error={errors.rows?.message}
          {...register("rows", {
            required: "Обов'язково",
            min: { value: 5, message: "Мінімум 5" },
            max: { value: 100, message: "Максимум 100" }
          })}
        />

        <Input
          label="Колонки"
          type="number"
          error={errors.cols?.message}
          {...register("cols", {
            required: "Обов'язково",
            min: { value: 5, message: "Мінімум 5" },
            max: { value: 100, message: "Максимум 100" }
          })}
        />

        <Input
          label="Міни"
          type="number"
          error={errors.mines?.message}
          {...register("mines", {
            valueAsNumber: true,
            required: "Обов'язково",
            min: { value: 1, message: "Мінімум 1" },
            validate: (value) => {
              const max = values.rows * values.cols - 1;
              return value <= max || `Максимум: ${max}`;
            }
          })}
        />

        <Button type="submit">
          Застосувати
        </Button>
      </form>
    </div>
  );
};

export default Settings;