"use client";
import React from "react";
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

interface NotificationScreenProps {
  notifications: Notification[];
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({
  notifications,
}) => {
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
