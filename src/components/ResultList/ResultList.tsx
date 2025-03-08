import type { Comment } from "../../types";
import Card from "../UI/Card/Card";

import { paginate, getTotalPages } from "../../utils/pagination";
import { useState } from "react";

import styles from "./result-list.module.scss";
import { mapComponent } from "../../utils/mapComponents";
import Paginator from "../Paginator/Paginator";

export default function ResultList({ data = [] }: { data?: Comment[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = getTotalPages(data);

  return (
    <div className={styles.result_list}>
      <Paginator
        currentPage={currentPage}
        totalPages={pages}
        setPage={setCurrentPage}
      />
      {mapComponent(paginate(data, currentPage), Card, "comment")}
    </div>
  );
}
