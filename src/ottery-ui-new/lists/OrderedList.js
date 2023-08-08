import UnorderedList from "./UnorderedList";
import React, { useEffect, useState } from "react";

/**
 * OrderedList is used to display a list of items in a container while provinding an optional way to add new items. Additionally it accepts a function which is used to sort the children.
 * If the onClick is excluded the option to add new items is not available.
 * @param {string} id - The id of the list.
 * @param {string} className - The class name of the list.
 * @param {string} title - The title of the list.
 * @param {*} children - The children of the list that are displayed as a list.
 * @param {function} onClick - The callback function that is called when the add button is clicked.
 * @param {function} sort - a function that sorts the children. Should be made like this: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @returns {React.Component} OrderedListUnorderedList
 */
export default function OrderedList({
    title,
    onClick,
    children,
    sort,
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
            title={title}
            onClick={onClick}
        >
            {childrenArray}
        </UnorderedList>
    );
}