import { useState, useEffect } from "react";

export default function StudentForm({ fetchStudents, editStudent, setEditStudent }) {
    const [form, setForm] = useState({
        name: "",
        address: "",
        dob: "",
        phone: "",
        feesPaid: false
    });

    useEffect(() => {
        if (editStudent) {
            setForm({
                name: editStudent.name || "",
                address: editStudent.address || "",
                dob: editStudent.dob ? editStudent.dob.slice(0, 10) : "",
                phone: editStudent.phone || "",
                feesPaid: editStudent.feesPaid || false
            });
        }
    }, [editStudent]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editStudent) {
            // ✏️ UPDATE
            await fetch(`http://localhost:5000/api/students/${editStudent._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            setEditStudent(null); // reset edit mode
        } else {
            // ➕ ADD
            await fetch("http://localhost:5000/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
        }

        // reset form
        setForm({
            name: "",
            address: "",
            dob: "",
            phone: "",
            feesPaid: false
        });

        fetchStudents();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <input className="mx-10 border" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            <input className="mx-10 border" name="address" value={form.address} onChange={handleChange} placeholder="Address" /><br />
            <input className="mx-10 border" type="date" name="dob" value={form.dob} onChange={handleChange} />
            <input className="mx-10 border" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />

            <label>
                Fees Paid
                <input className="mx-2" type="checkbox" name="feesPaid" checked={form.feesPaid} onChange={handleChange} />
            </label>

            <button className="bg-cyan-500 text-white mx-2 px-4 py-2 rounded-2xl">
                {editStudent ? "Update Student" : "Add Student"}
            </button>
        </form>
    );
}