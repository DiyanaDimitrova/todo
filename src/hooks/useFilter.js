import { useEffect, useState } from 'react';

export const useFilter = (todos) => {
  const [resolved, setResolved] = useState(false);
  const [unresolved, setUnresolved] = useState(false);
  const [dotColors, setDotColors] = useState([]);
  const [filterColor, setFilterColor] = useState(null);

  useEffect(() => {
    const uniqueColors = Array.from(new Set(todos?.map((todo) => todo.color)));
    setDotColors(uniqueColors);
  }, [todos]);

  return {
    resolved,
    unresolved,
    setResolved,
    setUnresolved,
    dotColors,
    filterColor,
    setFilterColor,
  };
};
