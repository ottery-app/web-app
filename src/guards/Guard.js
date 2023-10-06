import { Guard as Guarded } from "guarded-components";

export function Guard({strategies, hide, successHtml, failHtml, children}) {

    return(
        // <AwaitLoad status={awaitStatus}>
            <Guarded
                strategy={strategies}
                hide={hide}
                successHtml={successHtml}
                failHtml={failHtml}
            >
                {children}
            </Guarded>
        // </AwaitLoad>
    );
}