import React, { useMemo } from "react";
import HeadSection from "../../../components/HeadSection";
import FilterContext from "./context/FilterContext";
import ViewContext from "./context/ViewContext";
import FilterSection from "../components/filter/FilterSection";
import NotesContainer from "../components/view/NotesContainer";

function DashBoard() {
  const notedata = [
    {
      id: "askljd",
      title: "Home",
      description:
        "DKDKLAJDLkjaskldjaskldjsaDKLAJDLkjaskldjaskldjsaLAJDLkjaskldjaskldjsa1231223123131",
      createdAt: Date.now().toString(),
      color: 1,
    },
    {
      id: "skldj0-932",
      title: "DSl",
      description: "DKLAJDLkjaskldjaskldjsa",
      createdAt: Date.now().toString(),
      color: 2,
    },
    {
      id: "lkjdsf-0923",
      title: "Title",
      description: "DKLAJDLkjaskldjaskldjsa",
      createdAt: Date.now().toString(),
      color: 3,
    },
    {
      id: "lkjdssadsaf-0923",
      title: "New Title",
      description: "KLJSAKLJ23098210938KAKLJFHAD",
      createdAt: Date.now().toString(),
      color: 3,
    },
    {
      id: "lsad0923kjdsf-0923",
      title: "Title",
      description: "DKLAJDLkjaskldjaskldjsa",
      createdAt: Date.now().toString(),
      color: 3,
    },
    {
      id: "lkjdss21312adsaf-0923",
      title: "New Title",
      description: "KLJSAKLJ23098210938KAKLJFHAD",
      createdAt: Date.now().toString(),
      color: 3,
    },
    {
      id: "lkjdsgsfdgsdf-0923",
      title: "Title",
      description: "DKLAJDLkjaskldjaskldjsa",
      createdAt: Date.now().toString(),
      color: 3,
    },
    {
      id: "lkjdssadsa2938293f-0923",
      title: "New Title",
      description: "KLJSAKLJ23098210938KAKLJFHAD",
      createdAt: Date.now().toString(),
      color: 3,
    },
  ];
  const dropOptions = useMemo(
    () => [
      {
        id: "id1",
        name: "All",
      },
      {
        id: "id2",
        name: "Work",
      },
      {
        id: "id3",
        name: "University",
      },
      {
        id: "id4",
        name: "None",
      },
      {
        id: "id5",
        name: "Gym",
      },
      {
        id: "id6",
        name: "Job",
      },
      {
        id: "id7",
        name: "asd",
      },
      {
        id: "id8",
        name: "Group",
      },
    ],
    []
  );

  return (
    <>
      {/* Header with title and add button */}
      <HeadSection title="Your notes" newItem={() => console.log("test")} />

      {/* Filter section */}
      {/* TODO: The selector of the view here*/}
      <FilterContext>
        <FilterSection data={dropOptions} />
      </FilterContext>

      {/* Notes */}
      <ViewContext>
        <NotesContainer data={notedata} />
      </ViewContext>
    </>
  );
}

export default DashBoard;
