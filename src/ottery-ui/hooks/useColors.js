import { colors } from "../styles/colors";

export default function useColors({
    status,
    color,
}) {
    return colors[status] || colors[color] || color;
}