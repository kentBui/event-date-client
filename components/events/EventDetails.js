import styles from "@/styles/EventDetails.module.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MapEvent from "../common/MapEvent";

const EventDetails = ({ event }) => {
  return event ? (
    <div className={styles.event}>
      <span>
        {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
      </span>
      <h1>{event.name}</h1>

      {event.image && (
        <div className={styles.image}>
          <Image
            src={event.image.formats.large.url}
            alt={event.name}
            width="960"
            height="600"
          />
        </div>
      )}

      <h3>Performers:</h3>
      <p>{event.performers}</p>
      <h3>Description:</h3>
      <p>{event.description}</p>
      <h3>Venue: {event.venue}</h3>
      <p>{event.address}</p>

      <MapEvent event={event} />

      <Link href="/events">
        <a className={styles.back}>Go Back</a>
      </Link>
    </div>
  ) : (
    <></>
  );
};

export default EventDetails;
