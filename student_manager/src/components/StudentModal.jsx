import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function StudentModal({ closeModal, fetchStudents, editStudent }) {

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

        try {
            let res;

            if (editStudent) {
                res = await fetch(`http://localhost:5000/api/students/${editStudent._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });
                toast.success("Student updated");
            } else {
                res = await fetch("http://localhost:5000/api/students", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });
                toast.success("Student added");
            }

            const data = await res.json();
            console.log("Response:", data); // 👈 debug

            fetchStudents();
            closeModal();

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-neutral-400 p-6 rounded-2xl w-96">

                <h2 className="text-xl text-black mb-4">
                    {editStudent ? "Edit Student" : "Add Student"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3 text-black">

                    <p className="centered">Enter Details</p>

                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded-xl" />

                    <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full border p-2 rounded-xl" />

                    <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full border p-2 rounded-xl" />

                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded-xl" />

                    <label className="flex items-center gap-2 rounded-xl">
                        <input type="checkbox" name="feesPaid" checked={form.feesPaid} onChange={handleChange} />
                        Fees Paid
                    </label>

                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={closeModal} className="px-3 py-1 border rounded-xl">
                            Cancel
                        </button>

                        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl">
                            Save
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}