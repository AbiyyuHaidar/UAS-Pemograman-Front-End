import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FormInput from './components/FormInput';

function App() {
  const [todos, setTodos] = useState([]);

  // AMBIL DATA (READ)
  useEffect(() => {
    const localData = localStorage.getItem('uas-todos');
    if (localData) {
      setTodos(JSON.parse(localData));
    } else {
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
        .then(res => res.json())
        .then(data => {
          const initData = data.map(item => ({
            id: item.id, text: item.title, completed: item.completed
          }));
          setTodos(initData);
        });
    }
  }, []);

  // SIMPAN DATA
  useEffect(() => {
    localStorage.setItem('uas-todos', JSON.stringify(todos));
  }, [todos]);

  // TAMBAH DATA (CREATE)
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text: text, completed: false };
    setTodos([newTodo, ...todos]);
  };

  // HAPUS DATA (DELETE)
  const deleteTodo = (id) => {
    if(confirm("Hapus tugas ini?")) setTodos(todos.filter(t => t.id !== id));
  };

  // EDIT STATUS (UPDATE)
  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 max-w-xl">
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-xl font-bold mb-4">Daftar Tugas</h2>
          <FormInput onAdd={addTodo} />

          <div className="space-y-2">
            {todos.map(todo => (
              <div key={todo.id} className={`flex justify-between p-3 border rounded ${todo.completed ? 'bg-green-100' : ''}`}>
                <span 
                  onClick={() => toggleTodo(todo.id)} 
                  className={`cursor-pointer flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(todo.id)} className="text-red-500 font-bold ml-2">X</button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;