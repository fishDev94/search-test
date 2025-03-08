import { useCallback } from "react";
import type { Comment } from "../../types";
import styles from "./search-results.module.scss";
import Card from "../UI/Card/Card";

export default function SearchResults({
  isActive = false,
  searchResultData = [],
}: {
  isActive: boolean;
  searchResultData?: Comment[];
}) {
  const resultList = useCallback(() => {
    return searchResultData.map((comment, idx) => (
      <Card key={idx} comment={comment} />
    ));
  }, [searchResultData]);

  return (
    <ul className={`${styles.search_results} ${isActive ? styles.active : ""}`}>
      {resultList()}
    </ul>
  );
}
