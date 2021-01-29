import TopNavBar from "../home/TopNavBar";
import ListContent from "./ListContent";

const List = () => (
    <div className="App">
        <header>
            <TopNavBar/>
        </header>
        <main>
            <ListContent/>
        </main>
    </div>
);

export default List;
