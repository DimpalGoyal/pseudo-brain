import { Button } from "./components/Button"
import { ShareIcon } from "./icons/PlusIcon"
import { PlusIcon } from "./icons/ShareIcon"

function App() {

  return (
    <>
    <div>
    <Button variant="primary" text="add" startIcon={<PlusIcon/>}/>
    <Button variant="secondary" text="share" startIcon={<ShareIcon/>}/>

    </div>
    </>
  )
}

export default App
