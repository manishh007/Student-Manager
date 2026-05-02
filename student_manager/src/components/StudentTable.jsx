import toast from "react-hot-toast";

export default function StudentTable({ students, onEdit, fetchStudents }) {

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/students/${id}`, {
            method: "DELETE"
        });
        toast.success("Student deleted");
        fetchStudents();
    };

    return (
        <table className="w-full bg-white rounded-xl overflow-hidden shadow-md">
            <thead className="bg-gray-100 text-black">
                <tr>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Address</th>
                    <th className="p-4 text-left">DOB</th>
                    <th className="p-4 text-left">Phone</th>
                    <th className="p-4 text-left">Fees</th>
                    <th className="p-4 text-left">Action</th>
                </tr>
            </thead>

            <tbody>
                {students.map((s) => (
                    <tr
                        key={s._id}
                        className="border-t hover:bg-gray-50 transition"
                    >
                        <td className="p-4 text-left">{s.name}</td>
                        <td className="p-4 text-left">{s.address}</td>
                        <td className="p-4 text-left">{s.dob?.slice(0, 10)}</td>
                        <td className="p-4 text-left">{s.phone}</td>
                        <td className="p-4 text-left">
                            <span className={s.feesPaid ? "text-green-600" : "text-red-500"}>
                                {s.feesPaid ? "Paid" : "Not Paid"}
                            </span>
                        </td>

                        <td className="p-4 space-x-2">
                            <button onClick={() => onEdit(s)} className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded">
                                Edit
                            </button>

                            <button onClick={() => handleDelete(s._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}