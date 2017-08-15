import RENDER_TYPE from '../utils/render-type';

export default {
  name: 'image-card',
  type: RENDER_TYPE,
  render({env, payload}) {
    if (payload.src) {
      let { dom } = env;
      let figure = dom.createElement('figure');
      let image = dom.createElement('img');
      image.setAttribute('src', payload.src);
      figure.appendChild(image);
      return figure;
    }
  }
};
