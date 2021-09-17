import React from "react";
import Layout from "@/components/layout";
import AddEvent from "@/components/events/AddEvent";
import parserCookie from "@/utils/cookie.helper";

const AddEventPage = ({ token }) => {
  return (
    <Layout title="Add event page">
      <AddEvent token={token} />
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const { token } = parserCookie(req);

  if (!token) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: { token },
    };
  }
}

export default AddEventPage;
