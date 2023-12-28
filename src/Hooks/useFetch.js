import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((json) => {
            setData(json);
            setIsPending(false);
          });
        } else {
          setIsPending({ responseState: `${response.statusText} ${response.status}` });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsPending({ responseState: 'Failed to receive data' });
      });
  }, []);

  return [data, isPending];
};
export default useFetch;
