import React from "react";
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

interface Props {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<Props> = ({ open, onClose }) => {
  const { settings } = useGameContext();

  const theme = useTheme();

  return (
    <Modal
      title="Settings"
      open={open}
      onClose={onClose}
      aria-describedby="settings"
    >
      <List id="settings">
        <ListItem disableGutters>
          <ListItemText
            id="easy-mode-label"
            primary="Easy Mode"
            secondary="Reveals a set of hints"
          />
          <Switch
            edge="end"
            checked={settings.enableEasyMode}
            onChange={settings.toggleEasyMode}
            inputProps={{ "aria-labelledby": "easy-mode-label" }}
            disabled
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
          />
        </ListItem>
        <Divider />
        <ListItem disableGutters>
          <ListItemText primary="Feedback" />
          <Link underline="none" href="/">
            <Typography color="GrayText">Email</Typography>
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
  );
};

export default SettingsModal;

const CaptionContainer = styled.div`
  display: flex;
  margin-top: 1em;
`;
