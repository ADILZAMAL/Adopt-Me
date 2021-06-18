import Pet from "./Pet";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name="Luna" animal="Dog" breed="Havanese" />
      <Pet name="Ruma" animal="Bird" breed="Ramsa" />
      <Pet name="Sandy" animal="Cow" breed="Mix" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
