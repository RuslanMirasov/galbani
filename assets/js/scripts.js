import { popup } from './popup.js';
import { hidePreloader, initNavigationMenu, initHeaderFixed } from './helpers.js';
import { initSelectInputs, initStickyFilters } from './select.js';
import { initScrollToBlock } from './scrollToBlock.js';
import { initQuiz } from './quiz.js';
import { initLanguageSwitcher } from './language-switcher.js';

popup.init();
window.popup = popup;

initNavigationMenu();
initHeaderFixed();
initScrollToBlock();
initSelectInputs();
initStickyFilters();
initQuiz();
initLanguageSwitcher();
hidePreloader();

window.addEventListener('pageshow', e => {
  if (e.persisted) {
    document.querySelector('.body')?.classList.add('loaded');
  }
});
