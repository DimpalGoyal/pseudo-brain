import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContents() {
  const [contents, setContents] = useState([]);
  const [name, setName] = useState('')
  function refresh() {
    axios
      .get(`${BACKEND_URL}/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {setContents(res.data.content)
        setName(res.data.content[0].userId.username)
      });
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
  return { contents, refresh, name };
}
