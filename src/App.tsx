import "./App.css";
import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {
  return (
    <div >
      <Header />
      <main className="main">
        <Quiz />
      </main>
    </div>
  );
}

export default App;
