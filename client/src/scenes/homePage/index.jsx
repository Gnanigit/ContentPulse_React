import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navBar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import Footer from "components/Footer";
import NotFriendListWidget from "scenes/widgets/NotFriendList";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const [showPosts, setShowPosts] = useState(true);

  const handleTogglePosts = () => {
    setShowPosts((prevShowPosts) => !prevShowPosts);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      paddingBottom="1.5rem"
    >
      <Navbar onTogglePosts={handleTogglePosts} />
      <Box
        width="100%"
        flex="1"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          {showPosts ? (
            <PostsWidget userId={_id} />
          ) : (
            <Box flexBasis="26%">
              <Box m="2rem 0" />
              <NotFriendListWidget userId={_id} />
            </Box>
          )}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
      <Footer mt="auto" />
    </Box>
  );
};

export default HomePage;
