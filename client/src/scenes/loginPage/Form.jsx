import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  UseTheme,
} from "@mui/material";
import EditOutLinedIcon from "@mui/icons-material/EditOutLined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { useTheme } from "@emotion/react";

const registerSchema = yup.object().shape({
  location: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  location: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");

  const handleFormSubmit = async (values, onsubmitProps) => {};

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobileScreens ? undefined : "span 4",
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  name="location"
                  onBlur={handleBlur}
                  value={values.location}
                  onChange={handleChange}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 2" }}
                ></TextField>

                <TextField
                  label="Last Name"
                  name="lastName"
                  onBlur={handleBlur}
                  value={values.lastName}
                  onChange={handleChange}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                ></TextField>

                <TextField
                  label="Location"
                  name="location"
                  onBlur={handleBlur}
                  value={values.location}
                  onChange={handleChange}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                ></TextField>

                <TextField
                  label="Occupation"
                  name="occupation"
                  onBlur={handleBlur}
                  value={values.occupation}
                  onChange={handleChange}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                ></TextField>
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  ></Dropzone>
                </Box>
              </>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
