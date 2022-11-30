import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.css";

export interface InputProps {
  maxEntites: number;
  pageSize: number;
}

function Pagination({ maxEntites, pageSize = 9 }: InputProps) {
  const search = new URLSearchParams(window.location.href);
  const [params, setParams] = useSearchParams();
  const updatedParams = new URLSearchParams(params.toString());
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    if (search.get("page") !== undefined) {
      updatePage(parseInt(search.get("page") as string, 10));
    }
  }, []);

  useEffect(() => {
    updatedParams.set("page", page.toString());
    setParams(updatedParams.toString());
  }, [page]);

  const updatePage = (newPage: number) => {
    if (newPage < Math.floor(maxEntites / pageSize) && newPage >= 0) {
      setPage(newPage);
    } else if (newPage > Math.floor(maxEntites / pageSize)) {
      setPage(Math.floor(maxEntites / pageSize));
    } else {
      setPage(0);
    }
  };

  return (
    <div className={styles.controlsWrapper}>
      <button onClick={() => updatePage(page - 1)}>Prev</button>
      <input
        type="number"
        className={styles.pageInput}
        onChange={(e) => updatePage(parseInt(e.target.value, 10))}
        value={page.toString()}
      />
      <div>from {Math.abs(Math.floor(maxEntites / pageSize) - 1)}</div>
      <button onClick={() => updatePage(page + 1)}>Next</button>
    </div>
  );
}

export default Pagination;
