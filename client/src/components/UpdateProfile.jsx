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
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const BASE_URL = process.env.REACT_APP_API_URL;

const validateSVGViewBox = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(event.target.result, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg");
    if (svgElement) {
      const viewBox = svgElement.getAttribute("viewBox");
      if (!viewBox || viewBox.includes("%")) {
        // Set a default valid viewBox if not set or invalid
        svgElement.setAttribute("viewBox", "0 0 100 100");
        // Serialize back to string
        const serializer = new XMLSerializer();
        const updatedSVGContent = serializer.serializeToString(svgDoc);
        // Create a new File object with the updated content
        const updatedFile = new File([updatedSVGContent], file.name, {
          type: file.type,
          lastModified: file.lastModified,
        });
        callback(updatedFile);
      } else {
        callback(file);
      }
    } else {
      callback(file);
    }
  };
  reader.readAsText(file);
};

const UpdateProfile = ({ val }) => {
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [changeGeneralDetails, setChangeGeneralDetails] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changeProfilePic, setChangeProfilePic] = useState(false);
  const [error, setError] = useState("");

  const GeneralValues = {
    firstName: val.firstName || "",
    lastName: val.lastName || "",
    location: val.location || "",
    occupation: val.occupation || "",
    picture: "",
    oldPassword: "",
    newPassword: "",
  };

  const PicValues = {
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    picture: "",
    oldPassword: "",
    newPassword: "",
  };

  const PassValues = {
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    picture: "",
    oldPassword: "",
    newPassword: "",
  };

  const updateGD = async (values, onSubmitProps) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${_id}/updategd`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      onSubmitProps.resetForm();

      setChangeGeneralDetails(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const updatePass = async (values, setErrors, onSubmitProps) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${_id}/updatepass`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok) {
        setError("Old Password is Invalid");
      } else {
        onSubmitProps.resetForm();
        setChangePassword(false);
        setError("");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const updatePic = async (values, onSubmitProps) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${_id}/updatepic`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok) {
        setError("Old Password is Invalid");
      } else {
        onSubmitProps.resetForm();
        setChangeProfilePic(false);
        setError("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFormSubmit = async (values, { setErrors, resetForm }) => {
    if (changeGeneralDetails) {
      await updateGD(values, { resetForm });
    } else if (changeProfilePic) {
      await updatePic(values, { resetForm });
    } else {
      await updatePass(values, setErrors, { resetForm });
    }
    resetForm();
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={
        changeGeneralDetails
          ? GeneralValues
          : changeProfilePic
          ? PicValues
          : PassValues
      }
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
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
          <form onSubmit={handleSubmit}>
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
                <WidgetWrapper>
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${theme.palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png,.svg"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        const file = acceptedFiles[0];
                        if (file.type === "image/svg+xml") {
                          validateSVGViewBox(file, (validatedFile) => {
                            setFieldValue("picture", validatedFile);
                          });
                        } else {
                          setFieldValue("picture", file);
                        }
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${theme.palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
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
                <WidgetWrapper>
                  {errors && (
                    <Typography color="error" variant="body2" pb="0.8rem">
                      {error}
                    </Typography>
                  )}
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  >
                    <TextField
                      label="Old Password"
                      name="oldPassword"
                      type="password"
                      onChange={handleChange}
                      value={values.oldPassword}
                      error={Boolean(touched.oldPassword && errors.oldPassword)}
                      helperText={touched.oldPassword && errors.oldPassword}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="New Password"
                      name="newPassword"
                      type="password"
                      onChange={handleChange}
                      value={values.newPassword}
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
              )}
            </Box>
          </form>
        </WidgetWrapper>
      )}
    </Formik>
  );
};

export default UpdateProfile;
