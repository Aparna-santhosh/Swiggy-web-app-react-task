import { Restaurants } from "components/Restaurants";
import { SideBar } from "components/SideBar";
import { FoodInfoType } from "components/Card";
import { fetchData } from "helpers";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import styles from "./styles.scss";

type DataType = {
    category: string;
    restaurantList: FoodInfoType[];
};
type RefType = { [key: string]: MutableRefObject<HTMLDivElement> };

export enum CATEGORIES {
    SEE_ALL = "SEE ALL",
    ONLY_ON_SWIGGY = "Only On Swiggy"
}

const getDimensions = (ele) => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;

    return {
        height,
        offsetTop,
        offsetBottom
    };
};

export const App: React.FC = () => {
    const [dataStore, setDataStore] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const refs: RefType = {};

    //Fetch json data
    useEffect(() => {
        fetchData("http://cdn.adpushup.com/reactTask.json", setDataStore);
    }, []);

    //scroll into corresponding section when sidebar is clicked
    const handleSidebarClick = useCallback((category) => {
        setSelectedCategory(category);
        if (refs[category] && refs[category].current)
            refs[category].current.scrollIntoView();
    }, [refs])

    //set selected category on scroll
    const handleScroll = () => {
        const scrollPosition = window.scrollY + 50;
        Object.entries(refs).forEach(([category, ref]) => {
            const ele = ref.current;
            if (ele) {
                const { offsetBottom, offsetTop } = getDimensions(ele);
                if (
                    scrollPosition > offsetTop &&
                    scrollPosition < offsetBottom
                ) {
                    setSelectedCategory(category);
                }
            }
        });
    };

    //scroll to see all section on change category to see all
    useEffect(() => {
        if (selectedCategory === CATEGORIES.SEE_ALL) {
            refs[selectedCategory].current.scrollIntoView();
        }
    }, [selectedCategory])

    //Add event listener for scroll
    useEffect(() => {
        if (Object.keys(refs).length) {
            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, [refs]);

    //get add restaurant data into single array
    const getSeeAllData = useCallback(
        (): FoodInfoType[] =>
            [].concat(...dataStore.map((item) => item.restaurantList)),
        [dataStore]
    );

    //get only on swiggy data
    const getOnlyOnSwiggy = useCallback(() => {
        return getSeeAllData().filter((data) => data.isExlusive);
    }, [dataStore]);

    //get category items to display on side bar
    const getCategoryItems = useCallback(() => {
        const categories = dataStore.map(({ category, restaurantList }) => ({
            category: category,
            restaurentLength: restaurantList.length
        }));
        const completeCategories = [
            ...categories,
            {
                category: CATEGORIES.ONLY_ON_SWIGGY,
                restaurentLength: onlyOnSwiggy.length
            },
            {
                category: CATEGORIES.SEE_ALL,
                restaurentLength: seeAllData.length
            }
        ];
        return completeCategories;
    }, [dataStore]);

    // add ref to the refs object and return it
    const addtoRefList = (
        id: string,
        categoryRef: MutableRefObject<HTMLDivElement>
    ) => {
        refs[id] = categoryRef;
        return categoryRef;
    };

    // returns elements to display according to selected category
    const getListItems = () => {
        if (selectedCategory === CATEGORIES.SEE_ALL) {
            return (
                <Restaurants
                    key={CATEGORIES.SEE_ALL}
                    category={CATEGORIES.SEE_ALL}
                    restaurantList={seeAllData}
                    addtoRefList={addtoRefList}
                />
            );
        } else {
            return (
                <>
                    {dataStore.map((data: DataType) => (
                        <Restaurants
                            key={data.category}
                            {...data}
                            addtoRefList={addtoRefList}
                        />
                    ))}
                    <Restaurants
                        key={CATEGORIES.ONLY_ON_SWIGGY}
                        category={CATEGORIES.ONLY_ON_SWIGGY}
                        restaurantList={getOnlyOnSwiggy()}
                        addtoRefList={addtoRefList}
                    />
                </>
            );
        }
    };

    const seeAllData = getSeeAllData();
    const onlyOnSwiggy = getOnlyOnSwiggy();
    const categoryItems = getCategoryItems();

    //set initial category to first data after getting the response
    useEffect(() => {
        if (!selectedCategory && categoryItems.length > 2) {
            setSelectedCategory(categoryItems[0].category);
        }
    }, [categoryItems]);

    return (
        <div className={styles.appContainer}>
            <SideBar
                restaurantItems={categoryItems}
                onClick={handleSidebarClick}
                selectedCategory={selectedCategory}
            />
            <main className={styles.main}>{getListItems()}</main>
        </div>
    );
};
