import { Tag } from "components/Tag";
import { joinClass } from "helpers";
import styles from "./styles.scss";

type RestaurantItemType = {
    restaurantItems: {
        category: string;
        restaurentLength: number;
    }[];
    onClick: (category: string) => void;
    selectedCategory: string;
};

export const SideBar = ({
    restaurantItems,
    onClick,
    selectedCategory
}: RestaurantItemType): JSX.Element => {
    return (
        <div className={styles.sidebarContainer}>
            <ul className={styles.sidebarContainerList}>
                {restaurantItems.map(({ category, restaurentLength }) => {
                    return (
                        <li
                            key={category}
                            className={joinClass(
                                styles.sidebarContainerListItem,
                                selectedCategory === category &&
                                    styles.sidebarContainerListItemActive
                            )}
                        >
                            <button
                                className={styles.sidebarContainerListButton}
                                onClick={() => {
                                    onClick(category);
                                }}
                            >
                                {category}
                                <Tag text={`${restaurentLength} OPTIONS`} />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
