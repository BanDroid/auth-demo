import { useEffect, useState } from "react";

export { useFetch };

function useFetch(url: string, opt: RequestInit | undefined = undefined) {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal, ...opt })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw res.status === 404
            ? new Error("Could not found what you're looking for")
            : new Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.info("fetch aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
}
