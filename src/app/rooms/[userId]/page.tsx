"use client";
import React from "react";
import {
  Avatar,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import { ChatList } from "react-chat-elements";

interface ConversationProps {
  name: string;
  avatar: string;
  gesture?: string;
  lastSeen?: string;
  messages: string[]; // Replace with your message structure
}

const ConversationScreen: React.FC<ConversationProps> = ({
  name,
  avatar,
  gesture,
  lastSeen,
  messages,
}) => {
  return (
    <Container>
      <Typography>Conversation Screen</Typography>
    </Container>
  );
};

export default ConversationScreen;
