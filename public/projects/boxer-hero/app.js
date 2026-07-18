// egyszerű hamburger – ha később kell
const burger = document.querySelector('.hamburger');
const links = document.querySelector('.nav-links');

if (burger && links){
  burger.addEventListener('click', () => {
    links.classList.toggle('open');
    burger.setAttribute('aria-expanded', links.classList.contains('open'));
  });
}
