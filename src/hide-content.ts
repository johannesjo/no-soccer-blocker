import * as $ from 'jquery';

const SECTION_SELECTORS = '.section, section, article, .id-Teaser-el, .teaser, figure, .hs-widget';


const WORDS = ['Fußball', 'Bundesliga', 'Derby', 'Tabellenplatz'];
const STANDARD_CLASS = 'no-soccer-blocker-xyz';

export function hideContent() {
  $(document).ready(() => {
    setTimeout(() => {

      $(SECTION_SELECTORS).each((index, el) => {
        const t = el.textContent;
        if(t) {
          WORDS.some((word) => {
            if(t.includes(word)) {
              // const p = $(el).parents(`.${STANDARD_CLASS}`);
              // if(p) {
              //   p.show();
              // }
              replaceSection(el);
              console.log('No Soccer Blocker Replace:', word, t);
              return true;
            }
          });
        }
      });

      $('img').each((i, el) => {
        const t = $(el).attr('alt');
        console.log(t);

        if(t && $(el).is(':visible')) {
          WORDS.some((word) => {
            if(t.includes(word)) {
              replaceSection(el);
              console.log('No Soccer Blocker Replace IMG:', word, t);
              return true;
            }
          });
        }
      });


    }, 500);
  });
}

let i = 0;

function replaceSection(el: HTMLElement): number {
  const childId = `${STANDARD_CLASS}-inner-${i}`;

  const $el = $(el);
  const $btn = $('<button style="display: block; text-align: center; border: 4px solid black; padding: 10px 20px; cursor: pointer; width: 100%;">Show Hidden Content</button>');

  $el
    .children()
    .addClass(childId)
    .addClass(STANDARD_CLASS)
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
