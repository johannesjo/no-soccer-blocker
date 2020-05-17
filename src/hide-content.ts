import * as $ from 'jquery';
import {isInIframe} from './is-in-iframe';
import {msgBackground} from './msg-background';
import {DEFAULT_OPTS, OptionsModel} from './options.model';

const IS_DEV = false;

const SECTION_SELECTORS = '.section, section, article, .article, .id-Teaser-el, .teaser, figure, .hs-widget, .sz-teaserlist-element, .szFussballTickerTeasermodul, .teaser-media, .thema_clip_large [role="region"], .park-opener, .pdb-teaser, .pdb-teaser3-row-item, [role="listitem"], .hcf-ressort, .promo, .clearfix, .info, .o-teaser, .vhb-teaser';

const DEFAULT_MAX_SECTION_LENGTH = 3000;

let WORDS = [];
let BTN_TXT;

chrome.storage.sync.get({
  words: DEFAULT_OPTS.words,
  btnTxt: DEFAULT_OPTS.btnTxt,
}, ({words, btnTxt}: OptionsModel) => {
  WORDS = words.toLowerCase().split(',');
  BTN_TXT = btnTxt;
});
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

$(window).focus(_updateCounter);

function _updateCounter() {
  if(!document.hidden) {
    msgBackground($(`.${STANDARD_CLASS}`).length);
  }
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

    _updateCounter();
  }
}

function _checkSectionEl(el: HTMLElement | JQuery<any>, maxSectionLength = DEFAULT_MAX_SECTION_LENGTH) {
  const $el = $(el);
  const t = $el.text().toLowerCase().replace(/  +/g, ' ');

  // if(maxSectionLength === DEFAULT_MAX_SECTION_LENGTH) {
  //   console.log(t.length, $el, t);
  // }

  if(t && t.length < maxSectionLength) {
    WORDS.some((word) => {
      if(t.includes(word)) {
        // const childs = $el.find(SECTION_SELECTORS);
        // if(childs) {
        //   replaceSection(childs);
        // } else {
        _replaceSection($el, word);
        // }
        IS_DEV && console.log('No Soccer Blocker Replace:', word, $el, t);
        return true;
      }
    });
  }
}

function _checkImage(img: HTMLImageElement) {
  const $img = $(img);
  const alt = $img.attr('alt');
  const t = alt && alt.toLowerCase();

  if(t && $img.is(':visible')) {
    WORDS.some((word) => {
      if(t.includes(word)) {
        _replaceImage($img, word);
        IS_DEV && console.log('No Soccer Blocker Replace IMG:', word, $img, t);
        return true;
      }
    });
  }
}

function _createBtn(word: string): JQuery<any> {
  const btnTxt = IS_DEV
    ? word
    : (BTN_TXT && BTN_TXT.trim().length > 0)
      ? BTN_TXT
      : word;

  return $(`<button style="display: block; text-align: center; border: 4px solid black; padding: 10px 20px; cursor: pointer; width: 100%; font-size: 14px;" data-word="${word}">${btnTxt}</button>`);
}

function _replaceSection($el: JQuery<any>, word: string): number {
  const childId = `${STANDARD_CLASS} - inner -${count}`;

  if($el.hasClass(STANDARD_CLASS)) {
    return;
  }

  const $btn = _createBtn(word);

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


function _replaceImage($img: JQuery<any>, word: string): number {
  if($img.hasClass(STANDARD_CLASS)) {
    return;
  }

  const $btn = _createBtn(word);
  const $par = $img.closest(SECTION_SELECTORS);

  if($par) {
    _replaceSection($par, word);
  } else {
    $img
      .insertBefore($btn)
      .addClass(STANDARD_CLASS)
      .css({opacity: 0});

    $btn.click((ev) => {
      // don't bubble
      ev.preventDefault();
      ev.stopPropagation();

      $img
        .show();
      $btn.remove();
    });
  }

  count++;
  return count;
}
