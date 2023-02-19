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
import { useModalContext } from "../../providers/ModalProvider";

const SettingsModal: React.FC = () => {
  // Extract modal state and controls
  const { displaySettings, closeSettings } = useModalContext();

  // Extract game state
  const { settings, board } = useGameContext();

  const theme = useTheme();

  // Whether the enable restricted mode confirmation dialog should be displayed
  const [displayConfirmRestrictedMode, setDisplayConfirmRestrictedMode] =
    useState(false);

  const onToggleRestrictedMode = () => {
    // If restricted mode is about to be enabled and there is a letter on the board
    if (!settings.enableRestrictedMode && board.hasLetterTile()) {
      setDisplayConfirmRestrictedMode(true);
    } else {
      settings.toggleRestrictedMode();
    }
  };

  const confirmEnableRestrictedMode = () => {
    settings.toggleRestrictedMode();
    // Close the confirmation dialog
    closeConfirmationDialog();
    // Close the settings modal
    closeSettings();
  };

  const closeConfirmationDialog = () => {
    setDisplayConfirmRestrictedMode(false);
  };

  return (
    <>
      <Modal
        title="Settings"
        open={displaySettings && !displayConfirmRestrictedMode}
        onClose={closeSettings}
        aria-describedby="settings"
        data-testid="settings-modal"
      >
        <List id="settings">
          <ListItem disableGutters>
            <ListItemText
              id="restricted-mode-label"
              primary="Restricted Mode"
              secondary="Disables part of the board"
            />
            <Switch
              edge="end"
              checked={settings.enableRestrictedMode}
              onChange={onToggleRestrictedMode}
              inputProps={{ "aria-labelledby": "restricted-mode-label" }}
              disabled={board.isDisabled()}
              data-testid="restricted-mode-toggle"
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
            <ListItemText
              id="hints-label"
              primary="Hints"
              secondary="Displays game hints"
            />
            <Switch
              edge="end"
              checked={settings.enableHints}
              onChange={settings.toggleHints}
              inputProps={{ "aria-labelledby": "hints-label" }}
              data-testid="hints-toggle"
            />
          </ListItem>
          <Divider />
          <ListItem disableGutters>
            <ListItemText primary="Feedback" />
            <TwitterLink />
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
        text="Enabling restricted mode will reset the board, are you sure?"
        open={displayConfirmRestrictedMode}
        onConfirm={confirmEnableRestrictedMode}
        onReject={closeConfirmationDialog}
      />
    </>
  );
};

export default SettingsModal;

const TwitterLink: React.FC = () => {
  return (
    <Link
      underline="none"
      target="_blank"
      href="https://twitter.com/WhittleGame"
      data-testid="twitter-link"
    >
      <Typography color="GrayText">Twitter</Typography>
    </Link>
  );
};

const CaptionContainer = styled.div`
  display: flex;
  margin-top: 1em;
`;
