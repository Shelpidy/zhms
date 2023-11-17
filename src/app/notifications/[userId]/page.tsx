"use client";
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

interface Notification {
  id: number;
  title: string;
  content: string;
  timestamp: string;
}

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  return (
    <Container>
      <Paper elevation={3} style={{ minHeight: "500px", padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Notifications
        </Typography>
        <List>
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem>
                <ListItemText
                  primary={notification.title}
                  secondary={notification.content}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default NotificationScreen;
