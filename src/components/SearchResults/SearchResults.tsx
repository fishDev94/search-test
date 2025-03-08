import type { Comment } from "../../types";
import styles from "./search-results.module.scss";
import Card from "../UI/Card/Card";
import { mapComponent } from "../../utils/mapComponents";

export default function SearchResults({
  isActive = false,
  searchResultData = [],
}: {
  isActive: boolean;
  searchResultData?: Comment[];
}) {
  return (
    <ul className={`${styles.search_results} ${isActive ? styles.active : ""}`}>
      {mapComponent(searchResultData, Card, "comment", { type: "result" })}
    </ul>
  );
}
