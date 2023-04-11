import { useEffect, useState, useRef } from "react";
import {createStrategy} from "guarded-components";

export function useStrategyGenerator() {
    const [strategies, setStrategies] = useState({});
    const trigger = useRef(true);

    //this is to protect against infinate redirects and still allow many non navs to run
    //its only used internally before creating the strategy
    function makeNavBreach(func) {
        return function navBreach() {
            if (trigger.current) {
                trigger.current = false;
                func();
            }
        }
    }

    function useStrategy ({
        key,
        activate,
        shall,
        get,
        breach,
    }) {
        useEffect(()=>{
            if (activate) {
                setStrategies(p=>{
                    const clone = {...p};
                    const safeBreach = makeNavBreach(breach);
                    clone[key] = createStrategy({shall, get, breach: safeBreach});
                    return clone;
                })
            } else {
                setStrategies(p=>{
                    const clone = {...p};
                    delete clone[key];
                    return clone;
                })
            }
        }, [activate]);
    }

    return [Object.values(strategies || {}), useStrategy];
}