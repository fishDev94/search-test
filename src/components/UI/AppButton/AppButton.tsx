import styles from './button.module.scss';

export default function AppButton({
  text,
  onClick = () => {},
}: {
  text: string;
  onClick?: () => void;
}) {
  return <button className={styles.app_button} onClick={onClick}>{text}</button>;
}
