import styles from "./styles.scss";

type ViewMoreProps = {
    onClick: () => void;
    count: number;
};

export const ViewMore = ({ onClick, count }: ViewMoreProps): JSX.Element =>
    count ? (
        <button
            className={styles.viewMore}
            onClick={onClick}
        >{`+${count} MORE`}</button>
    ) : (
        <></>
    );
