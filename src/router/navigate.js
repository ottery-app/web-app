export function getUrlVal(val) {
    return new URL(window.location.href).searchParams.get(val);
}

export function makeUrl(dest, props) {
    if (props) {
        let url = dest;
        let tail = "?";

        Object.entries(props).forEach((arr)=>{
            if (arr[1]) {
                if (url.indexOf(":" + arr[0]) === -1) {
                    tail = tail + arr[0] + "=" + arr[1] + "&";
                } else {
                    url = url.replaceAll(":" + arr[0], arr[1]);
                }
            }
        });

        return url + ((tail.length > 1) ? tail.slice(0, -1) : "");
    } else {
        return dest;
    }
}