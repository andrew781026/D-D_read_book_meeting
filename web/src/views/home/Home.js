import TopNavBar from "./TopNavBar";
import Content from "./Content";

export default () => (
    <div className="App">
        <header>
            <TopNavBar/>
        </header>
        <main>
            <Content/>
        </main>
    </div>
);
