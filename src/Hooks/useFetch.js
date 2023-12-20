import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((json) => {
            setData([...json]);
            setIsPending(false);
          });
        } else {
          console.log(response.statusText);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return [data, isPending];
};
export default useFetch;
