import { useEffect, useState, createElement } from "react";

export function QueueForm({
    onSubmit=()=>{}, //will be given form
    initTodo=[], //strings of things to do
    pages=[
        // {
        //     key: "string", //used to identify the page
        //     page: reactElement, //component to show the page
        //     trailing: false, //used to sort it to the back of the list
        //     repeatable: false, //used to make sure that it does not repeate
        //     mainFlow: ["Key"]
        //     subFlow: ["Key"]
        //     errorFlow: ["Key"]
        // }
    ]
}) {
    const [current, setCurrent] = useState();
    const [todo, setTodo] = useState(initTodo);
    const [display, setDisplay] = useState();
    const [form, setForm] = useState({});

    function applySettings(toAdd) {
        const mapPages = new Map();
        const mapCurrent = new Map();
        pages.forEach((page)=>{
            mapPages.set(page.key, page);
        });

        return toAdd
            .filter((key)=>{
                //add it to the
                if (!mapCurrent.get(key)) {
                    mapCurrent.set(key, true);
                    return true;
                } else if (mapPages.get(key).repeatable) {
                    return true;
                } else {
                    return false;
                }
            })
            .sort((aKey,bKey)=>{
                const a = mapPages.get(aKey);
                const b = mapPages.get(bKey);
                if (a.trailing == b.trailing) {
                    return 0;
                } else if (a.trailing && !b.trailing) {
                    return 1
                } else if (b.trailing && !a.trailing) {
                    return -1;
                }
            });
    }

    async function onNext(todoKeys=[], fields={}) {
        setCurrent(undefined);
        const doThis = applySettings([...todo, ...todoKeys]);
        setTodo(doThis);

        //when there is nothing left submit
        if (doThis.length === 0) {
            await onSubmit(form);
        } else {
            setForm(p=>{
                return {
                    ...p,
                    ...fields,
                }
            })
        }
    }

    //if the todo or current is updated then the queue should be updated
    useEffect(()=>{
        if (current === undefined && todo.length) {
            //sort the todo list here
            let doThisNext = todo.shift();
            const page = pages.find((page)=>page.key === doThisNext);
            setCurrent(doThisNext);
            if (page) {
                setDisplay(page);
            }
            setTodo([...todo]);
        }
    }, [current, todo]);

    return display && createElement(display.page, {
        form: form,
        onDone: onNext,
        mainFlow: display.mainFlow,
        subFlow: display.subFlow,
        errorFlow: display.errorFlow,
    });
}