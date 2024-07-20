import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetween";
// import * as yup from "yup";

// const validationSchema = yup.object().shape({
//   firstName: yup.string().required("Required"),
//   lastName: yup.string().required("Required"),
//   email: yup.string().email("Invalid email").required("Required"),
//   location: yup.string().required("Required"),
//   occupation: yup.string().required("Required"),
//   picture: yup.string(),
//   password: yup.string().required("Required"),
// });

const UpdateProfile = ({ val }) => {
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;

  const [changeGeneralDetails, setChangeGeneralDetails] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changeProfilePic, setChangeProfilePic] = useState(false);

  const initialValues = {
    firstName: val?.firstName || "",
    lastName: val?.lastName || "",
    email: val?.email || "",
    location: val?.location || "",
    occupation: val?.occupation || "",
    picture: val?.picture || "",
    password: "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (changeGeneralDetails) {
      console.log("Change General Details");
      // Add your update general details logic here
    } else if (changeProfilePic) {
      console.log("Change Profile Picture");
      // Add your update profile picture logic here
    } else {
      console.log("Change Password");
      // Add your change password logic here
    }
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      //   validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <WidgetWrapper>
          <Typography
            fontWeight="350"
            fontSize="clamp(0.7rem, 1.5rem, 1.7rem)"
            color="primary"
            textAlign="center"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Update Profile
          </Typography>
          <Box p="1rem 0">
            <FlexBetween gap="1rem">
              <Typography
                variant="h5"
                color={dark}
                fontWeight="400"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                General Info
              </Typography>
              <Button
                onClick={() => {
                  setChangeGeneralDetails(!changeGeneralDetails);
                  setChangeProfilePic(false);
                  setChangePassword(false);
                }}
                sx={{
                  color: theme.palette.background.alt,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "3rem",
                }}
              >
                Get
              </Button>
            </FlexBetween>
            {changeGeneralDetails && (
              <form onSubmit={handleSubmit}>
                <WidgetWrapper>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  >
                    <TextField
                      label="First Name"
                      name="firstName"
                      onChange={handleChange}
                      value={values.firstName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      label="Last Name"
                      name="lastName"
                      onChange={handleChange}
                      value={values.lastName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      label="Location"
                      name="location"
                      onChange={handleChange}
                      value={values.location}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="Occupation"
                      name="occupation"
                      onChange={handleChange}
                      value={values.occupation}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box>
                    <Button
                      fullWidth
                      type="submit"
                      sx={{
                        m: "2rem 0",
                        p: "1rem",
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.alt,
                        "&:hover": { color: theme.palette.primary.main },
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </WidgetWrapper>
              </form>
            )}
          </Box>
          <Divider />
          <Box p="1rem 0">
            <FlexBetween gap="1rem">
              <Typography
                variant="h5"
                color={dark}
                fontWeight="400"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                Change Profile Pic
              </Typography>
              <Button
                onClick={() => {
                  setChangeProfilePic(!changeProfilePic);
                  setChangePassword(false);
                  setChangeGeneralDetails(false);
                }}
                sx={{
                  color: theme.palette.background.alt,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "3rem",
                }}
              >
                Get
              </Button>
            </FlexBetween>
            {changeProfilePic && (
              <form onSubmit={handleSubmit}>
                <WidgetWrapper>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  >
                    <TextField
                      label="Profile Picture"
                      name="picture"
                      onChange={handleChange}
                      value={values.picture}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box>
                    <Button
                      fullWidth
                      type="submit"
                      sx={{
                        m: "2rem 0",
                        p: "1rem",
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.alt,
                        "&:hover": { color: theme.palette.primary.main },
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </WidgetWrapper>
              </form>
            )}
          </Box>
          <Divider />
          <Box p="1rem 0">
            <FlexBetween gap="1rem">
              <Typography
                variant="h5"
                color={dark}
                fontWeight="400"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                Change Password
              </Typography>
              <Button
                onClick={() => {
                  setChangePassword(!changePassword);
                  setChangeGeneralDetails(false);
                  setChangeProfilePic(false);
                }}
                sx={{
                  color: theme.palette.background.alt,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "3rem",
                }}
              >
                Get
              </Button>
            </FlexBetween>
            {changePassword && (
              <form onSubmit={handleSubmit}>
                <WidgetWrapper>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  >
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={values.password}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box>
                    <Button
                      fullWidth
                      type="submit"
                      sx={{
                        m: "2rem 0",
                        p: "1rem",
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.alt,
                        "&:hover": { color: theme.palette.primary.main },
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </WidgetWrapper>
              </form>
            )}
          </Box>
        </WidgetWrapper>
      )}
    </Formik>
  );
};

export default UpdateProfile;
