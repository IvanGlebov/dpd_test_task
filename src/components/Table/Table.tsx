import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserType } from "../../types";
import styles from "./Table.module.css";

export interface InputProps {
  entities: UserType[];
  propsPageSize: number;
}

function Table({ entities, propsPageSize }: InputProps) {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(propsPageSize);
  const [params, setSearchParams] = useSearchParams();
  const updatedParams = new URLSearchParams(params.toString());

  const [currEntities, setCurrEntities] = useState<UserType[]>();

  const tableRef = useRef<HTMLTableElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  // Set initial params
  useEffect(() => {
    if (params.get("pageSize") !== null)
      setPageSize(parseInt(params.get("pageSize") as string, 10));

    // Calculate max rows number
    const maxHeight = window.innerHeight - 146;
    const rowHeight = 93;
    setPageSize(Math.floor(maxHeight / rowHeight));

    updatedParams.set("pageSize", Math.floor(maxHeight / rowHeight).toString());
    setSearchParams(updatedParams.toString());
  }, []);

  useEffect(() => {
    if (params.get("page") !== null)
      setPage(parseInt(params.get("page") as string, 10));
    setCurrEntities(
      entities.filter(
        // Crop by page size
        (entity, index: number) =>
          index >= page * pageSize && index < (page + 1) * pageSize
      )
    );
  }, [page, pageSize, entities, params]);

  return (
    <table ref={tableRef} className={styles.table}>
      <thead>
        <tr>
          <td>User avatar</td>
          <td>Name</td>
          <td>Gender</td>
          <td>Country</td>
          <td>Date of birth</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
      </thead>
      <tbody ref={tbodyRef}>
        {currEntities?.map((user: UserType) => (
          <tr key={user.email}>
            <td>
              <img src={user.picture} alt="user" />
            </td>
            <td>{user.name}</td>
            <td>{user.gender}</td>
            <td>{user.country}</td>
            <td>
              {new Date(user.dob.toString()).toLocaleString().split(",")[0]}
            </td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
        ))}
        {currEntities?.length === 0 && (
          <tr className={styles.emptyTable}>
            <td>Not found</td>
            <td>Not found</td>
            <td>Not found</td>
            <td>Not found</td>
            <td>Not found</td>
            <td>Not found</td>
            <td>Not found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
