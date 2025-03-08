import { useEffect } from "react";
import AppButton from "../UI/AppButton/AppButton";
import styles from "./paginator.module.scss";

export default function Paginator({
  currentPage,
  totalPages,
  setPage = () => {},
}: {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}) {
  const handlePageChange = (type?: string) => {
    if (type === "next") {
      setPage(++currentPage);
      return;
    }

    setPage(--currentPage);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setPage(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  return (
    <div className={styles.paginator}>
      <AppButton
        text="Prev"
        disabled={currentPage === 1}
        onClick={handlePageChange}
      />
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <AppButton
        text="Next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange("next")}
      />
    </div>
  );
}
