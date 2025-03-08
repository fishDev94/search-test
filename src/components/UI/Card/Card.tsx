import { useMemo, useState } from "react";
import { Post } from "../../../types";
import styles from "./card.module.scss";

export default function Card({ post }: { post: Post }) {
  const [isShown, setIsShown] = useState(false);
  const [isTextLonger, setTextLonger] = useState(false);

  const handleToggleBody = () => {
    setIsShown(!isShown);
  };

  const body = useMemo(() => {
    const regex = /^[\s\S]{0,64}/;
    const firstString = post.body.match(regex)?.[0];

    if (firstString!.length < post.body.length) {
      setTextLonger(true);
    }

    if (firstString!.length < post.body.length && !isShown) {
      return `${firstString}...`;
    } else if (firstString!.length < post.body.length && isShown) {
      return post.body;
    }

    return `${firstString}`;
  }, [post.body, isShown]);

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
    <div className={styles.card}>
      <h2>{post.name}</h2>
      <p className={styles.card__email}>{post.email}</p>
      <p>
        {body} {printShowBtn()}
      </p>
    </div>
  );
}
