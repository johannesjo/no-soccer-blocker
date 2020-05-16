import * as $ from 'jquery';

const SECTION_SELECTORS = '.section, section, article, .article, .id-Teaser-el, .teaser, figure, .hs-widget, .sz-teaserlist-element, .szFussballTickerTeasermodul, .teaser-media, .thema_clip_large [role="region"], .park-opener, .pdb-teaser, .pdb-teaser3-row-item, [role="listitem"]';

const WORDS = ['Fußball', 'Bundesliga', 'Derby', 'Tabellenplatz', 'Geisterspiel', 'Spieltag', 'Schalke', 'BVB', 'FC Bayern', 'Wechsel-Poker', 'DFB', 'Hertha', 'FC '].map(w => w.toLowerCase());
const STANDARD_CLASS = 'no-soccer-blocker-xyz';

let i = 0;

export function hideContent(): Promise<number> {
  return new Promise<number>(resolve => {
    $(document).ready(() => {
      if(!window.location.origin.includes('tagesschau')) {
        _hideContent();
      }
      setTimeout(() => {
        _hideContent();
      }, 500);
      setTimeout(() => {
        _hideContent();
      }, 750);
      setInterval(() => {
        _hideContent();
      }, 2500);
    });
  });
}


function _hideContent() {
  $(SECTION_SELECTORS).each((index, el) => {
    const $el = $(el);
    const t = $el.text().toLowerCase();

    if(t && $el.is(':visible') && t.length < 2000) {
      WORDS.some((word) => {
        if(t.includes(word)) {
          // const childs = $el.find(SECTION_SELECTORS);
          // if(childs) {
          //   replaceSection(childs);
          // } else {
          replaceSection($el);
          // }
          console.log('No Soccer Blocker Replace:', word, $el, t);
          return true;
        }
      });
    }
  });

  $('img').each((i, el) => {
    const $img = $(el);
    const t = $img.attr('alt');

    if(t && $img.is(':visible')) {
      WORDS.some((word) => {
        if(t.includes(word)) {
          replaceImage($img);
          console.log('No Soccer Blocker Replace IMG:', word, $img, t);
          return true;
        }
      });
    }
  });
}

function createBtn(): JQuery<any> {
  return $('<button style="display: block; text-align: center; border: 4px solid black; padding: 10px 20px; cursor: pointer; width: 100%; font-size: 14px;">Langweilig</button>');
}

function replaceSection($el: JQuery<any>): number {
  const childId = `${STANDARD_CLASS}-inner-${i}`;

  if($el.hasClass(STANDARD_CLASS)) {
    return;
  }

  const $btn = createBtn();

  $el
    .addClass(STANDARD_CLASS)
    .children()
    .addClass(childId)
    .hide();

  $el
    .append($btn);

  $btn.click((ev) => {
    // don't bubble
    ev.preventDefault();
    ev.stopPropagation();

    $el.children().show();
    $btn.remove();
  });

  i++;
  return i;
}


function replaceImage($el: JQuery<any>): number {
  if($el.hasClass(STANDARD_CLASS)) {
    return;
  }

  const $btn = createBtn();

  $el
    .insertBefore($btn)
    .addClass(STANDARD_CLASS)
    .hide();

  $btn.click((ev) => {
    // don't bubble
    ev.preventDefault();
    ev.stopPropagation();

    $el
      .show();
    $btn.remove();
  });

  i++;
  return i;
}
