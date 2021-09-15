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
  const res = await fetch(`${API_URL}/events`);

  const data = await res.json();
  const paths = data.map((item) => ({ params: { slug: item.slug } }));

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(ctx) {
  const { slug } = ctx.params;

  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const data = await res.json();

  return {
    props: { event: data[0] },
    revalidate: 10 * 60 * 60,
  };
}

export default EventDetailsPage;
