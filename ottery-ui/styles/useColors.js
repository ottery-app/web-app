import { colors } from "./colors";

export default function useColors({
    status,
    color,
}) {
    return colors[status] || colors[color] || color;
}