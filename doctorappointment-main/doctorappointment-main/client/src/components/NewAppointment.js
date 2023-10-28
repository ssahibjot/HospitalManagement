import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function NewAppointment() {
    const navigate = useNavigate();
    const [dataTime, setDataTime] = useState({ date: "", time: "" });
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        dob: "",
        contact: "",
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }
    const handleTimeChange = (e) => {
        setDataTime({ ...dataTime, [e.target.name]: e.target.value });
    };
    function handleSubmit(e) {
        e.preventDefault();
        const datak = {
            first_name: user.first_name,
            last_name: user.last_name,
            gender: user.gender,
            dob: user.dob,
            contact: user.contact,
            date: dataTime.date,
            time: dataTime.time,
        };
        // console.log(user.token);
        console.log(datak)
        axios
            .post("http://localhost:8080/auth/createAppointment", datak, {
                headers: {
                    token: user.token,
                },
            })
            .then((data) => {
                if (data.data.appointmentRegistered) {
                    toast.success('Appointment Registered Successfully !!!')
                    navigate('/home')
                }
                else {

                    toast.error('Appointment Registeration Failed !!!')
                }
            });
    }

    return (
        <>
            <div className="container mx-auto mt-8">
                {user.first_name ? (
                    <>
                        <nav className="w-full bg-red-200 h-16 flex justify-center items-center">
                            <div className="text-xl text-white font-semibold">
                                {`${user.first_name} ${user.last_name}`}
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    navigate("/");
                                }}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                                Sign Out
                            </button>
                        </nav>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Enter the date and time for the appointment
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={dataTime.date}
                                    onChange={handleTimeChange}
                                    className="w-full border rounded p-2 mb-2"
                                    required
                                />
                                <input
                                    type="time"
                                    name="time"
                                    value={dataTime.time}
                                    onChange={handleTimeChange}
                                    className="w-full border rounded p-2 mb-4"
                                    required
                                />
                            </div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={user.first_name}
                                onChange={handleChange}
                                className="w-full border rounded p-2 mb-4"
                                placeholder="First Name"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                value={user.last_name}
                                onChange={handleChange}
                                className="w-full border rounded p-2 mb-4"
                                placeholder="Last Name"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                D.O.B
                            </label>
                            <input
                                type="date"
                                name="dob"
                                value={user.dob}
                                onChange={handleChange}
                                className="w-full border rounded p-2 mb-4"
                                placeholder="Gender"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Gender
                            </label>
                            <input
                                type="text"
                                name="gender"
                                value={user.gender}
                                onChange={handleChange}
                                className="w-full border rounded p-2 mb-4"
                                placeholder="Gender"
                            />
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Contact
                            </label>
                            <input
                                type="text"
                                name="contact"
                                value={user.contact}
                                onChange={handleChange}
                                className="w-full border rounded p-2 mb-4"
                                placeholder="Contact"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Make Appointment
                            </button>
                        </form>
                    </>
                ) : (
                    <p>Please log in to continue.</p>
                )}
            </div>
        </>
    );
}

export default NewAppointment;
