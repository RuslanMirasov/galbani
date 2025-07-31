export const initSelectInputs = () => {
  const selectInputs = document.querySelectorAll('[data-select]');
  if (selectInputs.length === 0) return;

  function closeAllSelects() {
    document.querySelectorAll('.select.open').forEach(select => {
      select.classList.remove('open');
    });
  }

  selectInputs.forEach(select => {
    const button = select.querySelector('[data-select-button]');
    const dropdown = select.querySelector('.select__dropdown');
    const hiddenInput = select.querySelector('input[type="hidden"]');

    button.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = select.classList.contains('open');
      closeAllSelects(); // Закрываем все селекты
      if (!isOpen) {
        // Если текущий был закрыт — открываем его
        select.classList.add('open');
      }
    });

    dropdown.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', () => {
        const value = item.getAttribute('data-value');
        const text = item.textContent;
        hiddenInput.value = value;
        button.innerHTML = `<span>${text}</span>`;
        select.classList.remove('open');
      });
    });
  });

  document.addEventListener('click', closeAllSelects);
};

export const initStickyFilters = () => {
  const wrapper = document.querySelector('.filters-wrapper');
  if (!wrapper) return;

  let offset = 0;
  let enabled = false;

  const recalculateOffset = () => {
    const rect = wrapper.getBoundingClientRect();
    offset = rect.top + window.scrollY - 80;
  };

  const onScroll = () => {
    if (!enabled) return;
    if (window.scrollY >= offset) {
      wrapper.classList.add('fixed');
    } else {
      wrapper.classList.remove('fixed');
    }
  };

  const onResize = () => {
    const shouldEnable = window.innerWidth >= 1280;
    if (shouldEnable && !enabled) {
      enabled = true;
      recalculateOffset();
      onScroll();
      window.addEventListener('scroll', onScroll);
    }

    if (!shouldEnable && enabled) {
      enabled = false;
      wrapper.classList.remove('fixed');
      window.removeEventListener('scroll', onScroll);
    }
  };

  // Инициализация
  onResize(); // запускает пересчёт, если > 1280
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);
};
