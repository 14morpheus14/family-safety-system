import {
  Dimensions,
} from 'react-native';

const {
  width,
  height,
} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

const scale = width / guidelineBaseWidth;

const verticalScale =
  height / guidelineBaseHeight;

export const moderateScale = (
  size: number,
  factor = 0.35
) => {
  return (
    size +
    (scale * size - size) * factor
  );
};

export const verticalModerateScale = (
  size: number,
  factor = 0.35
) => {
  return (
    size +
    (verticalScale * size - size) *
      factor
  );
};

export const font = (
  size: number
) => {
  return moderateScale(size, 0.3);
};
