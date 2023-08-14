import { Guard as Guarded } from "guarded-components";
import { Await } from "./Await";

export function Guard({strategies, hide, after, successHtml, failHtml, children}) {
    return(
        // <AwaitLoad status={awaitStatus}>
            <Await after={after}>
                <Guarded
                    strategy={strategies}
                    hide={hide}
                    successHtml={successHtml}
                    failHtml={failHtml}
                >
                    {children}
                </Guarded>
            </Await>
        // </AwaitLoad>
    );
}