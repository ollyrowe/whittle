import React, { Suspense, useEffect, useState } from "react";

const fireAnimation = import(
  /* webpackChunkName: "animations", webpackPrefetch: true  */
  "./fire-animation.json"
);

// Lazy load the animation player as it's a heavy component
const Lottie = React.lazy(
  () =>
    import(
      /* webpackChunkName: "react-lottie-player", webpackPrefetch: true  */
      "react-lottie-player"
    )
);

interface Props {
  play: boolean;
  className?: string;
}

const FireAnimation: React.FC<Props> = ({ play, className }) => {
  const [animationData, setAnimationData] = useState<object>();

  const onLoad = async () => {
    setAnimationData(await fireAnimation);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Suspense fallback={<div className={className} />}>
      <Lottie
        animationData={animationData}
        play={play}
        loop
        className={className}
      />
    </Suspense>
  );
};

export default FireAnimation;
