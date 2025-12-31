// ================= ENTREPISOS COSTA RICA - MAIN JS =================
console.log("Entrepisos Costa Rica - sitio cargado correctamente");

// ======================================================
// MENÚ MÓVIL FULLSCREEN (ESTILO APP)
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = document.querySelector(".close-menu");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-list a");
  const body = document.body;

  if (!menuToggle || !navList) return;

  const spans = menuToggle.querySelectorAll("span");

  const openMenu = () => {
    navList.classList.add("active");
    menuToggle.classList.add("active");
    body.classList.add("menu-open");

    if (spans.length === 3) {
      spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
    }
  };

  const closeMenuFn = () => {
    navList.classList.remove("active");
    menuToggle.classList.remove("active");
    body.classList.remove("menu-open");

    spans.forEach(span => {
      span.style.transform = "none";
      span.style.opacity = "1";
    });
  };

  menuToggle.addEventListener("click", () => {
    navList.classList.contains("active") ? closeMenuFn() : openMenu();
  });

  if (closeMenu) {
    closeMenu.addEventListener("click", closeMenuFn);
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenuFn();
    });
  });
});

// ======================================================
// HEADER - EFECTO DE SOMBRA AL SCROLL
// ======================================================
const header = document.querySelector(".header");

if (header) {
  window.addEventListener("scroll", () => {
    header.style.boxShadow =
      window.scrollY > 50
        ? "0 4px 20px rgba(0,0,0,0.5)"
        : "0 2px 10px rgba(0,0,0,0.3)";
  });
}

// ======================================================
// SMOOTH SCROLL CON OFFSET DEL HEADER
// ======================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    e.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;
    const position =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight;

    window.scrollTo({
      top: position,
      behavior: "smooth"
    });
  });
});

// ======================================================
// ANIMACIONES DE ENTRADA (SECCIONES)
// ======================================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".service-card, .advantage-item")
    .forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
});

// ======================================================
// ANIMACIÓN HERO
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-content");
  if (!hero) return;

  hero.style.opacity = "0";
  hero.style.transform = "translateY(20px)";
  hero.style.transition = "all 0.8s ease";

  setTimeout(() => {
    hero.style.opacity = "1";
    hero.style.transform = "translateY(0)";
  }, 100);
});

// ======================================================
// SECCIÓN ACTIVA EN MENÚ (SCROLL)
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-list a");

  const activateLink = () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  };

  window.addEventListener("scroll", activateLink);
});

// ======================================================
// LAZY LOADING DE IMÁGENES
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]");
  if (!("IntersectionObserver" in window)) return;

  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imgObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imgObserver.observe(img));
});

// ======================================================
// LOG DE TIEMPO DE CARGA (DEBUG)
// ======================================================
window.addEventListener("load", () => {
  if (window.performance?.timing) {
    const time =
      window.performance.timing.domContentLoadedEventEnd -
      window.performance.timing.navigationStart;
    console.log(`Tiempo de carga: ${time} ms`);
  }
});

