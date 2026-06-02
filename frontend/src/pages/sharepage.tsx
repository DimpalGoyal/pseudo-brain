import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";

export function Sharepage() {
  const { shareLink } = useParams();
  const [username, setUsername] = useState();
  const [content, setContent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BACKEND_URL}/brain/${shareLink}`);

      setUsername(response.data.username);
      setContent(response.data.content);
    }

    fetchData();
  }, [shareLink]);

  return (
    <div className="m-4">
      <div className="justify-center flex pt-4 text-2xl font-semibold font-mono">
        {`shared by ${username}`}
      </div>
      <div className="flex flex-wrap gap-3 m-4 justify-center">
        {content.map(({ title, type, link, _id }) => (
          <div key={_id}>
            <Card title={title} type={type} link={link} />
          </div>
        ))}
      </div>
    </div>
  );
}
