import { ChangeEvent, useState } from "react";
import AppButton from "../UI/AppButton/AppButton";
import styles from "./searchbar.module.scss";
import useSearchContacts from "../../hook/useSearchContacts";
import { Contact } from "../../types";

export default function Searchbar({
  value,
  handleSearch = () => {},
  onSumbit = () => {},
}: {
  value: string;
  handleSearch: (arg: string) => void;
  onSumbit: () => void;
}) {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 3) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

    handleSearch(value);
  };

  const { data } = useSearchContacts<Contact[]>(value, {
    enabled: isSearching,
    isSubmitted: isSearching,
    key: "searchbar",
  });

  const onSumbitClick = () => {
    onSumbit();
  };

  console.log("Searchbar - data", data?.length);

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
