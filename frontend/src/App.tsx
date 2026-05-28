import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { ShareIcon } from "./icons/PlusIcon";
import { PlusIcon } from "./icons/ShareIcon";

function App() {
  return (
    <>
      <div className="m-15">
        <div className="flex gap-2 justify-end">
          <Button
            variant="primary"
            text="add content"
            startIcon={<PlusIcon />}
          />
          <Button variant="secondary" text="share" startIcon={<ShareIcon />} />
        </div>
        <div className="pt-4 flex gap-4">
          <Card
            title="ai demo"
            link="https://www.youtube.com/watch?v=wrH66MOWqGM"
            type="youtube"
          />
          <Card
            title="ai demo"
            link="https://twitter.com/x/status/807811447862468608"
            type="twitter"
          />
        </div>
      </div>
    </>
  );
}

export default App;
