import { ChangeEvent, useState } from "react";
import AppButton from "../UI/AppButton/AppButton";
import styles from "./searchbar.module.scss";
import useSearchContacts from "../../hook/useSearchContacts";
import { Post } from "../../types";

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

    if (value.length >= 3) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

    handleSearch(value);
  };

  const { data } = useSearchContacts<Post[]>(value, {
    enabled: isSearching,
    isSubmitted: isSearching,
    key: "searchbar",
  });

  const onSumbitClick = () => {
    onSumbit();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isSearching) {
      onSumbit();
    }
  };

  console.log("Searchbar - data", data?.length);

  return (
    <div className={styles.searchbar}>
      <input
        className={styles.searchbar__input}
        onInput={handleSearchInput}
        type="text"
        placeholder="search"
        onKeyDown={handleKeyDown}
      />
      <AppButton text="Search" onClick={onSumbitClick} disabled={!isSearching} />
    </div>
  );
}
