import React from "react";
import Layout from "@/components/layout";
import { API_URL } from "@/config/index";
import EventDetails from "@/components/events/EventDetails";

const EventDetailsPage = ({ event }) => {
  return (
    <Layout title="Event Detail Page">
      <EventDetails event={event} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);

  const data = await res.json();
  const paths = data.events.map((item) => ({ params: { slug: item.slug } }));

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(ctx) {
  const { slug } = ctx.params;

  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const { event } = await res.json();

  return {
    props: { event },
    revalidate: 10 * 60 * 60,
  };
}

export default EventDetailsPage;
