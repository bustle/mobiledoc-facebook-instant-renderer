/* global QUnit, SimpleDOM */
import Renderer from 'mobiledoc-facebook-instant-renderer';
import ImageCard from 'mobiledoc-facebook-instant-renderer/cards/image';
import {
  createBlankMobiledoc,
  createSimpleMobiledoc,
  createMobiledocWithCard,
  createMobiledocWithEmptyParagraph
} from '../helpers/create-mobiledoc';

const { test, module } = QUnit;
const dataUri = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=';
function render(mobiledoc, options={}) {
  let renderer = new Renderer({
    dom: new SimpleDOM.Document(),
    ...options
  });
  return renderer.render(mobiledoc).result;
}

function serializeToHTML(dom) {
  return new SimpleDOM.HTMLSerializer(SimpleDOM.voidMap).serializeChildren(dom);
}

function renderToHTML(mobiledoc, options={}) {
  return serializeToHTML(render(mobiledoc, options));
}

module('Unit: Mobiledoc Facebook Instant Renderer - 0.2');

test('version 0.2.0 is not supported', (assert) => {
  const mockMobiledoc = { version: '0.2.0' };
  assert.throws(
    () => render(mockMobiledoc),
    /Unsupported mobiledoc version.*0\.2\.0/i
  );
});

module('Unit: Mobiledoc Facebook Instant Renderer - 0.3');

test('blank mobiledoc', (assert) => {
  let result = renderToHTML(createBlankMobiledoc());
  assert.equal(result, '');
});

test('simple mobiledoc', (assert) => {
  let text = 'Hello';
  let result = renderToHTML(createSimpleMobiledoc({text}));
  assert.equal(result, `<p>${text}</p>`);
});

test('simple mobiledoc with pull-quote uses "aside" tag', (assert) => {
  let mobiledoc = createSimpleMobiledoc({sectionName: 'PULL-QUOTE'});
  assert.equal(renderToHTML(mobiledoc),
               '<aside>hello world</aside>');
});

test('renders a mobiledoc with built-in image card', (assert) => {
  let card = {
    name: ImageCard.name,
    payload: { src: dataUri }
  };
  let mobiledoc = createMobiledocWithCard({card});
  let html = renderToHTML(mobiledoc, {cards: [ImageCard]});
  assert.equal(html, `<figure><img src="${dataUri}"></figure>`);
});

test('empty paragraphs are skipped', (assert) => {
  let mobiledoc = createMobiledocWithEmptyParagraph();
  let html = renderToHTML(mobiledoc);
  assert.ok(!html.includes('<p></p>'));
});
