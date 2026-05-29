import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContextModal } from "../components/CreateContextModal";
import { ShareIcon } from "../icons/PlusIcon";
import { PlusIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/sidebar";
import { useContents } from "../hooks/useContents";

export function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const content = useContents();
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <div className="bg-gray-100 h-screen">
        <div className="ml-62 p-15">
          <CreateContextModal
            title="add content"
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
          />
          <div className="flex gap-2 justify-end">
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
            />
          </div>
          <div className="pt-4 gap-4 grid grid-cols-4">
            {content.map(({ title, type, link }) => (
              <Card title={title} link={link} type={type} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
