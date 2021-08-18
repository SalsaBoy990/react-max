import "./App.css";

import Todo from "./components/Todo/Todo";

function App() {
  return (
    <div>
      <h1>My Todos</h1>
      <Todo title="Learn React" />
      <Todo title="Master React" />
      <Todo title="Master React 2" />
    </div>
  );
}

export default App;
