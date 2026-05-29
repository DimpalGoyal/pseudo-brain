import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContents() {
  const [contents, setContents] = useState([]);
  function refresh() {
    axios
      .get(`${BACKEND_URL}/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setContents(res.data.content));
  }

  useEffect(() => {
    refresh();
    let interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return { contents, refresh };
}
