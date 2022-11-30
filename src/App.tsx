import React, { useMemo } from "react";
import "./App.css";
import data from "./api.json";
import Table from "./components/Table/Table";
import { UserType } from "./types";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [params] = useSearchParams();


  // Initial entities calculation
  const entities = useMemo(() => {
    const res: Array<UserType> = [];
    data.results.forEach((user) =>
      res.push({
        gender: user.gender,
        country: user.location.country,
        dob: user.dob.date,
        email: user.email,
        phone: user.phone,
        picture: user.picture.medium,
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
      })
    );
    return res;
  }, [data]);

  // Entities filtering based on search string from query
  const filteredEntities = useMemo(() => {
    const search = params.get("search") !== null ? params.get("search") as string : "";
    return entities.filter((entity) => {
      return Object.values(entity).some((value) =>
        value.toLocaleLowerCase().includes(search.toLowerCase())
      );
    });
  }, [params.get("search")]);

  return (
    <div className="App">
      <SearchBar />
      <Table entities={filteredEntities} propsPageSize={9} />
      <Pagination maxEntites={filteredEntities.length} pageSize={9}/>
    </div>
  );
}

export default App;
