import TopNavBar from "../home/TopNavBar";
import CreateContent from "./CreateContent";

const CreateEvent = () => (
    <div className="App">
        <header>
            <TopNavBar/>
        </header>
        <main>
            <CreateContent/>
        </main>
    </div>
);

export default CreateEvent;
