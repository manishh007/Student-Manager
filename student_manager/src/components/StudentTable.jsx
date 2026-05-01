export default function StudentTable({ students, fetchStudents, setEditStudent }) {

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/students/${id}`, {
            method: "DELETE"
        });

        fetchStudents();
    };

    return (
        <table className="mt-5 border w-full">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>DOB</th>
                    <th>Phone</th>
                    <th>Fees</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {Array.isArray(students) && students.map(s => (
                    <tr key={s._id}>
                        <td>{s.name}</td>
                        <td>{s.address}</td>
                        <td>{s.dob?.slice(0, 10)}</td>
                        <td>{s.phone}</td>
                        <td>{s.feesPaid ? "Paid" : "Not Paid"}</td>

                        <td className="space-x-2 space-y-10">
                            <button
                                onClick={() => setEditStudent(s)}
                                className="bg-yellow-400 px-2 rounded-xl text-white my-5 mx-10"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(s._id)}
                                className="bg-red-500 text-white px-2 rounded-xl"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}