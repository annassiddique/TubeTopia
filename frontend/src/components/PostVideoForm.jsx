import React, { useState } from "react";
import axios from "axios";
import Input from "./Input";
import { fetchUserInfo } from "../redux/slices/user/userAPI";
import { useDispatch } from "react-redux";
import Overlay from "./Overlay";

const PostVideoForm = ({ onClose }) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const inputs = [
        {
            name: "Video Title",
            type: "text",
            value: title,
            onChange: (e) => {
                if (e.target.value.length <= 50) {
                    setTitle(e.target.value);
                }
            },
            id: 1,
        },
        {
            name: "Video URL",
            type: "text",
            value: url,
            onChange: (e) => setUrl(e.target.value),
            id: 2,
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !url) {
            setError("All fields are required!");
            return;
        }

        setError(null);
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/api/videos`,
                { title, url },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Video added successfully:", response.data);
            dispatch(fetchUserInfo());
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while adding the video.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Overlay onClose={onClose}>
            <h2 className="text-2xl font-bold mb-4 font-spaceMono">Post a Video</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <div className="mb-5" key={input.id}>
                        <Input
                            label={input.name}
                            type={input.type}
                            value={input.value}
                            onChange={input.onChange}
                        />
                    </div>
                ))}
                <div className="flex justify-between font-spaceMono font-semibold gap-2 w-full mt-7">
                    <button
                        type="button"
                        onClick={onClose}
                        className="mr-4 bg-[#76ABAE] text-white px-4 py-2 rounded hover:bg-[#5f898b] w-2/4"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-[#31363F] text-white px-4 py-2 rounded hover:bg-[#24272e] w-2/4"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </Overlay>
    );
};

export default PostVideoForm;
