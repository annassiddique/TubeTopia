import React, { useState } from 'react';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo, loginUser, signUpUser } from '../redux/slices/user/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import GlowEffectWrapper from "../components/GlowEffectWrapper"
import HoverEffectWrapper from "../components/HoverEffectWrapper"


const SignUpPage = () => {
    const [activeTransition, setActiveTransition] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const { loading, error, success } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = () => {
        setActiveTransition(!activeTransition);
        setSignUp(!signUp);
        setFormData({ name: "", email: "", password: "" });
        setLoginData({ email: "", password: "" });
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (signUp) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            setLoginData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch(signUpUser(formData));
        setFormData({ name: "", email: "", password: "" });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(loginData)).then((action) => {
            if (action.meta.requestStatus === "fulfilled") {
                dispatch(fetchUserInfo());
                navigate("/");
            }
        });
    };

    return (
        <div className="h-screen overflow-y-scroll hide-scrollbar flex justify-center items-center md:mb-12 lg:mb-0">
            {/* Desktop View */}
            <div className="hidden md:flex h-full relative">

                <GlowEffectWrapper
                    classes={`bg-gradient-to-br from-[#222831] via-[#282d37] via-[#2d333c] via-[#333842] to-[#393e48] text-[#EEE] h-[400px] w-[350px] lg:w-[450px]
                z-[999] signup-transition-card-1 flex flex-col gap-3 justify-center items-center py-6 shadow-xl text-center
                ${activeTransition ? "active-1" : ""}`}
                    customColors={{
                        inner: "rgba(206, 214, 213, 0.1)",
                        middle: "rgba(206, 214, 213, 0.1)",
                    }}

                >
                    {signUp ? (
                        <>
                            <h3 className="text-2xl font-spaceMono font-semibold">
                                Welcome Aboard!
                            </h3>
                            <h4 className="text-lg font-spaceMono">
                                Your journey begins here.
                            </h4>
                        </>
                    ) : (
                        <>
                            <h3 className="text-2xl font-spaceMono font-semibold">
                                Welcome Back!
                            </h3>
                            <h4 className="text-base md:text-lg font-spaceMono">
                                Let’s pick up where you left off.
                            </h4>
                        </>
                    )}
                </GlowEffectWrapper>
                <div
                    className={`border border-[#2228313f] h-[400px]  w-[350px] lg:w-[450px] signup-transition-card-2  flex flex-col justify-between items-center py-6 gap-2 shadow-xl
                ${activeTransition ? "active-2" : ""}`}
                >
                    <>
                        <h3 className="border-b-2 border-[#222831] w-[90%] text-2xl py-1 font-spaceMono font-semibold">
                            {signUp ? "Sign Up" : "Login"}
                        </h3>
                        <form
                            onSubmit={signUp ? handleSignUp : handleLogin}
                            className={`w-full ${signUp ? "h-[75%]" : " h-[65%]"
                                } mt-1 px-5 flex flex-col items-center gap-2 justify-evenly `}
                        >
                            {signUp && (
                                <Input
                                    type="text"
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            )}
                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={signUp ? formData.email : loginData.email}
                                onChange={handleInputChange}
                            />
                            <Input
                                type="password"
                                label="Password"
                                name="password"
                                value={signUp ? formData.password : loginData.password}
                                onChange={handleInputChange}
                            />
                            <HoverEffectWrapper>
                                <button
                                    style={{
                                        transform: "translateZ(75px)",
                                        transformStyle: "preserve-3d",
                                    }}
                                    type="submit"
                                    disabled={loading}
                                    className={`border border-[#31363F] ${signUp ? "mt-2" : "mt-3"
                                        } px-3 py-2 font-spaceMono font-semibold text-lg rounded-md bg-[#31363F] 
                            text-[#EEE] hover:bg-[#76ABAE] hover:border-[#76ABAE] transition w-full`}
                                >
                                    {loading ? "Processing..." : signUp ? "Sign Up" : "Login"}
                                </button>
                            </HoverEffectWrapper>
                        </form>
                        {error && (
                            <p className="text-red-500 font-spaceMono text-[0.7rem]">{error !== "Failed to fetch user data" && error}</p>
                        )}
                        {success && (
                            <p className="text-[#85A98F] font-spaceMono text-[0.7rem]">{success}</p>
                        )}
                        <div className="border-t-2 border-[#dfdfdf8f] w-[90%] pt-2 font-spaceMono text-[0.9rem] text-gray-300">
                            {signUp ? "Already have an account? " : "New here? "}
                            <span
                                onClick={handleChange}
                                className="font-semibold cursor-pointer hover:text-[#76ABAE]"
                            >
                                {signUp ? "Log In" : "Create an account"}
                            </span>
                        </div>
                    </>
                </div>
            </div>
            {/* Mobile View */}
            <div className="flex flex-col md:hidden w-full min-h-screen justify-center items-center">
                {/* Transition Card */}
                <div
                    className={`bg-gradient-to-br from-[#222831] via-[#282d37] via-[#2d333c] via-[#333842] to-[#393e48] text-[#EEE] w-full
                 flex flex-col gap-4 justify-center items-center py-8 px-4 shadow-xl text-center transition-transform duration-500 ease-in-out
                  `}
                >
                    {signUp ? (
                        <>
                            <h3 className="text-xl font-spaceMono font-semibold">Welcome Aboard!</h3>
                            <h4 className="text-sm sm:text-base font-spaceMono">Your journey begins here.</h4>
                        </>
                    ) : (
                        <>
                            <h3 className="text-xl font-spaceMono font-semibold">Welcome Back!</h3>
                            <h4 className="text-sm sm:text-base font-spaceMono">Let’s pick up where you left off.</h4>
                        </>
                    )}
                </div>

                {/* Form Card */}
                <div
                    className={`bg-[#393e48] text-[#EEE] w-full flex flex-col gap-6 justify-between items-center py-8 px-4 shadow-xl transition-transform duration-500 ease-in-out
                     `}
                >
                    <h3 className="text-xl font-spaceMono font-semibold border-b-2 border-[#222831] w-[90%] pb-2">
                        {signUp ? "Sign Up" : "Login"}
                    </h3>
                    <form
                        onSubmit={signUp ? handleSignUp : handleLogin}
                        className="w-full flex flex-col items-center gap-4"
                    >
                        {signUp && (
                            <Input
                                type="text"
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        )}
                        <Input
                            type="email"
                            label="Email"
                            name="email"
                            value={signUp ? formData.email : loginData.email}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="password"
                            label="Password"
                            name="password"
                            value={signUp ? formData.password : loginData.password}
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 text-sm sm:text-base font-spaceMono font-semibold bg-[#31363F] hover:bg-[#76ABAE] transition-all rounded-md"
                        >
                            {loading ? "Processing..." : signUp ? "Sign Up" : "Login"}
                        </button>
                    </form>
                    <p className="text-[0.8rem] text-gray-400">
                        {signUp ? "Already have an account? " : "New here? "}
                        <span
                            onClick={handleChange}
                            className="font-semibold cursor-pointer text-[#76ABAE] hover:underline"
                        >
                            {signUp ? "Log In" : "Create an account"}
                        </span>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default SignUpPage;
