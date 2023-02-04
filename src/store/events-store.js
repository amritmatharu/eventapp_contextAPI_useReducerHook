//Step 2: Create reducer function
const eventReducer = (events = [], action) => {
  if (action.type === "all-events") {
    let payload = action.payload;
    payload = payload.map((event) => ({ ...event, selected: false }));
    return [...events, ...payload];
  } else if (action.type === "select-event") {
    const selectedEvents = events.filter((event) => event.selected);
    const currSelEvent = events.find((event) => event.id === action.payload);
    let isConflictingTime = false;
    if (currSelEvent && selectedEvents && selectedEvents.length) {
      const currEventStartDate = new Date(currSelEvent.start_time);
      const currEventEndDate = new Date(currSelEvent.end_time);

      for (let i = 0; i < selectedEvents.length; i++) {
        const startTime = new Date(selectedEvents[i].start_time);
        const endTime = new Date(selectedEvents[i].end_time);
        if (
          (currEventStartDate.getTime() >= startTime.getTime() &&
            currEventStartDate.getTime() <= endTime.getTime()) ||
          (currEventEndDate.getTime() >= startTime.getTime() &&
            currEventEndDate.getTime() <= endTime.getTime())
        ) {
          isConflictingTime = true;
          break;
        }
      }
    }
    if (selectedEvents.length < 3 && !isConflictingTime) {
      return events.map((event) => {
        if (event.id === action.payload) {
          return { ...event, selected: true };
        } else {
          return event;
        }
      });
    } else {
      return events;
    }
  } else if (action.type === "remove-event") {
    return events.map((event) => {
      if (event.id === action.payload) {
        return { ...event, selected: false };
      } else {
        return event;
      }
    });
  }

  return events;
};
export default eventReducer;
