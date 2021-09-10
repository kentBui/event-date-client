import React from "react";
import EventItem from "./EventItem";

const EventList = ({ events }) => {
  return (
    <div>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} event={evt} />
      ))}
    </div>
  );
};

export default EventList;
