import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="flex flex-col  min-h-screen">
      <h1 className="text-2xl mb-4">Student Manager</h1>

      <StudentForm
        fetchStudents={fetchStudents}
        editStudent={editStudent}
        setEditStudent={setEditStudent}
      />
      <StudentTable
        students={students}
        fetchStudents={fetchStudents}
        setEditStudent={setEditStudent}
      />
    </div>
  );
}

export default App;