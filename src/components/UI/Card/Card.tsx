import styles from './card.module.scss';

export default function Card() {
    return (
        <div className={styles.card} >
            <h2>Hello, Card!</h2>
            <p>This is a simple card component.</p>
        </div>
    )
}