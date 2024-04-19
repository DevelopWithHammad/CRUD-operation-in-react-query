import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteModal = ({ studentData, setDeleteModal }) => {
    const queryClient = useQueryClient();
    const deleteUserMutation = useMutation({
        mutationFn: async () => {
            try {
                const response = await axios.delete(`http://localhost:4000/students/${studentData.id}`);
                setDeleteModal(false);
                toast.success("Student is Deleted!", {
                    position: "top-center",
                    autoClose: 1500
                });
                return response.data;
            } catch (error) {
                setDeleteModal(false);
                toast.error(error, {
                    position: "top-center",
                    autoClose: 1500
                });
            }

        },
        onSuccess: (data) => {
            queryClient.invalidateQueries("students")
        }
    })

    const deleteUserHandler = async () => {
        try {
            await deleteUserMutation.mutateAsync();
        } catch (error) {
            console.log("Error occured while updating", error);
            setDeleteModal(false)
        }
    }

    return (
        <div className="modal w-full mx-auto pt-4 px-6 bg-white  rounded-xl pb-8 ">
            <RxCross2
                className="ml-auto text-xl cursor-pointer"
                onClick={() => {
                    setDeleteModal(false)
                }}
            />
            <p className="font-bold text-2xl text-center">Are you Sure?</p>
            <div className="flex items-center justify-around mt-12  ">
                <button
                    type='button'
                    onClick={() => { deleteUserHandler(studentData.id) }}
                    className="bg-sky-600 text-white text-lg py-1.5 w-1/4  font-semibold"
                >Delete</button>
                <button
                    type='button'
                    onClick={() => {
                        setDeleteModal(false);
                    }}
                    className="bg-sky-600 text-white text-lg py-1.5 w-1/4  font-semibold"
                >Cancel</button>
            </div>
        </div>
    )
}


const UpdateModal = ({ studentData, coursesName, setUpdateModal }) => {
    const [name, setName] = useState(studentData.name);
    const [fatherName, setFatherName] = useState(studentData.fatherName);
    const [course, setCourse] = useState(studentData.course);

    const queryClient = useQueryClient()
    const updateUserMutation = useMutation({
        mutationFn: async (updatedStudentData) => {
            try {
                const response = await axios.put(`http://localhost:4000/students/${studentData.id}`, updatedStudentData);
                setUpdateModal(false);
                toast.success("Student is Updated!", {
                    position: "top-center",
                    autoClose: 1500
                });
                return response.data;
            } catch (error) {
                setUpdateModal(false);
                toast.error(error, {
                    position: "top-center",
                    autoClose: 1500
                });
            }

        },
        onSuccess: () => {
            queryClient.invalidateQueries("students")
        }
    })

    const updateStudentHandler = async (studentId) => {
        const updatedStudentData = {
            id: studentId,
            name,
            fatherName,
            course,
        };
        await updateUserMutation.mutateAsync(updatedStudentData);
        setName("");
        setFatherName("");
        setCourse("");
    }

    return (
        <div className="modal mx-auto pt-4 px-6 bg-white  rounded-xl pb-4">
            <RxCross2
                className="ml-auto text-xl cursor-pointer"
                onClick={() => {
                    setUpdateModal(false)
                }}
            />
            <div className="flex items-center gap-2 pt-6 pb-12">
                <input
                    type="text"
                    value={name}
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border outline-none w-1/3"
                />
                <input
                    type="text"
                    value={fatherName}
                    placeholder='Father name'
                    onChange={(e) => setFatherName(e.target.value)}
                    className="p-2 border outline-none w-1/3"
                />
                <select name="courses"
                    className="py-2 px-1 outline-none placeholder:text-gray-50 border"
                    onChange={(e) => setCourse(e.target.value)}
                >
                    <option value={course}>{course}</option>
                    {coursesName.map((courseName) => (
                        <option value={courseName} key={courseName}>{courseName}</option>
                    ))}
                </select>
                <button
                    type='button'
                    onClick={() => { updateStudentHandler(studentData.id) }}
                    className="bg-sky-600 text-white text-lg py-1.5 w-1/4 ml-auto font-semibold"
                >Update</button>
            </div>
        </div>
    )
}

const Mutation = () => {
    const [name, setName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [course, setCourse] = useState("");
    const [studentData, setStudentData] = useState({});
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [menu, setMenu] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const queryClient = useQueryClient();

    async function addStudentHandler(studentData) {
        try {
            await axios.post("http://localhost:4000/students", studentData);
            toast.success("Student is Added!", {
                position: "top-center",
                autoClose: 1500
            });
        } catch (error) {
            toast.error(error, {
                position: "top-center"
            });
        }

    }

    const mutation = useMutation({
        mutationFn: addStudentHandler,
        onSuccess: () => {
            queryClient.invalidateQueries("students")
        }
    });

    const handleSubmit = async () => {
        const studentData = {
            name,
            fatherName,
            course,
        };
        await mutation.mutateAsync(studentData);
        setName("");
        setFatherName("");
        setCourse("");
    }

    const { isLoading, isError, error, data: students } = useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:4000/students");
            return response.data;
        }
    });

    if (isLoading) {
        return (
            <div className="fixed w-full h-full bg-white/70">
                <div className="loader"> </div>
            </div>)
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    const coursesName = ["Graphic Designing", "Video Editing", "Digital Marketing", "Web Development", "App Development", "Affiliate Marketing", "Amazon"];



    const confirmUpdate = (studentId) => {
        setUpdateModal(true);
        setMenu(false);
        setStudentData(students.find(student => student.id === studentId));
    }

    const confirmDelete = (studentId) => {
        setDeleteModal(true);
        setMenu(false);
        setStudentData(students.find(student => student.id === studentId));
    }

    const toggleMenu = (studentId) => {
        setMenu(!menu)
        setSelectedStudentId(studentId)
    }

    return (
        <div className="bg-sky-800 w-[90%] lg:w-[70%] mx-auto mt-24 rounded-2xl pb-4">
            <div className="w-2/3 mx-auto pt-4 flex flex-col lg:flex-row items-center gap-2">
                <input
                    type="text"
                    value={name}
                    placeholder='Full name'
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border outline-none w-full lg:w-1/3"
                />
                <input
                    type="text"
                    value={fatherName}
                    placeholder='Father name'
                    onChange={(e) => setFatherName(e.target.value)}
                    className="p-2 border outline-none w-full lg:w-1/3"
                />
                <select
                    name="courses"
                    value={course}
                    className="py-2.5 px-1 outline-none placeholder:text-gray-50 w-full lg:w-1/3"
                    onChange={(e) => {
                        console.log(e.target.value);
                        setCourse(e.target.value)
                    }}>
                    <option value="" disabled className="text-gray-400">Select Course</option>
                    {coursesName.map((courseName) => (
                        <option value={courseName} key={courseName}>{courseName}</option>
                    ))}
                </select>
                <button
                    type='button'
                    onClick={handleSubmit}
                    className="bg-sky-600 text-white text-lg py-1.5 w-full lg:w-1/4 ml-auto font-semibold"
                >Add</button>
            </div>
            <div className="w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
                {students?.map((student, index) => (
                    <div key={index} className={`flex bg-sky-600 p-2  ${index === 0 && index === 1 ? 'mt-12' : 'mt-2'}`} >
                        <div className="w-[95%]">
                            <p className="font-normal text-white text-lg"> <span className="font-semibold">Name:</span> {student.name}</p>
                            <p className="font-normal text-white text-lg"><span className="font-semibold">Father name:</span> {student.fatherName}</p>
                            <p className="font-normal text-white text-lg"><span className="font-semibold">Course:</span> {student.course}</p>
                        </div>
                        <div className="w-[5%]">
                            <HiOutlineDotsVertical className="cursor-pointer text-xl text-white" onClick={() => { toggleMenu(student.id) }} />
                            {selectedStudentId === student.id && menu && <div className="bg-white w-[70px]  flex flex-col items-center justify-center relative -top-2 right-[67px]">
                                <button onClick={() => { confirmUpdate(student.id) }}
                                    className="hover:bg-blue-100 w-full py-1"
                                >Update</button>
                                <button onClick={() => { confirmDelete(student.id) }}
                                    className="hover:bg-blue-100 w-full py-1"
                                >Delete</button>
                            </div>}

                        </div>
                    </div>
                ))
                }
            </div>
            {updateModal && <div className="updatemodal fixed z-[1] w-2/3 -translate-y-[150px] translate-x-4">
                <UpdateModal studentData={studentData} coursesName={coursesName} updateModal={updateModal} setUpdateModal={setUpdateModal} />
            </div>}
            {(updateModal || deleteModal) && <div className="w-full h-full fixed backdrop-blur-sm z-0 top-0 left-0"></div>}
            {deleteModal && <div className="deletemodal fixed z-[1] w-1/3 translate-x-[55%] -translate-y-[150px]">
                {<DeleteModal studentData={studentData} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />}
            </div>}
        </div>
    )
}

export default Mutation;