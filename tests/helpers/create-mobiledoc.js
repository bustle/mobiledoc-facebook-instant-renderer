const MOBILEDOC_VERSION_0_3_1 = '0.3.1';
const MOBILEDOC_VERSION = MOBILEDOC_VERSION_0_3_1;

const MARKUP_SECTION_TYPE = 1;
const IMAGE_SECTION_TYPE = 2; // eslint-disable-line
const LIST_SECTION_TYPE = 3; // eslint-disable-line
const CARD_SECTION_TYPE = 10;

const MARKUP_MARKER_TYPE = 0;
const ATOM_MARKER_TYPE = 1; // eslint-disable-line

export function createBlankMobiledoc({ version = MOBILEDOC_VERSION } = {}) {
  return {
    version,
    atoms: [],
    cards: [],
    markups: [],
    sections: []
  };
}

export function createMobiledocWithAtom(
  { version = MOBILEDOC_VERSION, atom } = {}
) {
  return {
    version,
    atoms: [atom],
    cards: [],
    markups: [],
    sections: [[MARKUP_SECTION_TYPE,
      'P',
      [[ATOM_MARKER_TYPE, [], 0, 0]]]
    ]
  };
}

export function createMobiledocWithCard(
  { version = MOBILEDOC_VERSION, card } = {}
) {
  return {
    version,
    atoms: [],
    cards: [[card.name, card.payload || {}]],
    markups: [],
    sections: [[CARD_SECTION_TYPE, 0]]
  };
}

export function createSimpleMobiledoc(
  {
    sectionName = 'p',
    text = 'hello world',
    markup = null,
    version = MOBILEDOC_VERSION
  } = {}
) {
  let openedMarkups = markup ? [0] : [];
  let closedMarkups = markup ? 1 : 0;
  let markups = markup ? [markup] : [];
  return {
    version,
    atoms: [],
    cards: [],
    markups,
    sections: [
      [
        MARKUP_SECTION_TYPE,
        sectionName,
        [[MARKUP_MARKER_TYPE, openedMarkups, closedMarkups, text]]
      ]
    ]
  };
}

export function createMobiledocWithEmptyParagraph({ version = MOBILEDOC_VERSION } = {}) {
  return {
    version,
    atoms: [],
    cards: [],
    markups: [],
    sections: [
      [1, 'p', []]
    ]
  };
}
