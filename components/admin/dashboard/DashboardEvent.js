import React from "react";
import Link from "next/dist/client/link";
import styles from "@/styles/DashboardEvent.module.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

const DashboardEvent = ({ event, deleteEvent }) => {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${event.slug}`}>
          <a>{event.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${event.id}`}>
        <a>
          <FaPencilAlt /> <span>Edit </span>
        </a>
      </Link>

      <a
        href="#"
        className={styles.delete}
        onClick={() => deleteEvent(event.id)}
      >
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
};

export default DashboardEvent;
