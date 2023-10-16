"use client";
import React, { useEffect, useReducer } from "react";
import {
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import {
  MailOutline,
  SmartphoneOutlined,
  PlaceOutlined,
  Close,
  Send,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import CustomButton from "./CustomButton";

const Toast = Swal.mixin({
  timer: 5000,
  position: "top-right",
  timerProgressBar: true,
  toast: true,
});

const initialState = {
  fullname: "",
  email: "",
  subject: "",
  message: "",
} satisfies ContactFormObject;

const reducer = (state: ContactFormObject = initialState, action: Action) => {
  switch (action.type) {
    case "FULLNAME":
      return { ...state, fullname: action.payload };
    case "EMAIL":
      return { ...state, email: action.payload };
    case "SUBJECT":
      return { ...state, subject: action.payload };
    case "MESSAGE":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

type ContactFormProps = {
  email?: string;
  phoneNumbers?: string[];
  address?: string;
};

function ContactForm({ email, phoneNumbers, address }: ContactFormProps) {
  const [formObjectState, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [_loading, _setLoading] = React.useState<boolean>(false);
  const [showEmailCodeModal, setShowEmailCodeModal] =
    React.useState<boolean>(false);
  const [verificationCode, setVerificationCode] = React.useState<number | null>(
    0,
  );
  const [emailVerificationRespObj, setEmailVerificationRespObj] =
    React.useState<NonNullable<EmailVerifyResp>>({});

  /// verify Email code

  const handlResendCode = () => {
    setLoading(true);
    const postCodeObj = JSON.stringify({ code: verificationCode });
    fetch(
      "https://api.schoolall.io/verify",

      {
        method: "POST",
        headers: {
          message_id: emailVerificationRespObj?.content?.message_id ?? "",
          "Content-Type": "application/json",
        },
        body: postCodeObj,
      },
    )
      .then(async (res) => await res.json())
      .then((result) => {
        console.log(result);
        if (result?.status === "error") {
          setLoading(false);
          Toast.fire(" ", result?.message, "error");
        } else {
          setLoading(false);
          Toast.fire(" ", "Message Sent", "success");
          setShowEmailCodeModal(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        Toast.fire(
          " ",
          "Error trying to make request. Make sure you are connected to the internet and try again",
          "error",
        );
      });
  };

  const handlEmailCodeVerificationForm = () => {
    _setLoading(true);
    const postCodeObj = JSON.stringify({ code: verificationCode });
    fetch(
      "https://api.schoolall.io/verify",

      {
        method: "POST",
        headers: {
          message_id: emailVerificationRespObj?.content?.message_id ?? "",
          "Content-Type": "application/json",
        },
        body: postCodeObj,
      },
    )
      .then(async (res) => await res.json())
      .then((result) => {
        console.log(result);
        if (result?.status === "error") {
          _setLoading(false);
          Toast.fire(" ", result?.message, "error");
        } else {
          _setLoading(false);
          Toast.fire(" ", "Message Sent", "success");
          setShowEmailCodeModal(false);
        }
      })
      .catch((err) => {
        _setLoading(false);
        console.log(err);
        Toast.fire(
          " ",
          "Error trying to make request. Make sure you are connected to the internet and try again",
          "error",
        );
      });
  };

  /// Resend Verify Request

  const resendEmailRequest = () => {};

  /// Make a contact Request
  const handleContactForm = () => {
    console.log("Submitting form");
    setLoading(true);
    const { fullname: full_name, message, email, subject } = formObjectState;
    const postObj = JSON.stringify({
      full_name,
      message,
      email,
      subject,
    });
    console.table(postObj);
    fetch("https://api.schoolall.io/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: postObj,
    })
      .then(async (res) => await res.json())
      .then((result) => {
        console.log(result);
        if (result?.status === "error") {
          setLoading(false);
          Toast.fire(" ", "Message Sent", "error");
        } else {
          setLoading(false);
          setEmailVerificationRespObj(result);
          setShowEmailCodeModal(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        Toast.fire(
          " ",
          "Error trying to make request. Make sure you are connected to the internet and try again",
          "error",
        );
      });
  };

  return (
    <Box className="flex my-4 flex-col p-2 justify-center gap-10 shadow-md pb-10 md:flex-row md:gap-20">
      <Modal
        open={showEmailCodeModal}
        onClose={() => {
          setShowEmailCodeModal(false);
        }}
      >
        <motion.div
          className="flex  flex-col justify-center items-center"
          style={{ height: "100vh" }}
        >
          <Box
            className="px-10 py-20 relative rounded h-100 bg-white flex flex-col align-bottom gap-5 m-5"
            style={{ minWidth: "30vw" }}
          >
            <span className="absolute top-5 right-10 z-40">
              <Close
                color="primary"
                onClick={() => {
                  setShowEmailCodeModal(false);
                }}
              />
            </span>
            <Typography variant="body1">
              A confirmation code is sent to the email {formObjectState?.email}.
              Please enter the confirmation below to verify your email
            </Typography>
            <TextField
              className="text-white mt-4"
              type="text"
              placeholder="__ __ __"
              label="Enter Code"
              size="small"
              color="success"
              onChange={(e) => {
                setVerificationCode(parseInt(e.target.value));
              }}
              sx={{ height: "4vh", marginRight: "3px", color: "white" }}
            ></TextField>
            <CustomButton
              onClick={handlEmailCodeVerificationForm}
              loading={loading}
              size="small"
            >
              <Send /> Send
            </CustomButton>
            {/* <LoadingButton
              sx={{ marginTop: 1 }}
              onClick={handlEmailCodeVerificationForm}
              loading={loading}
              size="small"
              loadingPosition="start"
              disableElevation
              startIcon={<Send />}
              variant="contained"
            >
              Send
            </LoadingButton> */}
            <CustomButton
              onClick={handlResendCode}
              loading={_loading}
              size="small"
              variant="outlined"
            >
              <Send /> Resend Code
            </CustomButton>
            {/* <LoadingButton
              onClick={handlResendCode}
              loading={_loading}
              size="small"
              loadingPosition="start"
              disableElevation
              startIcon={<Send />}
              variant="text"
            >
              Resend Code
            </LoadingButton> */}
          </Box>
        </motion.div>
      </Modal>
      <Box className="pt-1 px-2 md:pt-4">
        <Stack direction="column">
          <Box className="flex flex-row items-center justify-start gap-3 my-2">
            <PlaceOutlined fontSize="large"></PlaceOutlined>
            <Box>
              <Typography className="font-semibold font-inter">
                Location
              </Typography>
              <Typography className="text-md text-gray-500">
                44 Circular Road
              </Typography>
            </Box>
          </Box>
          <Box className="flex flex-row items-center justify-start gap-3 my-2">
            <MailOutline fontSize="large"></MailOutline>
            <Box>
              <Typography>Email</Typography>
              <Link href="mailto:info@schoolall.io">
                <Typography className="text-md text-gray-500">
                  info@schoolall.io
                </Typography>
              </Link>
            </Box>
          </Box>
          <Box className="flex flex-row items-center justify-start gap-3 my-2">
            <SmartphoneOutlined fontSize="large"></SmartphoneOutlined>
            <Box>
              <Typography>Call</Typography>
              <Link href="tel:+23288722317">
                <Typography className="text-md text-gray-500">
                  +23288722317
                </Typography>
              </Link>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box className="pt-1 px-2 md:pt-4 md:px-2">
        <Box className="flex flex-col justify-center items-start gap-5">
          <Box className="flex flex-row items-center justify-center gap-2 md:flex-row">
            <TextField
              onChange={(e) => {
                dispatch({ type: "FULLNAME", payload: e.target.value });
              }}
              size="small"
              type="text"
              fullWidth
              className=""
              variant="outlined"
              label="Full Name"
              required
            ></TextField>
            <TextField
              onChange={(e) => {
                dispatch({ type: "EMAIL", payload: e.target.value });
              }}
              size="small"
              type="email"
              fullWidth
              variant="outlined"
              label="Email"
              required
            ></TextField>
          </Box>
          <TextField
            onChange={(e) => {
              dispatch({ type: "SUBJECT", payload: e.target.value });
            }}
            size="small"
            fullWidth
            variant="outlined"
            label="Subject"
            required
          ></TextField>
          <TextField
            onChange={(e) => {
              dispatch({ type: "MESSAGE", payload: e.target.value });
            }}
            size="small"
            multiline
            minRows={3}
            fullWidth
            variant="outlined"
            label="Message"
            required
          ></TextField>
          <CustomButton
            onClick={handleContactForm}
            loading={loading}
            variant="contained"
          >
            Submit
          </CustomButton>
          {/* <LoadingButton
            className="rounded"
            onClick={handleContactForm}
            loading={loading}
            size="medium"
            loadingPosition="start"
            disableElevation
            startIcon={<Send />}
            variant="outlined"
          >
            Submit
          </LoadingButton> */}
          {/* <button>Submit</button> */}
        </Box>
      </Box>
    </Box>
  );
}

export default ContactForm;
