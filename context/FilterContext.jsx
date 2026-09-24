"use client";
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <FilterContext.Provider value={{ selectedSkill, setSelectedSkill }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
