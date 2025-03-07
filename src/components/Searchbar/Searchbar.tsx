import { ChangeEvent } from "react";
import AppButton from "../UI/AppButton/AppButton";
import styles from "./searchbar.module.scss";
import useSearchContacts from "../../hook/useSearchContact";

export default function Searchbar({
  value,
  handleSearch = () => {},
  onSumbit = () => {},
}: {
  value: string;
  handleSearch: (arg: string) => void;
  onSumbit: () => void;
}) {
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    handleSearch(value);
  };

  const onSumbitClick = () => {
    onSumbit();
    console.log("onSumbitClick - refetch");
  };

  const { data } = useSearchContacts(value, true);

  console.log("Searchbar - data", data);

  return (
    <div className={styles.searchbar}>
      <input
        className={styles.searchbar__input}
        onInput={handleSearchInput}
        type="text"
        placeholder="search"
      />
      <AppButton text="Search" onClick={onSumbitClick} />
    </div>
  );
}
