import { useEffect, useState } from "react";

import { animated, useSpring } from "react-spring";

const AnimatedUpDown = ({ children, duration, height, ...props }: any) => {
  const [isToggled, setToggled] = useState(false);

  const { y } = useSpring({
    y: isToggled ? height || 80 : 0,
    config: { duration: duration || 1000 },
    reverse: isToggled,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setToggled(!isToggled);
    }, duration || 1000);
    return () => clearInterval(intervalId);
  }, [isToggled]);

  return (
    <animated.div
      style={{
        transform: y.to((y: number) => `translate3d(0, ${y}%, 0)`),
        ...props,
      }}
    >
      {children}
    </animated.div>
  );
};

export default AnimatedUpDown;
