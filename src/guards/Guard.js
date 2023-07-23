import { Guard as Guarded } from "guarded-components";
import { Await } from "./Await";

export function Guard({strategies, hide, after, successHtml, failHtml, children}) {
    return(
        <Await
            after={after}
        >
            <Guarded
                strategy={strategies}
                hide={hide}
                successHtml={successHtml}
                failHtml={failHtml}
                //log
            >
                {children}
            </Guarded>
        </Await>
    );
}