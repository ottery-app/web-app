import { RRule } from "rrule";

export const activeEvent = (event) => {
    const rrule = RRule.fromString(event.rrule);
    const eventOccurrences = rrule.between(startOfWeek, endOfWeek);

    // Filter out events that occur within the start and end of the current week
    if (eventOccurrences.every((date) => date.getDay() !== currentDate.getDay())) {
        const start = new Date(event.start);
        const end = new Date(event.start + event.duration); // Assuming event.duration is in milliseconds

        // Check if the time of the currentDate falls between the start and end times of the event
        const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
        const eventStartTime = start.getHours() * 60 + start.getMinutes();
        const eventEndTime = end.getHours() * 60 + end.getMinutes();

        // Check if the current time is within the event's time range
        if (currentTime >= eventStartTime && currentTime <= eventEndTime) {
            return true; // Include the event if the current time is within the event's time range
        }

        return false;
    }

    return false;
}