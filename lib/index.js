import Renderer from './renderer-factory';

export function registerGlobal(window) {
  window.MobiledocFacebookInstantRenderer = Renderer;
}

import RENDER_TYPE from './utils/render-type';
export { RENDER_TYPE, Renderer };

export default Renderer;
