import styles from "./button.module.scss";

export default function AppButton({
  text,
  disabled = false,
  onClick = () => {},
}: {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`${styles.app_button} ${disabled ? styles.inactive : ""}`}
      onClick={onClick}
      disabled={disabled}
      name="app_button"
    >
      {text}
    </button>
  );
}
