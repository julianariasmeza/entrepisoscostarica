// ================= ENTREPISOS COSTA RICA - MAIN JS =================
console.log("Entrepisos Costa Rica - sitio cargado correctamente");

// ======================================================
// MENÚ MÓVIL FULLSCREEN
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-list a");
  const body = document.body;

  if (!menuToggle || !navList) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("active");
    menuToggle.classList.toggle("active", isOpen);
    body.classList.toggle("menu-open", isOpen);

    const spans = menuToggle.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
    } else {
      spans.forEach(span => {
        span.style.transform = "none";
        span.style.opacity = "1";
      });
    }
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
      menuToggle.classList.remove("active");
      body.classList.remove("menu-open");

      const spans = menuToggle.querySelectorAll("span");
      spans.forEach(span => {
        span.style.transform = "none";
        span.style.opacity = "1";
      });
    });
  });
});

// ======================================================
// HEADER - EFECTO SCROLL
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
    if (target) {
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
    }
  });
});

// ======================================================
// ANIMACIONES DE ENTRADA (SERVICIOS / VENTAJAS)
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
// ANIMACIÓN DE ENTRADA HERO
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-content");
  if (hero) {
    hero.style.opacity = "0";
    hero.style.transform = "translateY(20px)";
    hero.style.transition = "all 0.8s ease";

    setTimeout(() => {
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    }, 100);
  }
});

// ======================================================
// DETECCIÓN DE PÁGINA ACTIVA EN EL MENÚ
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-list a").forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === currentPage
    );
  });
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
  if (window.performance && window.performance.timing) {
    const time =
      window.performance.timing.domContentLoadedEventEnd -
      window.performance.timing.navigationStart;
    console.log(`Tiempo de carga: ${time} ms`);
  }
});

