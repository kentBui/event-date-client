import React from "react";
import styles from "@/styles/EventItem.module.css";
import Link from "next/link";
import Image from "next/image";

const EventItem = ({ event }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={event.image ? event.image : "/images/event-default.png"}
          alt={event.name}
          width="170"
          height="100"
          layout="responsive"
        />
      </div>
      <div className={styles.info}>
        <span>
          {event.date} at {event.time}
        </span>
        <Link href={`/events/${event.slug}`}>
          <a>
            <h3>{event.name}</h3>{" "}
          </a>
        </Link>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${event.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
