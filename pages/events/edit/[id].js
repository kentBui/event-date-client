import AddEvent from "@/components/events/AddEvent";
import Layout from "@/components/layout";
import { API_URL } from "@/config/index";
import React from "react";

const EditPage = ({ event }) => {
  return (
    <Layout>
      <AddEvent event={event} />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  const res = await fetch(`${API_URL}/events/${id}`);
  const event = await res.json();

  return {
    props: { event },
  };
}

export default EditPage;
