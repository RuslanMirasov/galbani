export const scrollToBlock = (selector, offset = 0) => {
  const element = document.querySelector(selector);

  if (!element) {
    const targetId = selector.replace('#', '');
    const newUrl = `/${targetId ? `#${targetId}` : ''}`;

    if (window.location.pathname === '/' || window.location.pathname === '') {
      window.location.hash = targetId;
      window.location.reload(); // для iOS
    } else {
      window.location.assign(newUrl);
    }
    return;
  }

  const y = element.getBoundingClientRect().top + window.scrollY + offset;

  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });
};

const handleScrollLinkClick = e => {
  const targetHref = e.currentTarget.getAttribute('href');
  const targetId = targetHref.split('#')[1];

  if (!targetId) return;

  e.preventDefault();
  scrollToBlock(`#${targetId}`, 0);
};

export const initScrollToBlock = () => {
  const scrollLinks = document.querySelectorAll('[data-scrollto]');
  scrollLinks.forEach(link => link.addEventListener('click', handleScrollLinkClick));
};
