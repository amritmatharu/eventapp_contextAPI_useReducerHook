import { useEffect } from "react";

const SearchEvents = (props) => {
  const searchEventHandler = (e) => {
    props.onSearch(e.target.value);
  };
  return (
    <div className="header-search">
      <div className="all-events-header">All Events</div>
      <input type="text" onChange={searchEventHandler} />
    </div>
  );
};
export default SearchEvents;
