import React, { useState } from "react";
import styled from "styled-components";
import packageJson from "../../../../package.json";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Switch,
  Divider,
  Link,
  useTheme,
} from "@mui/material";
import { useGameContext } from "../../providers/GameProvider";
import Modal from "../Modal";
import ConfirmationDialog from "../../misc/ConfirmationDialog";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<Props> = ({ open, onClose }) => {
  const { settings, board } = useGameContext();

  const theme = useTheme();

  // Whether the enable hard mode confirmation dialog should be displayed
  const [displayConfirmHardMode, setDisplayConfirmHardMode] = useState(false);

  const onToggleHardMode = () => {
    // If hard mode is about to be enabled and there is a letter on the board
    if (!settings.enableHardMode && board.hasLetterTile()) {
      setDisplayConfirmHardMode(true);
    } else {
      settings.toggleHardMode();
    }
  };

  const confirmEnableHardMode = () => {
    settings.toggleHardMode();
    // Close the confirmation dialog
    closeConfirmationDialog();
    // Close the settings modal
    onClose();
  };

  const closeConfirmationDialog = () => {
    setDisplayConfirmHardMode(false);
  };

  return (
    <>
      <Modal
        title="Settings"
        open={open && !displayConfirmHardMode}
        onClose={onClose}
        aria-describedby="settings"
        data-testid="settings-modal"
      >
        <List id="settings">
          <ListItem disableGutters>
            <ListItemText
              id="hard-mode-label"
              primary="Hard Mode"
              secondary="Disables part of the board"
            />
            <Switch
              edge="end"
              checked={settings.enableHardMode}
              onChange={onToggleHardMode}
              inputProps={{ "aria-labelledby": "hard-mode-label" }}
              disabled={board.isDisabled()}
              data-testid="hard-mode-toggle"
            />
          </ListItem>
          <Divider />
          <ListItem disableGutters>
            <ListItemText id="dark-theme-label" primary="Dark Theme" />
            <Switch
              edge="end"
              checked={theme.palette.mode === "dark"}
              onChange={settings.toggleTheme}
              inputProps={{ "aria-labelledby": "dark-theme-label" }}
              data-testid="dark-theme-toggle"
            />
          </ListItem>
          <Divider />
          <ListItem disableGutters>
            <ListItemText
              id="high-contrast-mode-label"
              primary="High Contrast Mode"
              secondary="For improved colour vision"
            />
            <Switch
              edge="end"
              checked={settings.enableHighContrastMode}
              onChange={settings.toggleHighContrastMode}
              inputProps={{ "aria-labelledby": "high-contrast-mode-label" }}
              data-testid="high-contrast-toggle"
            />
          </ListItem>
          <Divider />
          <ListItem disableGutters>
            <ListItemText id="sound-fx-label" primary="Sound FX" />
            <Switch
              edge="end"
              checked={settings.enableSoundFx}
              onChange={settings.toggleSoundFx}
              inputProps={{ "aria-labelledby": "sound-fx-label" }}
              data-testid="sound-fx-toggle"
            />
          </ListItem>
          <Divider />
          <ListItem disableGutters>
            <ListItemText primary="Feedback" />
            <Link underline="none" href="https://twitter.com/WhittleGame">
              <Typography color="GrayText">Twitter</Typography>
            </Link>
          </ListItem>
          <Divider />
          <CaptionContainer>
            <Typography color="GrayText" variant="caption">
              © {new Date().getFullYear()} Whittle
            </Typography>
            <Typography color="GrayText" variant="caption" marginLeft="auto">
              v{packageJson.version}
            </Typography>
          </CaptionContainer>
        </List>
      </Modal>
      <ConfirmationDialog
        title="Confirm reset board"
        text="Enabling hard mode will reset the board, are you sure?"
        open={displayConfirmHardMode}
        onConfirm={confirmEnableHardMode}
        onReject={closeConfirmationDialog}
      />
    </>
  );
};

export default SettingsModal;

const CaptionContainer = styled.div`
  display: flex;
  margin-top: 1em;
`;
