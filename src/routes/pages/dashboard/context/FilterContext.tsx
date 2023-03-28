import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo, useEffect
} from "react";
import IDB from "../../../../store/idb";
import { Project } from "../../../../../types/state";

type ContextType = {
  selectedProject: {
    id: string;
    name: string;
  };
};

type ContextApyType = {
  changeProject: (value: string) => void;
};

const Context = createContext<ContextType>({
  selectedProject: { id: "id1", name: "All" }
});
const ContextAPI = createContext<ContextApyType>({} as ContextApyType);

export const useFilterContext = () => useContext(Context);
export const useFilterContextAPI = () => useContext(ContextAPI);

type FilterContextProps = {
  children: ReactNode;
};

function FilterContext({ children }: FilterContextProps) {
  const [selectedProject, setSelectedProject] = useState<Project>({
    id: "id1",
    name: "All",
    notes: []
  } as Project);

  useEffect(() => {
    async function getInitialProject() {
      const response = await IDB.getProject("id1");
      setSelectedProject(response || { id: "id1", name: "All", notes: [] });
    }

    void getInitialProject();
  }, []);

  const changeProject = useCallback(
    async (id: string) => {
      const response = await IDB.getProject(id);
      setSelectedProject(response || { id: "id1", name: "All", notes: [] });
    },
    []
  );
  const memoSelectedProject = useMemo(
    () => ({ selectedProject }),
    [selectedProject]
  );

  const memoChangeProject = useMemo(() => ({ changeProject }), []);

  return (
    <Context.Provider value={memoSelectedProject}>
      <ContextAPI.Provider value={memoChangeProject}>
        {children}
      </ContextAPI.Provider>
    </Context.Provider>
  );
}

export default FilterContext;
