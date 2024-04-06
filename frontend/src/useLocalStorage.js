import { useState, useEffect } from "react";

function useLocalStorage(key, firstValue = null) {
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    console.debug("hooks useLocalStorage useEffect", "item=", item);

    if (item === null) {
      localStorage.removeItem(key);
    } else {
      const trimmedItem = item.replace(/"/g, ''); // Remove double quotes
      localStorage.setItem(key, trimmedItem);
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;
