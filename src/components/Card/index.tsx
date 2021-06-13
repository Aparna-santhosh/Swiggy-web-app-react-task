import { getRandomImage } from "helpers";
import { Rating } from "../Rating";
import { Tag } from "../Tag";
import styles from "./styles.scss";

export type FoodInfoType = {
    name: string;
    food_types: string[];
    ratings: string;
    isExlusive: boolean;
    delivery_time: string;
    price_for_two: string;
};

export const Card = ({
    name,
    food_types: foodTypes,
    ratings,
    delivery_time: deliveryTime,
    price_for_two: priceForTwo
}: FoodInfoType): JSX.Element => {
    const imageUrl = getRandomImage();
    return (
        <div className={styles.cardContainer}>
            <img className={styles.cardContainerImage} src={imageUrl} />
            <section className={styles.cardContainerDetails}>
                <h4>{name}</h4>
                <Tag text={foodTypes.join(", ")} />
            </section>
            <section className={styles.cardContainerMoreDetails}>
                <Rating rating={ratings} />
                <span className={styles.cardContainerSeperator} />
                <Tag text={deliveryTime} />
                <span className={styles.cardContainerSeperator} />
                <Tag text={`${priceForTwo} FOR TWO`} />
            </section>
            <section className={styles.cardContainerQuickView}>
                QUICK VIEW
            </section>
        </div>
    );
};
