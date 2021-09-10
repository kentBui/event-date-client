import EventList from "@/components/events/EventList";
import Layout from "@/components/layout";
// import absUrl from "next-absolute-url";
import Link from "next/link";
import { API_URL } from "../config";

export default function HomePage({ events }) {
  return (
    <Layout title="DJ events">
      <h1>Upcoming Events</h1>
      <EventList events={events} />
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const res = await fetch(`${API_URL}/api/events`);
  const data = await res.json();
  return {
    props: {
      events: data.events.slice(0, 3),
      revalidate: 10 * 60 * 60,
    },
  };
}
