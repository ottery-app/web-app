export default function makeArr(val) {
    if (!val.length) {
        val = [val];
    }

    return val;
}