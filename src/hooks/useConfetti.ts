import { CSSProperties, useCallback, useRef } from "react";

/**
 * Hook which enables programmatic confetti firing!
 *
 * The consumer of this hook should pass the canvas properties
 * to the underlying react-canvas-confetti component.
 *
 * @returns canvas-confetti props and fire controls.
 */
export const useConfetti = (): ConfettiControls => {
  const refAnimationInstance = useRef<Confetti | null>(null);

  const getInstance = useCallback<RefConfetti>((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback<MakeShot>(
    (particleRatio: number, options: any) => {
      refAnimationInstance.current &&
        refAnimationInstance.current({
          ...options,
          origin: { y: 0.7 },
          particleCount: Math.floor(200 * particleRatio),
        });
    },
    []
  );

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  const canvasProps = {
    refConfetti: getInstance,
    style: canvasStyles,
  };

  return { canvasProps, fire };
};

export interface ConfettiControls {
  canvasProps: {
    refConfetti: RefConfetti;
    style: CSSProperties;
  };
  fire: () => void;
}

/**
 * Styles to be applied to the confetti canvas component.
 */
const canvasStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

interface ConfettiOptions {
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
}

interface Confetti {
  (options?: ConfettiOptions): Promise<null> | null;
  reset: () => void;
}

type RefConfetti = (confetti: Confetti | null) => void;

type MakeShot = (particleRatio: number, options: ConfettiOptions) => void;
