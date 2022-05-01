import React, { useEffect, useState } from "react";
import Table from "./Table";
import { fetchUsers } from "../services";

const Users = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const paramSearchBy = searchParams.get("searchBy") || "";
  const paramSearch = searchParams.get("search") || "";
  const paramSortBy = searchParams.get("sortBy") || "";
  const paramSortOrder = searchParams.get("order") || "asc";
  const paramPage = searchParams.get("page") || 1;
  const paramLimit = searchParams.get("limit") || 10;

  // if getting value set it else empty
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState(
    searchParams.get(paramSearchBy) || paramSearch || ""
  );
  const [searchBy, setSearchBy] = useState(paramSearchBy);
  const [sortBy, setSortBy] = useState(paramSortBy);
  const [sortDirection, setSortDirection] = useState(paramSortOrder);
  const [page, setPage] = useState(paramPage);
  const [limit, setLimit] = useState(paramLimit);

  const fetchAllUsers = async (params) => {
    setLoading(true);
    let users = await fetchUsers(params);
    users = await users.json();
    setUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    const apiParams = {
      page,
      limit,
      [searchBy ? searchBy : "search"]: searchUser,
      sortBy,
      order: sortDirection,
    };
    fetchAllUsers(apiParams);

    const buildUrlParams = {};

    if (page) buildUrlParams.page = page;
    if (limit) buildUrlParams.limit = limit;
    if (searchBy) buildUrlParams.searchBy = searchBy;
    if (searchUser) buildUrlParams[searchBy || "search"] = searchUser;
    if (sortBy) {
      buildUrlParams.sortBy = sortBy;
      buildUrlParams.order = sortDirection || "asc";
    }

    window.history.replaceState(
      null,
      null,
      `?${new URLSearchParams(buildUrlParams)}`
    );
  }, [searchUser, searchBy, sortDirection, sortBy, page, limit]);

  const clearAllFilters = () => {
    setSearchBy("");
    setSearchUser("");
    setSortBy("");
    setSortDirection("");
  };

  // Table configuration
  const theadData = [
    {
      keyIndex: "id",
      label: "ID",
    },
    {
      keyIndex: "name",
      label: "Name",
    },
    {
      keyIndex: "city",
      label: "City",
      render: (item) => (
        <div style={{ fontStyle: "italic", color: "#080eff" }}>{item}</div>
      ),
    },
    {
      keyIndex: "price",
      label: "Price (in doller)",
      render: (item) => {
        return <div>{item} $</div>;
      },
    },
  ];

  return (
    <div className="user-wrapper">
      <h2 className="table-header">Custom Table with custom cell render</h2>
      {/* below filter part can be in different component */}
      <div className="table-filters">
        <div className="d-flex">
          <select
            name="searchBy"
            value={searchBy}
            className="custom-input"
            onChange={(e) => {
              setSearchBy(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Search By</option>
            {theadData.map((item) => (
              <option key={item.keyIndex} value={item.keyIndex}>
                {item.keyIndex}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="custom-input"
            placeholder="Search here"
            value={searchUser}
            onChange={(e) => {
              setSearchUser(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="d-flex">
          <select
            className="custom-input"
            name="sortBy"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Sort By</option>
            {theadData.map((item) => (
              <option key={item.keyIndex} value={item.keyIndex}>
                {item.keyIndex}
              </option>
            ))}
          </select>
          <div>
            <input
              type="radio"
              name="sortDirection"
              onChange={(e) => {
                setSortDirection("asc");
                setPage(1);
              }}
              disabled={!sortBy}
              defaultChecked={sortDirection === "asc"}
            />{" "}
            asc
            <input
              type="radio"
              name="sortDirection"
              onChange={(e) => {
                setSortDirection("desc");
                setPage(1);
              }}
              disabled={!sortBy}
              defaultChecked={sortDirection === "desc"}
            />{" "}
            desc
          </div>
        </div>
        <button className="btn" onClick={clearAllFilters}>
          Clear All Filters
        </button>
      </div>

      {loading ? (
        "Loading..."
      ) : (
        <>
          <Table
            customClass={{ root: "table-root", item: "table-item" }}
            theadData={theadData}
            tbodyData={users}
          />
          <div className="table-footer">
            <button
              className="btn"
              onClick={() => setPage((prev) => +prev - 1)}
              disabled={page == 1}
            >
              Previous
            </button>
            <button
              className="btn"
              onClick={() => setPage((prev) => +prev + 1)}
              disabled={users.length < limit}
            >
              Next
            </button>
          </div>
          <footer className="footer">
            (there is little problem in mock api regarding sorting specially for
            number data, it comparing numberwise.)
          </footer>
        </>
      )}
    </div>
  );
};

export default Users;
