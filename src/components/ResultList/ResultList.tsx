import type { Post } from "../../types";
import Card from "../UI/Card/Card";

import { paginate, getTotalPages } from "../../utils/pagination";
import { useState } from "react";

import styles from "./result-list.module.scss";

export default function ResultList({ data = [] }: { data?: Post[] }) {
  const [page] = useState(1);

  const printResults = () => {
    return paginate(data, page).map((post, idx) => (
      <Card post={post} key={idx} />
    ));
  };

  const pages = getTotalPages(data);

  return (
    <div className={styles.result_list}>
      <p>page: {pages}</p>
      {printResults()}
    </div>
  );
}
