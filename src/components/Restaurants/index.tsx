import { CATEGORIES } from "App";
import { ViewMore } from "components/ViewMore";
import { MutableRefObject, useRef, useState } from "react";
import { Card, FoodInfoType } from "../Card";
import styles from "./styles.scss";

export type RestaurantType = {
    category: string;
    restaurantList: FoodInfoType[];
    addtoRefList?: (
        id: string,
        ref: MutableRefObject<HTMLDivElement>
    ) => MutableRefObject<HTMLDivElement>;
};

export const Restaurants = ({
    category,
    restaurantList,
    addtoRefList
}: RestaurantType): JSX.Element => {
    const categoryRef = useRef<HTMLDivElement>(null);
    const totalLength = restaurantList.length;

    const getInitialDisplayCount = () => {
        if (category === CATEGORIES.SEE_ALL) {
            return totalLength;
        }
        return (totalLength <= 6 && totalLength) || 5;
    };

    const initialDisplayCount = getInitialDisplayCount();

    const [displayCount, setDisplayCount] = useState(initialDisplayCount);

    const displayableList = restaurantList.slice(0, displayCount);
    const nextItemToFetch = totalLength - displayCount;

    const loadMore = () => {
        const fetchCount = nextItemToFetch <= 7 ? nextItemToFetch : 6;
        setDisplayCount((prevDisplayCount) => prevDisplayCount + fetchCount);
    };

    return (
        <div
            className={styles.restaurantContainer}
            ref={addtoRefList(category, categoryRef)}
        >
            <h2 className={styles.restaurantContainerTitle}>{category}</h2>
            <div className={styles.restaurantContainerCardList}>
                {displayableList.map((restaurant, index) => (
                    <Card key={`${index}${restaurant.name}`} {...restaurant} />
                ))}
                {
                    <div className={styles.restaurantContainerViewMore}>
                        <ViewMore count={nextItemToFetch} onClick={loadMore} />
                    </div>
                }
            </div>
        </div>
    );
};
