import { Guard as Guarded } from "guarded-components";
import { Await } from "./Await";

export function Guard({strategies, hide, after, children}) {
    return <Guarded
        strategy={strategies}
        hide={hide}
    >
        <Await
            after={after}
        >
            {children}
        </Await>
    </Guarded>;
}