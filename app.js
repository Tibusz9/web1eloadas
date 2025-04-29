const { useState } = React;

function Counter() {
  const [count, setCount] = useState(0);

  return React.createElement(
    'div',
    { id: 'szamlalo' },
    React.createElement('h2', null, 'Számláló'),
    React.createElement('p', null, `Érték: ${count}`),
    React.createElement('button', { onClick: () => setCount(count + 1) }, 'Növel'),
    React.createElement('button', { onClick: () => setCount(count - 1) }, 'Csökkent'),
    React.createElement('button', { onClick: () => setCount(0) }, 'Nulláz')
  )
}  

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  function addTodo() {
    if (input.trim() !== "") {
      setTodos([...todos, input]);
      setInput("");
    }
  }

  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, 'Todo lista'),
    React.createElement('input', {
      value: input,
      onChange: (e) => setInput(e.target.value)
    }),
    React.createElement(
      'button',
      { onClick: addTodo },
      'Hozzáadás'
    ),
    React.createElement(
      'ul',
      null,
      todos.map((todo, index) =>
        React.createElement('li', { key: index }, todo)
      )
    )
  );
}

function App() {
  const [page, setPage] = useState("counter");

  return React.createElement(
    'div',
    null,
    React.createElement(
      'nav',
      null,
      React.createElement(
        'button',
        { onClick: () => setPage("counter") },
        'Számláló'
      ),
      React.createElement(
        'button',
        { onClick: () => setPage("todo") },
        'Todo Lista'
      )
    ),
    React.createElement('hr', null),
    page === "counter"
      ? React.createElement(Counter)
      : React.createElement(TodoApp)
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
