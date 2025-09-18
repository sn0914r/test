const offcanvasTarget = document.querySelector(
  ".off-canvas-menu-for-sm-devices"
);

const closeNavbar = () => {
  const e = document.getElementById("mobileMenu");
  e.classList.remove("show");
  console.log(e.classList);
};

const offcanvasHTML = `
  <div
    class="sidebar offcanvas offcanvas-end"
    tabindex="-1"
    id="mobileMenu"
    aria-labelledby="mobileMenuLabel"
  >
    <div class="offcanvas-header">
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <i class="bi bi-x-lg" style="color: #ffffff; font-size: 1rem"></i>
      </button>
    </div>
    <div class="offcanvas-body">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link" href="#hero">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#how-it-works">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#our-services">Services</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#contact-us">Contact</a>
        </li>
      </ul>

      <div class="cta-btn">
        <a class="btn" href="https://wa.me/919573340113" target="_blank">Book Now</a>
      </div>
    </div>
  </div>
`;

function initializeOffcanvasMenu() {
  offcanvasTarget.outerHTML = offcanvasHTML;

  // Attach closeNavbar to all nav items + Book Now
  const navItems = document.querySelectorAll("#mobileMenu .nav-item a, #mobileMenu .cta-btn a");
  navItems.forEach(item => {
    item.addEventListener("click", closeNavbar);
  });
}

initializeOffcanvasMenu();
