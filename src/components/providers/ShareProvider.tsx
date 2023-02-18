import React, { useContext } from "react";
import { useNotificationContext } from "./NotificationProvider";
import { StreakStatistics } from "./StreakProvider";
import { isMobile, isTablet } from "../../misc/device";
import { Game } from "../../hooks/useGame";
import { Board } from "../../model/Board";
import { TileState } from "../../model/enums/TileState";
import { Tile } from "../../model/Tile";

interface Props {
  children?: React.ReactNode;
}

const ShareProvider: React.FC<Props> = ({ children }) => {
  // Extract notification controls
  const { dispatchNotification } = useNotificationContext();

  /**
   * Function which passes some text to the user agent's share
   * API, falling back to the clipboard if this is not possible.
   *
   * @param text - the text to share.
   */
  const shareText = async (text: string) => {
    // Create a shareable object from the text
    const shareableContent = { text };

    // If the share API should be used to share the content
    if (shouldShare(shareableContent)) {
      navigator.share(shareableContent);
    } else {
      // Otherwise, copy the text to the user's clipboard
      await navigator.clipboard.writeText(text);

      // Notify the user
      dispatchNotification("Copied to clipboard!");
    }
  };

  /**
   * Function which passes a file derived from a blob to the user
   * agent's share API, falling back to the clipboard if this is
   * not possible.
   *
   * @param blob - the blob to share.
   */
  const shareBlob = async (blob: Blob, filename: string) => {
    // Create a shareable file from the blob
    const image = new File([blob], filename, {
      type: blob.type,
    });

    // Create a shareable object from the file
    const shareableContent = { files: [image] };

    // If the share API should be used to share the content
    if (shouldShare(shareableContent)) {
      navigator.share(shareableContent);
    } else {
      // Otherwise, create an item that can be copied to the user's clipboard
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });

      await navigator.clipboard.write([clipboardItem]);

      // Notify the user
      dispatchNotification("Copied to clipboard!");
    }
  };

  return (
    <ShareContext.Provider value={{ shareText, shareBlob }}>
      {children}
    </ShareContext.Provider>
  );
};

export default ShareProvider;

/**
 * Determines whether the user's device supports the sharing
 * of a given piece of data.
 */
export const canShare = (content: ShareData) => {
  return !!(navigator.canShare && navigator.canShare(content));
};

/**
 * Determines whether the share API should be used to share data.
 *
 * This function checks that sharing is possible and that the user
 * is using a mobile or tablet device.
 */
export const shouldShare = (content: ShareData) => {
  return !!(canShare(content) && (isMobile || isTablet));
};

/**
 * Given a completed game, this function creates a shareable text
 * output which displays the user's solution as a series of emojis
 * as well as their statistics.
 *
 * @param game - the completed game.
 * @param streak - the user's current streak statistics.
 * @returns a shareable string.
 */
export const createShareText = (game: Game, streak: StreakStatistics) => {
  const lines: string[] = [];

  lines.push(`#whittle${game.number}`);
  lines.push("");

  const rows: Tile[][] = [];

  for (let row = 1; row <= Board.HEIGHT; row++) {
    const tiles: Tile[] = [];

    for (let column = 1; column <= Board.WIDTH; column++) {
      const tile = game.board.getTileAt(column, row)!;

      tiles.push(tile);
    }

    rows.push(tiles);
  }

  rows.forEach((row) => {
    const characters = row.map((tile) => {
      switch (tile.getState()) {
        case TileState.CORRECT:
          return tileCharacters.green;
        case TileState.CORRECT_THEME_WORD:
          return tileCharacters.blue;
        default:
          return tileCharacters.grey;
      }
    });

    lines.push(characters.join(""));
  });

  lines.push("");

  lines.push(`⌛time: ${game.timer.text}`);
  lines.push(`📊score: ${game.score} pts`);
  lines.push(`🔥streak: ${streak.currentStreak.length}`);

  lines.push("whittlegame.com");

  return lines.join("\n");
};

const tileCharacters = { green: "🟩", blue: "🟦", grey: "⬜" };

interface ShareControls {
  shareText: (text: string) => Promise<void>;
  shareBlob: (blob: Blob, filename: string) => Promise<void>;
}

export const ShareContext = React.createContext<ShareControls>({
  shareText: () => Promise.resolve(),
  shareBlob: () => Promise.resolve(),
});

export const useShareContext = () => {
  return useContext(ShareContext);
};
