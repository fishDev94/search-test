import { useMemo, useState } from "react";
import type { Comment } from "../../../types";
import styles from "./card.module.scss";

export default function Card({
  comment,
  type = "default",
}: {
  comment: Comment;
  type?: "default" | "result";
}) {
  const [isShown, setIsShown] = useState(false);
  const [isTextLonger, setTextLonger] = useState(false);

  const handleToggleBody = () => {
    setIsShown(!isShown);
  };

  const body = useMemo(() => {
    const regex = /^[\s\S]{0,64}/;
    const firstString = comment.body.match(regex)?.[0];

    if (firstString!.length < comment.body.length) {
      setTextLonger(true);
    }

    if (firstString!.length < comment.body.length && !isShown) {
      return `${firstString}...`;
    } else if (firstString!.length < comment.body.length && isShown) {
      return comment.body;
    }

    return `${firstString}`;
  }, [comment.body, isShown]);

  const showButtonText = useMemo(() => {
    return isShown ? "show less" : "show more";
  }, [isShown]);

  const printShowBtn = () => {
    if (isTextLonger) {
      return (
        <span onClick={handleToggleBody} className={styles["card__body--show"]}>
          {showButtonText}
        </span>
      );
    }
  };

  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <h2>{comment.name}</h2>
      <p className={styles.card__email}>{comment.email}</p>
      <p>
        {body} {printShowBtn()}
      </p>
    </div>
  );
}
