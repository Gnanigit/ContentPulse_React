import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navBar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import WidgetWrapper from "components/WidgetWrapper";
import UpdateProfile from "components/UpdateProfile";

const ProfilePage = () => {
  const initialVal = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
  };
  const [user, setUser] = useState(null);
  const [initialValues, setInitialValues] = useState(initialVal);
  const { userId } = useParams();
  const loggedInUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [showPosts, setShowPosts] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await response.json();

        setInitialValues({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: "",
          location: userData.location,
          occupation: userData.occupation,
          picture: userData.picturePath,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const switchComponent = () => {
    setShowPosts((prevState) => !prevState);
  };
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={userId}
            picturePath={user.picturePath}
            switchComponent={switchComponent}
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} isProfile />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {showPosts ? (
            <>
              {loggedInUser._id === userId && (
                <>
                  <MyPostWidget picturePath={user.picturePath} />
                  <Box m="2rem 0" />
                </>
              )}
              <PostsWidget userId={userId} isProfile />
            </>
          ) : (
            <WidgetWrapper>
              <UpdateProfile val={initialValues} />
            </WidgetWrapper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
