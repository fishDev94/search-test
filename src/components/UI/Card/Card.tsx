import { useMemo } from "react";
import { Post } from "../../../types";
import styles from "./card.module.scss";

export default function Card({ post }: { post: Post }) {
    const body = useMemo(() => {
        const regex = /^[\s\S]{0,64}/;

        return post.body.match(regex)?.[0];
      }, [post.body]);


  return (
    <div className={styles.card}>
      <h2>{post.name}</h2>
      <p className={styles.card__email}>{post.email}</p>
      <p>{body}</p>
    </div>
  );
}
