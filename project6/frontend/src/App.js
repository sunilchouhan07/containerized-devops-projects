import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");

  // IMPORTANT: Docker network hostname
  const API = "/api";

  const loadEmployees = async () => {
    try {
      const res = await fetch(`${API}/employees`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      alert("Backend not reachable");
    }
  };

  const addEmployee = async () => {
    if (!name) return;

    await fetch(`${API}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });

    setName("");
    loadEmployees();
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="container">
      <h1>🚀 Project 4 (Cache + Worker)</h1>

      <div className="box">
        <input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addEmployee}>Add</button>
      </div>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>{emp.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;