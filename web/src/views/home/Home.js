import TopNavBar from "./TopNavBar";
import Content from "./Content";

const Home = () => (
    <div className="App">
        <header>
            <TopNavBar/>
        </header>
        <main>
            <Content/>
        </main>
    </div>
);

export default Home;