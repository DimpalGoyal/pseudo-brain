import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContextModal } from "../components/CreateContextModal";
import { ShareIcon } from "../icons/PlusIcon";
import { PlusIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/sidebar";
import { useContents } from "../hooks/useContents";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserModal } from "../components/UserModal";

export function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const { contents, refresh, name, note, web, youtube } = useContents();
  const [noteState, setNoteState] = useState(false);
  const [youtubeState, setYoutubeState] = useState(false);
  const [webState, setWebState] = useState(false);
  const [allContents, setAllContent] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    refresh();
  }, [openModal]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const timer = setTimeout(() => {
      if (!token) {
        navigate("/signup");
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div>
        <Sidebar
          noteFilter={() => {
            (setNoteState(true),
              setAllContent(false),
              setWebState(false),
              setYoutubeState(false));
          }}
          home={() => {
            (setAllContent(true),
              setNoteState(false),
              setWebState(false),
              setYoutubeState(false));
          }}
          webBtn={() => {
            (setAllContent(false),
              setNoteState(false),
              setWebState(true),
              setYoutubeState(false));
          }}
          youtubeBtn={() => {
            (setAllContent(false),
              setNoteState(false),
              setWebState(false),
              setYoutubeState(true));
          }}
        />
      </div>
      <div className="bg-gray-100 h-screen">
        <div className="ml-55 p-15">
          <CreateContextModal
            title="add content"
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
          />
          <div className="flex gap-2 justify-end mr-5">
            <Button
              variant="primary"
              text="add content"
              startIcon={<PlusIcon />}
              onClick={() => {
                setOpenModal(true);
              }}
            />
            <Button
              variant="secondary"
              text="share"
              startIcon={<ShareIcon />}
              onClick={async () => {
                const res = await axios.post(
                  `${BACKEND_URL}/brain/share`,
                  {
                    share: true,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  },
                );
                const shareUrl = `localhost:5173/share/${res.data.hash}`;
                alert(shareUrl);
              }}
            />
            <UserModal name={name[0]} />
          </div>
          <div className="pt-4 gap-3 flex flex-wrap">
            {webState &&
              web.map(({ _id, title, type, link }) => (
                <div key={_id}>
                  <Card
                    title={title}
                    link={link}
                    type={type}
                    onClick={() => {
                      axios.delete(`${BACKEND_URL}/content`, {
                        data: { contentId: _id },
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      });
                      refresh();
                    }}
                  />
                </div>
              ))}
            {youtubeState &&
              youtube.map(({ _id, title, type, link }) => (
                <div key={_id}>
                  <Card
                    title={title}
                    link={link}
                    type={type}
                    onClick={() => {
                      axios.delete(`${BACKEND_URL}/content`, {
                        data: { contentId: _id },
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      });
                      refresh();
                    }}
                  />
                </div>
              ))}
            {noteState &&
              note.map(({ _id, title, type, link }) => (
                <div key={_id}>
                  <Card
                    title={title}
                    link={link}
                    type={type}
                    onClick={() => {
                      axios.delete(`${BACKEND_URL}/content`, {
                        data: { contentId: _id },
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      });
                      refresh();
                    }}
                  />
                </div>
              ))}
            {allContents &&
              contents.map(({ _id, title, type, link }) => (
                <div key={_id}>
                  <Card
                    title={title}
                    link={link}
                    type={type}
                    onClick={() => {
                      axios.delete(`${BACKEND_URL}/content`, {
                        data: { contentId: _id },
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      });
                      refresh();
                    }}
                  />
                  <div></div>
                </div>
              ))}
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
