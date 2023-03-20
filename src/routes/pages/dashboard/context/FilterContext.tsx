import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from "react";

type ContextType = {
  selectedProject: string;
};

type ContextApyType = {
  changeProject: (value: string) => void;
};

const Context = createContext<ContextType>({ selectedProject: "all" });
const ContextAPI = createContext<ContextApyType>({} as ContextApyType);

export const useFilterContext = () => useContext(Context);
export const useFilterContextAPI = () => useContext(ContextAPI);

type FilterContextProps = {
  children: ReactNode;
};

function FilterContext({ children }: FilterContextProps) {
  const [selectedProject, setSelectedProject] = useState("All");
  const changeProject = useCallback(
    (value: string) => setSelectedProject(value),
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
