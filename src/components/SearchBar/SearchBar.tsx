import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../../utils";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [params, setParams] = useSearchParams();
  const updatedParams = new URLSearchParams(params.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (params.get("search") !== null) {
      setQuery(params.get("search") as string);
      if (inputRef.current !== null) {
        inputRef.current.value = params.get("search") as string;
      }
    }
  }, []);

  useEffect(() => {
    updatedParams.set("search", query);
    setParams(updatedParams.toString());
  }, [query]);

  return (
    <div className={styles.searchWrapper}>
      <h3>Search</h3>
      <input
        className={styles.searchInput}
        ref={inputRef}
        onChange={(e) => debounce(() => setQuery(e.target.value), 500)}
      />
    </div>
  );
}

export default SearchBar;
