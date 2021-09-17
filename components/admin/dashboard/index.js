import React from "react";
import DashboardEvent from "./DashboardEvent";
import styles from "@/styles/Dashboard.module.css";
import { toast } from "react-toastify";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";

const Dashboard = ({ events, token }) => {
  const router = useRouter();
  const deleteEvent = async (id) => {
    if (confirm("Are you want delete this event?")) {
      try {
        const res = await fetch(`${API_URL}/events/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log(data);

        if (data.error) {
          toast.error(data.error);
          return;
        } else {
          router.push("/events");
          // router.reload();// IF WANT TO STAY IN DASHBOARD
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className={styles.dash}>
      <h1>Dashboard</h1>
      <h3>My Events</h3>
      {events?.length > 0 &&
        events.map((event) => (
          <DashboardEvent
            key={event.id}
            event={event}
            deleteEvent={deleteEvent}
          />
        ))}
    </div>
  );
};

export default Dashboard;
