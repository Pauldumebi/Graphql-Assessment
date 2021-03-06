import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";
import UserCard from "../components/UserCard";
import SearchInput from "../components/SearchInput";
import Loading from "../components/Loading";
import { groupByDate } from "../helpers/groupByDate";
import Filter from "../components/Filter";
import debounce from "lodash.debounce";
import FilterLabel from "../components/FilterLabel";
import { localeCompare } from "../helpers/localCompare";

const Home = () => {
  const { error, loading, data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);
  const [usersCopy, setUsersCopy] = useState([]);
  const [ageOptions, setAgeOptions] = useState([]);
  const [heightOptions, setHeightOptions] = useState([]);
  const [filter, setFilter] = useState({ age: null, height: null });

  const handleSearch = debounce((e) => {
    setUsers(
      usersCopy.filter(
        (item) =>
          item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.age.includes(e.target.value) ||
          item.height.includes(e.target.value)
      )
    );
  }, 500);

  const removeAllFilters = () => {
    setFilter((prev) => ({ ...prev, age: "", height: "" }));
  };

  const removeSpecificFilters = (filterType) => {
    if (filterType === filter.age) setFilter((prev) => ({ ...prev, age: "" }));
    if (filterType === filter.height)
      setFilter((prev) => ({ ...prev, height: "" }));
  };

  const isEmpty = Object.values(filter).every((x) => x === null || x === "");

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (data) {
      setUsers(data.getAllUsers);
      setUsersCopy(data.getAllUsers);
      setAgeOptions(
        [...new Set(data.getAllUsers.map((item) => item.age))].sort(localeCompare)
      );
      setHeightOptions(
        [...new Set(data.getAllUsers.map((item) => item.height))].sort(localeCompare)
      );
    }
  }, [data, error]);

  useEffect(() => {
    const { age, height } = filter;
    const handleFilter = () => {
      let newData;

      if (age && height) {
        newData = data.getAllUsers.filter(
          (item) => age === item.age && height === item.height
        );
      } else if (age) {
        newData = data.getAllUsers.filter((item) => age === item.age);
      } else if (height) {
        newData = data.getAllUsers.filter((item) => height === item.height);
      } else {
        newData = data.getAllUsers;
      }
      setUsersCopy(newData);
      setUsers(newData);
    };

    if (age !== null || height !== null) {
      handleFilter();
    }
  }, [filter]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ padding: "2rem 10%" }}>
          <SearchInput handleSearch={handleSearch} />
          <div style={selectDivStyles}>
            <Filter
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, age: e.target.value }));
              }}
              data={ageOptions}
              label="age"
            />
            <Filter
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, height: e.target.value }));
              }}
              data={heightOptions}
              label="height"
            />
          </div>

          <FilterLabel
            isEmpty={isEmpty}
            filter={filter}
            removeSpecificFilters={removeSpecificFilters}
            removeAllFilters={removeAllFilters}
          />

          {users.length ? (
            <div>
              {groupByDate(users).map((val, index) => (
                <div key={index}>
                  <div style={dateStyles}>{val.date}</div>
                  {val.items.map((item) => {
                    return <UserCard val={item} key={item.id} />;
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div style={noDataStyles}>No data</div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;

const dateStyles = {
  margin: "3rem 0 1rem 0",
  fontWeight: "bold",
  fontSize: "24px",
};

const noDataStyles = {
  textAlign: "center",
  margin: "5rem",
  padding: "2rem",
  border: "1px solid black",
};

const selectDivStyles = {
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "row",
  width: "50%",
  margin: "0 auto",
};