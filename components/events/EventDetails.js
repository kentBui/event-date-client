import React from "react";
import styles from "@/styles/EventDetails.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config/index";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const EventDetails = ({ event }) => {
  const router = useRouter();
  const deleteEvent = async () => {
    if (confirm("Are you want delete this event?")) {
      try {
        const res = await fetch(`${API_URL}/events/${event.id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (data.error) {
          toast.error(data.error);
          return;
        } else {
          router.push("/events");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return event ? (
    <div className={styles.event}>
      <div className={styles.control}>
        <Link href={`/events/edit/${event.id}`}>
          <a>
            <FaPencilAlt /> Edit Event
          </a>
        </Link>
        <a href="#" className={styles.delete} onClick={deleteEvent}>
          <FaTimes /> Delete Event
        </a>
      </div>

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

      <Link href="/events">
        <a className={styles.back}>Go Back</a>
      </Link>
    </div>
  ) : (
    <></>
  );
};

export default EventDetails;
