import { joinClass } from "helpers";
import starIcon from "../../../assets/Icon/star.svg";

import styles from "./styles.scss";

type RatingProp = { rating: string };

export const Rating = ({ rating }: RatingProp): JSX.Element => (
    <div className={joinClass(styles.rating, rating && styles.ratingVisible)}>
        <img src={starIcon} alt="star" className={styles.ratingStarImage} />
        <span>{rating ? rating : "--"}</span>
    </div>
);
