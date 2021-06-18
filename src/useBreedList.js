import { useState, useEffect } from "react";

const useBreedList = (animal) => {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("Unloaded");
  const localCache = {};

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
    async function requestBreedList() {
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();

      localCache[animal] = json.breeds || [];

      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]); //eslint-disable-line

  return [breedList, status];
};

export default useBreedList;
