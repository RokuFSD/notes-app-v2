import React from "react";
import HeadSection from "../../../components/HeadSection";
import FilterContext from "./context/FilterContext";
import ViewContext from "./context/ViewContext";
import FilterSection from "../components/filter/FilterSection";

function DashBoard() {
  return (
    <>
      {/* Header with title and add button */}
      <HeadSection title="Your notes" newItem={() => console.log("test")} />

      {/* Filter section */}
      <FilterContext>
        <FilterSection />
      </FilterContext>

      {/* Notes */}
      <ViewContext>
        <div></div>
      </ViewContext>
    </>
  );
}

export default DashBoard;
