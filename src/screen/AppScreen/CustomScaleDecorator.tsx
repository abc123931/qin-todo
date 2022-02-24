import type { ReactElement, VFC } from "react";
import { useRef } from "react";
import { useOnCellActiveAnimation } from "react-native-draggable-flatlist";
import Animated, { interpolate, interpolateNode } from "react-native-reanimated";

const useNode = <T,>(node: Animated.Node<T>) => {
  const ref = useRef<Animated.Node<T> | null>(null);
  if (ref.current === null) {
    ref.current = node;
  }
  return ref.current;
};

type DecoratorProps = {
  children: ReactElement;
};
const interpolateFn = (interpolateNode || interpolate) as unknown as typeof interpolateNode;

export const CustomScaleDecorator: VFC<DecoratorProps> = (props) => {
  const { isActive, onActiveAnim } = useOnCellActiveAnimation({
    animationConfig: { mass: 0.1, restDisplacementThreshold: 0.0001 },
  });

  const animScale = useNode(
    interpolateFn(onActiveAnim, {
      inputRange: [0, 1],
      outputRange: [1, 1.1],
    })
  );
  const animTranslate = useNode(
    interpolateFn(onActiveAnim, {
      inputRange: [0, 1],
      outputRange: [0, 20],
    })
  );
  const scale = isActive ? animScale : 1;
  const translate = isActive ? animTranslate : 0;

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateX: translate }, { scaleX: scale }, { scaleY: scale }],
        },
      ]}
    >
      {props.children}
    </Animated.View>
  );
};
