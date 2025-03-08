import { ChangeEvent, useCallback, useMemo, useState } from "react";
import AppButton from "../UI/AppButton/AppButton";
import styles from "./searchbar.module.scss";
import useSearchContacts from "../../hook/useSearchContacts";
import { Comment } from "../../types";
import SearchResults from "../SearchResults/SearchResults";

export default function Searchbar({
  value,
  handleSearch = () => {},
  onSumbit = () => {},
  onClear = () => {},
}: {
  value: string;
  handleSearch: (arg: string) => void;
  onSumbit: () => void;
  onClear: () => void;
}) {
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchResultsOpened, setIsSearchResultsOpened] = useState(false);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length >= 3) {
      setIsSearching(true);
      setIsSearchResultsOpened(true);
    } else {
      setIsSearching(false);
      setIsSearchResultsOpened(false);
    }

    handleSearch(value);
  };

  const { data } = useSearchContacts<Comment[]>(value, {
    enabled: isSearching,
    isSubmitted: isSearching,
    key: "searchbar",
  });

  const onSumbitClick = () => {
    onSumbit();
    setIsSearchResultsOpened(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isSearching) {
      onSumbitClick();
    }
  };

  const isSearchResults = useMemo(() => {
    return data ? data.length > 0 : false;
  }, [data]);

  const clearValue = () => {
    handleSearch("");
    setIsSearching(false);
    setIsSearchResultsOpened(false);
    onClear();
  };

  const clearButton = useCallback(() => {
    return (
      value.length > 0 && (
        <span
          onClick={clearValue}
          className={styles.searchbar__container_clear}
        >
          clear
        </span>
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={styles.searchbar}>
      <div className={styles.searchbar__container}>
        <input
          className={styles.searchbar__container_input}
          onInput={handleSearchInput}
          type="text"
          placeholder="search"
          onKeyDown={handleKeyDown}
          value={value}
        />
        {clearButton()}
        <AppButton
          text="Search"
          onClick={onSumbitClick}
          disabled={!isSearching}
        />
      </div>
      <SearchResults
        isActive={isSearchResults && isSearchResultsOpened}
        searchResultData={data}
      />
    </div>
  );
}
