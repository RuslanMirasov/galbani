export const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const resizeLogo = () => {
  const logoWrapper = document.querySelector('.header__logo');
  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    logoWrapper.classList.remove('header__logo--small');
  } else {
    logoWrapper.classList.add('header__logo--small');
  }
};

export const hidePreloader = () => {
  resizeLogo();
  const body = document.querySelector('.body');
  const procentEl = document.querySelector('[data-load-procent]');

  if (!procentEl || !body) return;

  let loaded = 0;
  let total = 0;

  const markLoaded = () => {
    loaded++;
    const percent = Math.round((loaded / total) * 100);
    procentEl.textContent = percent;
    if (loaded === total) {
      setTimeout(() => {
        body.classList.add('loaded');
      }, 300);
    }
  };

  const imgElements = Array.from(document.images).filter(img => img.loading !== 'lazy');
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const backgroundImageUrls = Array.from(document.querySelectorAll('*'))
    .map(el => getComputedStyle(el).backgroundImage)
    .filter(bg => bg && bg !== 'none')
    .map(bg => {
      const match = bg.match(/url\(["']?(.*?)["']?\)/);
      return match ? match[1] : null;
    })
    .filter(Boolean);

  document.fonts.ready.then(markLoaded).catch(markLoaded);

  total = imgElements.length + stylesheets.length + scripts.length + backgroundImageUrls.length + 1; // +1 за шрифты

  if (total === 0) {
    procentEl.textContent = '100';
    body.classList.add('loaded');
    return;
  }

  imgElements.forEach(img => {
    if (img.complete) {
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded);
      img.addEventListener('error', markLoaded);
    }
  });

  stylesheets.forEach(link => {
    if (link.sheet) {
      markLoaded();
    } else {
      link.addEventListener('load', markLoaded);
      link.addEventListener('error', markLoaded);
    }
  });

  scripts.forEach(script => {
    if (script.readyState === 'complete') {
      markLoaded();
    } else {
      script.addEventListener('load', markLoaded);
      script.addEventListener('error', markLoaded);
    }
  });

  backgroundImageUrls.forEach(url => {
    fetch(url).then(markLoaded).catch(markLoaded);
  });

  setTimeout(() => {
    if (loaded < total) {
      body.classList.add('loaded');
    }
  }, 4000);
};

export const initNavigationMenu = () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.navigation ');
  const menuLinks = document.querySelectorAll('.menu__link');

  const toggleMenu = () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');

    if (window.innerWidth < 768) {
      if (burger.classList.contains('open')) {
        document.body.classList.add('locked');
      } else {
        document.body.classList.remove('locked');
      }
    }
  };

  burger.addEventListener('click', toggleMenu);
  menuLinks.forEach(link => link.addEventListener('click', toggleMenu));
};

export const initHeaderFixed = () => {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 0) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  };

  window.addEventListener('scroll', onScroll);
};
