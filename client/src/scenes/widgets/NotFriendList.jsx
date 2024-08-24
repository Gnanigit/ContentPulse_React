import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const BASE_URL = process.env.REACT_APP_API_URL;

const NotFriendListWidget = ({ userId, isProfile = false }) => {
  const [notFriends, setNotFriends] = useState([]);
  const { palette } = useTheme();

  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getNotFriends = async () => {
    const response = await fetch(`${BASE_URL}/users/${userId}/notfriends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setNotFriends(data);
  };
  useEffect(() => {
    getNotFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Make more friends
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {notFriends.map((notFriend) => (
          <Friend
            key={notFriend._id}
            userId={userId}
            friendId={notFriend._id}
            name={`${notFriend.firstName} ${notFriend.lastName}`}
            subtitle={notFriend.occupation}
            userPicturePath={notFriend.picturePath}
            isProfile={isProfile}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};
export default NotFriendListWidget;
