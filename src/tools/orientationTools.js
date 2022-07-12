import * as ScreenOrientation from "expo-screen-orientation";

export const landscapeOrientation = () => {
  ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
};
