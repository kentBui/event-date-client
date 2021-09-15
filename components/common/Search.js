import React, { useState } from "react";
import styles from "@/styles/Search.module.css";
import { useRouter } from "next/router";

const Search = () => {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
  };
  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmitSearch}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
};

export default Search;
