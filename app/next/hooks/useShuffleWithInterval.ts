import { useState, useCallback, useEffect } from "react";

export default function useShuffleWithInterval<T>(list: T[]): T {
  const [pickedItem, pickItem] = useState<T>(list[0]);

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * list.length);
    pickItem(list[index]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 1000);
    return () => clearInterval(intervalID);
  }, [shuffle]);
  return pickedItem;
}
