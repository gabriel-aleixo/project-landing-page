/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section');

const sectionsList = buildSectionsList();

const navigation = document.querySelector('#navbar__list');

const mainHero = document.querySelector('.main__hero');

let intersectionOptions = {
    rootMargin: '10px 0px 150px 0px',
    threshold: 0.75
  };


const totopButton = document.querySelector('.totop__button');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildSectionsList() {

    const secList = [];

    for (let section of sections) {
        let item = new Object();
        item.data = section.dataset.nav;
        item.id = section.id;
        secList.push(item);

    };
    return secList;

};

function buildNav() {

    for (const sectionItem of sectionsList) {
        let item = document.createElement('li');
        let link = document.createElement('a');

        item.innerText = sectionItem.data;
        item.setAttribute('class', 'menu__link');
        item.setAttribute('data-section', sectionItem.id)

        link.setAttribute('href', `#${sectionItem.id}`);
        link.appendChild(item);

        navigation.appendChild(link);

    };

};

// Add class 'active' to section when near top of viewport

let sectionCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.className = 'is__active';

        let navItem = document.querySelector(`li[data-section=${entry.target.id}`);
        navItem.classList.add('is__active');

      } else if (!entry.isIntersecting) {
        entry.target.className = '';

        let navItem = document.querySelector(`li[data-section=${entry.target.id}`);
        navItem.classList.remove('is__active');

      }
    });
  };
  
let sectionObserver = new IntersectionObserver(sectionCallback, intersectionOptions);

for (let section of sections) {
    sectionObserver.observe(section);
};

// Scroll to anchor ID using scrollTO event

let scrollToSection = (e) => {
    e.preventDefault();
    let targetSection = document.getElementById(e.target.dataset.section);

    targetSection.scrollIntoView({ behavior: 'smooth' });
  };

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNav);

// Scroll to section on link click

navigation.addEventListener('click', scrollToSection);

// Set sections as active

// Add a scroll to top button on the page that’s only visible when the user scrolls below the fold of the page.
let heroCallback = (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        totopButton.classList.add('fade__in');
        totopButton.classList.remove('fade__out');

      } else if (entry.isIntersecting) {
        totopButton.classList.add('fade__out');
        totopButton.classList.remove('fade__in');

      }
    });
  };

let heroObserver = new IntersectionObserver(heroCallback, intersectionOptions);

heroObserver.observe(mainHero);

totopButton.addEventListener('click', () => window.scrollTo({top: 100, left: 100, behavior: 'smooth'}));


