import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from "react";
import { dropOptions } from "../../../../mocks/api";

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
  selectedProject: { id: "id1", name: "All" },
});
const ContextAPI = createContext<ContextApyType>({} as ContextApyType);

export const useFilterContext = () => useContext(Context);
export const useFilterContextAPI = () => useContext(ContextAPI);

type FilterContextProps = {
  children: ReactNode;
};

const allProjects = new Map();
dropOptions.forEach((option) => {
  allProjects.set(option.id, { id: option.id, name: option.name });
});

function FilterContext({ children }: FilterContextProps) {
  const [selectedProject, setSelectedProject] = useState<{
    id: string;
    name: string;
  }>(allProjects.get(dropOptions[0].id));

  const changeProject = useCallback(
    (id: string) => setSelectedProject(allProjects.get(id)),
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
