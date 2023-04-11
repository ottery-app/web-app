import UnorderedList from "./UnorderedList";
import React, { useEffect, useState } from "react";

/**
 * OrderedList is used to display a list of items in a container while provinding an optional way to add new items. Additionally it accepts a function which is used to sort the children.
 * If the onClick is excluded the option to add new items is not available.
 * @param {string} id - The id of the list.
 * @param {string} className - The class name of the list.
 * @param {string} title - The title of the list.
 * @param {string} primaryColor - The primary color of the list. can be a hex value or a color name.
 * @param {string} secondaryColor - The secondary color of the list. can be a hex value or a color name.
 * @param {string} primaryTextColor - The primary text color of the list. can be a hex value or a color name.
 * @param {string} radius - The radius of the list. can be any css sizing property.
 * @param {*} children - The children of the list that are displayed as a list.
 * @param {function} onClick - The callback function that is called when the add button is clicked.
 * @param {function} sort - a function that sorts the children. Should be made like this: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @returns {React.Component} OrderedListUnorderedList
 */
export default function OrderedList({
    id,
    className,
    title,
    onClick,
    primaryColor,
    secondaryColor,
    primaryTextColor,
    children,
    sort,
    maxHeight,
}) {
    const [childrenArray, setChildrenArray] = useState([]);

    useEffect(()=>{
        if (children) {
            if (children instanceof Array) {
                setChildrenArray([...children].sort(sort));
            } else {
                setChildrenArray([children]);
            }
        } else {
            setChildrenArray([]);
        }
    }, [children]);

    useEffect(()=>{
        if (sort===undefined) {
            console.warn("oui: Warning. OrderedList has no sort. Displaying images in unsorted order.");
        }
    },[])
    
    return(
        <UnorderedList
            id={id}
            className={className}
            title={title}
            onClick={onClick}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            primaryTextColor={primaryTextColor}
            maxHeight={maxHeight}
        >
            {childrenArray}
        </UnorderedList>
    );
}