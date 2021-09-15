import React from "react";
import Layout from "@/components/layout";

import EventList from "@/components/events/EventList";
import { API_URL, PER_PAGE } from "@/config/index";

export default function EventsPage({ events, page, total }) {
  return (
    <Layout title="Events page">
      <h1>Events</h1>
      <EventList events={events} page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  //calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const data = await res.json();

  // fetch total
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  return {
    props: {
      events: data,
      page: +page,
      total,
    },
  };
}
