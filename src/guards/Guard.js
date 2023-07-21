import { Guard as Guarded } from "guarded-components";
import { Await } from "./Await";

export function Guard({strategies, hide, after, successHtml, errorHtml, children}) {
    throw new Error("Event info is having an issue where for unregestered accounts it is still showing the dash option")
    return(
        <Await
            after={after}
        >
            <Guarded
                strategy={strategies}
                hide={hide}
                successHtml={successHtml}
                errorHtml={errorHtml}
            >
                {children}
            </Guarded>
        </Await>
    );
}