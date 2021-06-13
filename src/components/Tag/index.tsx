import styles from "./styles.scss";

type TagProps = {
    text: string;
};

export const Tag = ({ text }: TagProps): JSX.Element => (
    <span className={styles.tag}>{text}</span>
);
