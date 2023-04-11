export function updateTargetValue(e, val) {
    return {
        ...e,
        target: {
            ...e.target,
            value: val,
        }
    };
}