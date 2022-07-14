import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";
import UserCard from "../components/UserCard";
import SearchInput from "../components/SearchInput";
import Loading from "../components/Loading";
import { groupByDate } from "../helpers/groupByDate";
import Select from "../components/Select";
import { MdOutlineCancel } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import debounce from "lodash.debounce";

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

  const renderFilteringByTag = () => {
    if (isEmpty) {
      return " ";
    } else {
      return (
        <span
          style={{ fontSize: "12px", fontWeight: "600", marginRight: "10px" }}
        >
          Filtered By:
        </span>
      );
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (data) {
      setUsers(data.getAllUsers);
      setUsersCopy(data.getAllUsers);
      setAgeOptions([...new Set(data.getAllUsers.map((item) => item.age))]);
      setHeightOptions([
        ...new Set(data.getAllUsers.map((item) => item.height)),
      ]);
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
            <Select
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, age: e.target.value }));
              }}
              data={ageOptions}
              label="age"
            />
            <Select
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, height: e.target.value }));
              }}
              data={heightOptions}
              label="height"
            />
          </div>

          <small>
            {renderFilteringByTag()}
            {Object.values(filter).map(
              (filter) =>
                filter && (
                  <span style={FilterButtonStyles}>
                    {filter}
                    <span
                      style={singleCancelButtonStyles}
                      onClick={() => removeSpecificFilters(filter)}
                    >
                      <GrFormClose size={18} />
                    </span>
                  </span>
                )
            )}
            {!isEmpty && (
              <span onClick={removeAllFilters} style={closeAllStyles}>
                <MdOutlineCancel />
              </span>
            )}
          </small>
          <>
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
          </>
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

const FilterButtonStyles = {
  padding: "2px 10px",
  paddingRight: "0",
  color: "#333",
  backgroundColor: "#ddd",
  border: "none",
  borderRadius: "4px",
  fontSize: "14px",
  marginRight: "3px",
  display: "inline-flex",
  alignItems: "center",
};

const singleCancelButtonStyles = {
  padding: "0 2px 2px",
  margin: "0",
  cursor: "pointer",
};

const closeAllStyles = {
  color: "#777",
  fontSize: "17px",
  marginLeft: "10px",
  cursor: "pointer",
};