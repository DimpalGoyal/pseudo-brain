import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContents() {
  const [contents, setContents] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setContents(res.data.content));
  }, []);
  return contents;
}
