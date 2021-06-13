import { images } from "./constants";

export const fetchData = (url: string, callBack: (data) => void): void => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            callBack(data);
        });
};

export const getRandomImage = (items: string[] = images): string =>
    items[Math.floor(Math.random() * items.length)];

export const joinClass = (...classNames: string[]): string => {
    return classNames.filter((className: string) => !!className).join(" ");
};
