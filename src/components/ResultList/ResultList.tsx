import type { Comment } from "../../types";
import Card from "../UI/Card/Card";

import { paginate, getTotalPages } from "../../utils/pagination";
import { useState } from "react";

import styles from "./result-list.module.scss";
import { mapComponent } from "../../utils/mapComponents";

export default function ResultList({ data = [] }: { data?: Comment[] }) {
  const [page] = useState(1);

  const pages = getTotalPages(data);

  return (
    <div className={styles.result_list}>
      <p>page: {pages}</p>
      {mapComponent(paginate(data, page), Card, "comment")}
    </div>
  );
}
