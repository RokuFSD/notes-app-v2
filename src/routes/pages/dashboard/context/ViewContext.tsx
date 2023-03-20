import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

type ContextType = {
  selectedView: "list" | "grid";
};

type ContextApyType = {
  changeView: Dispatch<SetStateAction<string>>;
};

const Context = createContext<ContextType>({ selectedView: "grid" });
const ContextAPI = createContext<ContextApyType>({} as ContextApyType);

export const useViewContext = () => useContext(Context);
export const useViewContextAPI = () => useContext(ContextAPI);

type ViewContextProps = {
  children: ReactNode;
};

function ViewContext({ children }: ViewContextProps) {
  const [selectedView, setSelectedView] = useState<"list" | "grid">("grid");
  const changeView = useCallback(() => setSelectedView, []);
  const memoSelectedView = useMemo(() => ({ selectedView }), [selectedView]);
  const memoChangeView = useMemo(() => ({ changeView }), []);

  return (
    <Context.Provider value={memoSelectedView}>
      <ContextAPI.Provider value={memoChangeView}>
        {children}
      </ContextAPI.Provider>
    </Context.Provider>
  );
}

export default ViewContext;
