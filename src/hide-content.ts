import * as $ from 'jquery';
import {isInIframe} from './is-in-iframe';
import {msgBackground} from './msg-background';

const IS_DEV = false;

const SECTION_SELECTORS = '.section, section, article, .article, .id-Teaser-el, .teaser, figure, .hs-widget, .sz-teaserlist-element, .szFussballTickerTeasermodul, .teaser-media, .thema_clip_large [role="region"], .park-opener, .pdb-teaser, .pdb-teaser3-row-item, [role="listitem"]';

const WORDS = ['Fußball', 'Bundesliga', 'Derby', 'Tabellenplatz', 'Geisterspiel', 'Spieltag', 'Schalke', 'BVB', 'FC Bayern', 'Wechsel-Poker', 'DFB', 'Hertha', 'FC ', 'Strafraum', 'Eintracht Frankfurt', 'Einzelkritik', 'Torjubel', 'DFL'].map(w => w.toLowerCase());
const STANDARD_CLASS = 'no-soccer-blocker-xyz';

let count = 0;

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
  const isIframe = isInIframe();

  if(isIframe) {
    _checkSectionEl($('body'), 99999999);
  } else {
    $(SECTION_SELECTORS).each((index, el) => {
      _checkSectionEl(el);
    });
    $('img').each((i, el: HTMLImageElement) => {
      _checkImage(el);
    });
    msgBackground($(`.${STANDARD_CLASS}`).length);
  }
}

function _checkSectionEl(el: HTMLElement | JQuery<any>, maxSectionLength = 8000) {
  const $el = $(el);
  const t = $el.text().toLowerCase();

  if(t && $el.is(':visible') && t.length < maxSectionLength) {
    WORDS.some((word) => {
      if(t.includes(word)) {
        // const childs = $el.find(SECTION_SELECTORS);
        // if(childs) {
        //   replaceSection(childs);
        // } else {
        _replaceSection($el);
        // }
        IS_DEV && console.log('No Soccer Blocker Replace:', word, $el, t);
        return true;
      }
    });
  }
}

function _checkImage(img: HTMLImageElement) {
  const $img = $(img);
  const t = $img.attr('alt');

  if(t && $img.is(':visible')) {
    WORDS.some((word) => {
      if(t.includes(word)) {
        _replaceImage($img);
        IS_DEV && console.log('No Soccer Blocker Replace IMG:', word, $img, t);
        return true;
      }
    });
  }
}

function _createBtn(): JQuery<any> {
  return $('<button style="display: block; text-align: center; border: 4px solid black; padding: 10px 20px; cursor: pointer; width: 100%; font-size: 14px;">Langweilig</button>');
}

function _replaceSection($el: JQuery<any>): number {
  const childId = `${STANDARD_CLASS} - inner -${count}`;

  if($el.hasClass(STANDARD_CLASS)) {
    return;
  }

  const $btn = _createBtn();

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

  count++;
  return count;
}


function _replaceImage($el: JQuery<any>): number {
  if($el.hasClass(STANDARD_CLASS)) {
    return;
  }

  const $btn = _createBtn();

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

  count++;
  return count;
}
