export const scrollToBlock = (selector, offset = 0) => {
  const element = document.querySelector(selector);

  if (!element) {
    // Если элемент не найден, перенаправляем на главную с якорем
    const targetId = selector.replace('#', '');
    window.location.href = `/${targetId ? `#${targetId}` : ''}`;
    return;
  }

  const y = element.getBoundingClientRect().top + window.scrollY + offset;

  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });
};

const handleScrollLinkClick = e => {
  e.preventDefault();
  const target = e.target.href.split('#')[1];
  scrollToBlock(`#${target}`, 0);
};

export const initScrollToBlock = () => {
  const scrollLinks = document.querySelectorAll('[data-scrollto]');

  if (scrollLinks.length > 0) {
    scrollLinks.forEach(link => link.addEventListener('click', handleScrollLinkClick));
  }
};
