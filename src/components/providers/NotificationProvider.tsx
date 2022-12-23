import { Alert, Snackbar } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

const NotificationProvider: React.FC<Props> = ({ children }) => {
  // Whether a notification is currently being displayed
  const [open, setOpen] = useState(false);

  // The notification which is currently being displayed
  const [currentNotification, setCurrentNotification] = useState<string>();

  // Notifications which are pending
  const [pendingNotifications, setPendingNotifications] = useState<string[]>(
    []
  );

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    // Ignore click away events
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleExited = () => {
    setCurrentNotification(undefined);
  };

  const dispatchNotification = useCallback((notification: string) => {
    setPendingNotifications((notifications) => [
      ...notifications,
      notification,
    ]);
  }, []);

  /**
   * Effect which displays the next notification.
   */
  useEffect(() => {
    // If there is a pending notification
    if (pendingNotifications.length) {
      // If there isn't currently a notification being displayed
      if (!currentNotification) {
        // Set the next current notification to be displayed
        setCurrentNotification(pendingNotifications[0]);
        // Remove the next notification from the pending notifications
        setPendingNotifications((notifications) => notifications.slice(1));
        // Display the next notification
        setOpen(true);
      } else {
        // If there is already a notification being displayed, close it
        if (open) {
          setOpen(false);
        }
      }
    }
  }, [pendingNotifications, currentNotification, open]);

  return (
    <NotificationContext.Provider
      value={{ currentNotification, dispatchNotification }}
    >
      {children}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        TransitionProps={{ onExited: handleExited }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert severity="info" variant="filled">
          {currentNotification}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

interface NotificationOptions {
  currentNotification?: string;
  dispatchNotification: (currentNotification: string) => void;
}

export const NotificationContext = React.createContext<NotificationOptions>({
  dispatchNotification: () => {},
});

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
