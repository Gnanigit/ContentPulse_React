import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
const BASE_URL = process.env.REACT_APP_API_URL;

const Friend = ({
  userId,
  friendId,
  name,
  subtitle,
  userPicturePath,
  isProfile,
  postId,
  loggedInUserId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(`${BASE_URL}/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const deletePost = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/deletepost`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Error deleting post");
    }
  };

  return (
    <FlexBetween sx={{ justifyContent: "space-between" }}>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      <FlexBetween>
        {(_id !== friendId && !isProfile) || (isProfile && _id === userId) ? (
          <IconButton
            onClick={() => patchFriend()}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            {isFriend ? (
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
              <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
          </IconButton>
        ) : null}
      </FlexBetween>

      {isProfile && loggedInUserId === _id && (
        <IconButton onClick={deletePost}>
          <DeleteOutline />
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
