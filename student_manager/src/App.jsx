import { useEffect, useState } from "react";
import StudentTable from "./components/StudentTable";
import StudentModal from "./components/StudentModal";

function App() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5000/api/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Student Manager</h1>

        <button
          onClick={() => {
            setEditStudent(null);
            setShowModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-900  text-white px-4 py-2 rounded-2xl"
        >
          + Add Student
        </button>
      </div>

      {/* TABLE */}
      <StudentTable
        students={students}
        onEdit={(student) => {
          setEditStudent(student);
          setShowModal(true);
        }}
        fetchStudents={fetchStudents}
      />

      {/* MODAL */}
      {showModal && (
        <StudentModal
          closeModal={() => setShowModal(false)}
          fetchStudents={fetchStudents}
          editStudent={editStudent}
        />
      )}
    </div>
  );
}

export default App;