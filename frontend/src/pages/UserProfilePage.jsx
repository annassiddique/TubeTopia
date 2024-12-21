import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../components/Avatar';
import Table from '../components/Table';
import PostVideoForm from "../components/PostVideoForm";
import { logout } from '../redux/slices/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { deleteVideo } from '../redux/slices/videos/videoAPI';
import { fetchUserInfo } from '../redux/slices/user/userAPI';


const UserProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showVideoForm, setShowVideoForm] = useState(false);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(logout());
    navigate("/");
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await dispatch(deleteVideo(videoId)).unwrap(); // Wait for the action to complete
      dispatch(fetchUserInfo()); // Refetch user data to update UI
    } catch (error) {
      console.error('Failed to delete video:', error);
    }
  };

  return (
    <div className="p-4 flex flex-col md:grid gap-2  md:grid-cols-[1fr__2fr] md:h-[90vh]">
      <div className="flex flex-col rounded-xl bg-[#222831] overflow-hidden">
        <div className="h-4/5 ">
          <div className="bg-[#31363F] flex justify-center items-center py-4 ">
            <Avatar user={user} classes="w-44 h-40 text-[4rem] font-bold" />
          </div>
          <div className="flex flex-col gap-2 text-[#EEE] p-4 mt-4">
            <span className="flex justify-between items-center text-[#c4c3c3] font-raleway">Name
              <h3 className="text-lg font-semibold font-spaceMono text-[#EEE]">{user?.name}</h3>
            </span>
            <span className="flex justify-between items-center text-[#c4c3c3] font-raleway">Email
              <h3 className="text-md lg:text-lg font-semibold font-spaceMono text-[#EEE]">{user?.email}</h3>
            </span>
          </div>
        </div>
        <div className="h-2/4 flex flex-col justify-end pb-4 px-4">
          <button onClick={handleLogout} className="p-3 rounded-lg text-xl font-semibold font-spaceMono bg-[#D61A3C] text-[#EEE] hover:bg-[#B2022F]">
            Log out
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:p-4">
        <div className="w-full flex justify-end">
          <button
            onClick={() => setShowVideoForm(true)}
            className=" w-full md:w-auto bg-[#222831] text-[#EEE] hover:bg-[#EEE] hover:text-[#222831] border-2 border-[#222831] font-spaceMono font-semibold text-lg rounded-md py-3 px-4"
          >
            Post a video
          </button>
        </div>
        {user?.videos?.length > 0 ? (
          <Table
            videos={user.videos}
            currentPage={1}
            itemsPerPage={user.videos.length}
            showAction={true}
            onDeleteVideo={handleDeleteVideo}
          />
        ) : (
          <div className="flex flex-col justify-center items-center mt-8">
            <iframe
              src="https://lottie.host/embed/78933f1b-d06a-4ae0-ab8e-49bedfbbdd59/wbC2UMF3Jo.lottie"
              className="w-[90%] h-[500px] max-w-4xl border-none"
            ></iframe>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-spaceMono">
              You haven't uploaded any videos yet!
            </h2>
            <p className="text-gray-600 mb-6 text-center font-spaceMono">
              Start sharing your favorite videos{" "}
              <span
                className="font-semibold hover:text-[#222831] cursor-pointer underline"
                onClick={() => setShowVideoForm(true)}
              >
                now
              </span>
            </p>
          </div>
        )}
      </div>
      {showVideoForm && <PostVideoForm onClose={() => setShowVideoForm(false)} />}
    </div>
  );
};

export default UserProfilePage;
