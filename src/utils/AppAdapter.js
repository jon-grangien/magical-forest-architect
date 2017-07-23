import app from '../main';
import WaterPlane from '../components/WaterPlane';
import * as constants from '../constants';

/**
 * Adapter client-interface for the app object
 */
class AppAdapter {
  static addWater() {
    app.addComponent(constants.WATER_COMPONENT, new WaterPlane({
      width: constants.PLANE_WIDTH_HEIGHT,
      height: constants.PLANE_WIDTH_HEIGHT,
      widthSegments: constants.PLANE_WIDTH_HEIGHT_SEGMENTS,
      heightSegments: constants.PLANE_WIDTH_HEIGHT_SEGMENTS,
    }));
  }

  static removeWater() {
    app.removeComponent(constants.WATER_COMPONENT);
  }
}

export default AppAdapter