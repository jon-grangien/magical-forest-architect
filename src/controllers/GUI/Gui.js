import dat from 'dat-gui';

class Gui {
  constructor() {
    const gui = new dat.GUI();

    const msg = {
      message: 'hej'
    }

    gui.add(msg, 'message');
  }
}

export default Gui
