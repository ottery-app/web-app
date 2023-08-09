import useColors from "../hooks/useColors";
import UnorderedList from "./UnorderedList";
import React, { useEffect, useState } from "react";

export default function OrderedList({
    id,
    className,
    title,
    onClick,
    color,
    children,
    sort,
    maxHeight,
}) {
    color = useColors({color})
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
            color={color}
            maxHeight={maxHeight}
        >
            {childrenArray}
        </UnorderedList>
    );
}