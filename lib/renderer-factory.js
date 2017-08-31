import MobiledocDOMRenderer from 'mobiledoc-dom-renderer';
import imageCard from './cards/image';

const SUPPORTED_VERSIONS = ['0.3.0', '0.3.1'];
function skipEmptySections(mobiledoc) {
  const sections = mobiledoc.sections.filter((section) => {
    const isEmpty = section[0] === 1 && section[2].length === 0;
    return !isEmpty;
  });
  return {
    ...mobiledoc,
    sections
  };
}

export default class RendererFactory {
  constructor(_options={}) {
    var options = {};
    var key;
    for (key in _options) {
      if (_options.hasOwnProperty(key)) {
        options[key] = _options[key];
      }
    }
    options.sectionElementRenderer = options.sectionElementRenderer || {};
    if (!options.sectionElementRenderer['PULL-QUOTE']) {
      options.sectionElementRenderer['PULL-QUOTE'] = (_, dom) => dom.createElement('aside');
    }
    options.cards = options.cards || [imageCard];
    this.renderer = new MobiledocDOMRenderer(options);
  }

  render(mobiledoc) {
    const { version } = mobiledoc;
    if (!SUPPORTED_VERSIONS.includes(version)) {
      throw new Error(`Unsupported mobiledoc version: "${version}"`);
    }
    return this.renderer.render(skipEmptySections(mobiledoc));
  }
}
