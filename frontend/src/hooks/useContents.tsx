import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContents() {
  const [contents, setContents] = useState([]);
  const [name, setName] = useState('')
  const [note, setNote] = useState([])
  const [web, setWeb] = useState([])
  const [youtube, setYoutube] = useState([])
  
  function refresh() {
    axios
      .get(`${BACKEND_URL}/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {setContents(res.data.content)
        setName(res.data.content[0].userId.username)
        setNote(res.data.content.filter(c => c.type == 'note'))
        setWeb(res.data.content.filter(c => c.type == 'web'))
        setYoutube(res.data.content.filter(c => c.type == 'youtube'))
      });
  }


  useEffect(() => {
    refresh();
    let interval = setInterval(() => {
      refresh();
    }, 5 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return { contents, refresh, name,note,web, youtube};
}
