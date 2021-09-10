import React from "react";
import Layout from "@/components/layout";

import EventList from "@/components/events/EventList";
import { API_URL } from "@/config/index";

export default function EventsPage({ events }) {
  return (
    <Layout title="Events page">
      <h1>Events</h1>
      <EventList events={events} />
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const res = await fetch(`${API_URL}/api/events`);
  const data = await res.json();
  return {
    props: {
      events: data.events,
      revalidate: 10 * 60 * 60,
    },
  };
}
