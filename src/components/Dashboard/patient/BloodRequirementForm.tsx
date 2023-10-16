"use client";
import { useCurrentUser } from "@/hooks/customHooks";
import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

const BloodRequirementDisplay: React.FC = () => {
    const currentUser = useCurrentUser()

  return <Box>Blood Reuirement Form</Box>;
};

export default BloodRequirementDisplay;
