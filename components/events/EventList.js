import { PER_PAGE } from "@/config/index";
import React from "react";
import EventItem from "./EventItem";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

const EventList = ({ events, page, total }) => {
  const pageCount = Math.ceil(total / PER_PAGE);
  const router = useRouter();

  const handlePageClick = (data) => {
    router.push(`/events?page=${data.selected + 1}`);
  };
  return (
    <div>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.length > 0 &&
        events.map((evt) => <EventItem key={evt.id} event={evt} />)}

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};

export default EventList;
