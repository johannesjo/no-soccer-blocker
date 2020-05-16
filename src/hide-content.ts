import * as $ from 'jquery';

const SECTION_SELECTORS = '.section, section, article, .article, .id-Teaser-el, .teaser, figure, .hs-widget, .sz-teaserlist-element, .szFussballTickerTeasermodul, .teaser-media, .thema_clip_large [role="region"]';

const WORDS = ['Fußball', 'Bundesliga', 'Derby', 'Tabellenplatz', 'Geisterspiel', 'Spieltag'];
const STANDARD_CLASS = 'no-soccer-blocker-xyz';

let i = 0;

export function hideContent(): Promise<number> {
  return new Promise<number>(resolve => {
    $(document).ready(() => {
      setTimeout(() => {
        _hideContent();
        resolve(i);
      }, 400);
      setTimeout(() => {
        _hideContent();
      }, 500);
      setTimeout(() => {
        _hideContent();
      }, 750);
      setTimeout(() => {
        _hideContent();
      }, 2500);
      setInterval(() => {
        _hideContent();
      }, 5000);
    });
  });
}


function _hideContent() {
  $(SECTION_SELECTORS).each((index, el) => {
    const $el = $(el);
    const t = $el.text();

    if(t && $el.is(':visible') && t.length < 1500) {
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

function replaceSection($el: JQuery<any>): number {
  const id = `${STANDARD_CLASS}-${i}`;
  const childId = `${STANDARD_CLASS}-inner-${i}`;

  if($el.hasClass(STANDARD_CLASS)) {
    return;
  }

  const $btn = $('<button style="display: block; text-align: center; border: 4px solid black; padding: 10px 20px; cursor: pointer; width: 100%;">Show Hidden Content</button>');

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
  const id = `${STANDARD_CLASS}-${i}`;

  if($el.hasClass(STANDARD_CLASS)) {
    return;
  }

  const $btn = $('<button style="display: block; text-align: center; border: 4px solid black; padding: 10px 20px; cursor: pointer; width: 100%;">Show Hidden Content</button>');

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
