import { useQuery } from "react-query";

function makeGetQuery(options) {
    return useQuery(options);
}