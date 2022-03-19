import View from "./View.js";

class mainView extends View {
  parentElement = document.querySelector(".section-app");

  generateMarkup() {
    return `
    <div class="invisible-border" id="app-box"></div>
    <div class="container app-heading-container"  >
    <span class="subheading">Applications</span>
    <h2 class="heading-secondary">
      Simple applications for you to try out
    </h2>
  </div>
  <div class="container grid--app app-container">
    <div class="app-box memory-app-box">
      <h3 class="heading-tertiary heading-memory">Memory</h3>
      <button class="btn btn-app memory-btn">
        <span class="material-icons material-icons--app memory-icon notranslate"
          >window</span
        >
      </button>
      <p class="memory-text">
        Challenge your friend to a memory standoff. Two players engage
        each other in a memory competition. When all the fields are open,
        the player with the most pairs, wins the game.
      </p>
    </div>
    <div class="app-box navi-app-box">
      <h3 class="heading-tertiary heading-navi">Navi</h3>
      <button class="btn btn-app navi-btn">
        <span class="material-icons material-icons--app navi-icon notranslate">
          place
        </span>
      </button>
      <p class="navi-text">
        An application that helps you track your activities using a map.
        You can click on any point on the map, which opens up a tab, where
        you can then save your activity data.
      </p>
    </div>
  </div>`;
  }

  addHandlerMobileNav() {
    const headerEl = document.querySelector(".header");
    const btnNav = document.querySelector(".btn-mobile-nav");
    btnNav.addEventListener("click", function (e) {
      headerEl.classList.toggle("nav-open");
    });
  }

  topOnRefresh() {
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    } else {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
    }
  }

  addHandlerSmoothScroll() {
    const allLinks = document.querySelectorAll(".scroll-link");

    allLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const headerEl = document.querySelector(".header");
        const href = link.getAttribute("href");

        //SCROLL TO TOP

        if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });

        ///SCROLL TO SECTIONS
        if (href !== "#" && href.startsWith("#")) {
          const sectionEl = document.querySelector(href);
          sectionEl.scrollIntoView({ behavior: "smooth" });
        }

        //CLOSE MOBILE NAV

        if (link.classList.contains("header-nav-link"))
          headerEl.classList.toggle("nav-open");
      });
    });
  }

  addAccordionHandler() {
    const btnAccordion = document.querySelectorAll(".faq-item");

    btnAccordion.forEach(function (el) {
      el.addEventListener("click", function (e) {
        const openAcc = e.target.closest(".faq-item");
        openAcc.classList.toggle("open");
      });
    });
  }

  renderStickyNav() {
    const heroSectionEl = document.querySelector(".section-hero");
    const observer = new IntersectionObserver(
      function (entries) {
        const ent = entries[0];

        if (!ent.isIntersecting) document.body.classList.add("sticky");

        if (ent.isIntersecting) document.body.classList.remove("sticky");
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px",
      }
    );
    observer.observe(heroSectionEl);
  }

  renderCopyrightDate() {
    const yearEl = document.querySelector(".year");
    const currentYear = new Date().getFullYear();
    yearEl.textContent = currentYear;
  }

  addHandlerRenderNavi(handler) {
    const btnNavi = document.querySelector(".navi-btn");

    const scrolltoAppTop = function () {
      const sectionEl = document.getElementById("app-box");
      sectionEl.scrollIntoView({ behavior: "smooth" });
      handler();
    };

    btnNavi.addEventListener("click", scrolltoAppTop);
  }

  addHandlerRenderMemory(handler) {
    const btnMemory = document.querySelector(".memory-btn");

    const scrolltoAppTop = function () {
      const sectionEl = document.getElementById("app-box");
      sectionEl.scrollIntoView({ behavior: "smooth" });
      handler();
    };

    btnMemory.addEventListener("click", scrolltoAppTop);
  }
}

export default new mainView();
