// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Active navigation based on scroll position
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navLinksEl = document.querySelector(".nav-links");

if (mobileMenuToggle && navLinksEl) {
  mobileMenuToggle.addEventListener("click", () => {
    navLinksEl.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = navLinksEl.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksEl.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !navLinksEl.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      navLinksEl.classList.remove("active");
    }
  });
}

// Form submission handler
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  });
}

// Add navbar background on scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
  } else {
    navbar.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  }
});

// Marketplace Category Filtering
document.addEventListener("DOMContentLoaded", () => {
  // Get category and search from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const searchQuery = urlParams.get("search");

  if (category) {
    filterProducts(category);
    updateActiveFilter(category);
  }

  if (searchQuery) {
    searchProducts(searchQuery);
    // Update search input with query
    const searchInput = document.querySelector(".search-input");
    const navSearchInput = document.getElementById("navSearchInput");
    if (searchInput) searchInput.value = searchQuery;
    if (navSearchInput) navSearchInput.value = searchQuery;
  }

  // Filter tag click handlers
  const filterTags = document.querySelectorAll(".filter-tag");
  filterTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      const filterText = tag.textContent.toLowerCase();
      let categoryFilter = "all";

      if (filterText.includes("grains")) categoryFilter = "grains";
      else if (filterText.includes("vegetables")) categoryFilter = "vegetables";
      else if (filterText.includes("fruits")) categoryFilter = "fruits";
      else if (filterText.includes("legumes")) categoryFilter = "legumes";
      else if (filterText.includes("herbs")) categoryFilter = "herbs";

      filterProducts(categoryFilter);

      // Update active state
      filterTags.forEach((t) => t.classList.remove("active"));
      tag.classList.add("active");
    });
  });
});

function filterProducts(category) {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    if (category === "all" || category === null) {
      card.style.display = "block";
    } else {
      const cardCategory = card.getAttribute("data-category");
      if (cardCategory === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  });

  // Update page title
  const sectionTitle = document.querySelector(
    ".marketplace-products .section-title"
  );
  if (sectionTitle && category && category !== "all") {
    const categoryNames = {
      grains: "Grains & Cereals",
      vegetables: "Fresh Vegetables",
      fruits: "Fresh Fruits",
      legumes: "Legumes",
      roots: "Root Crops",
      herbs: "Herbs & Spices",
    };
    sectionTitle.textContent =
      categoryNames[category] || "Fresh Crops Available Now";
  }
}

function updateActiveFilter(category) {
  const filterTags = document.querySelectorAll(".filter-tag");
  filterTags.forEach((tag) => {
    tag.classList.remove("active");
    const filterText = tag.textContent.toLowerCase();

    if (
      (category === "grains" && filterText.includes("grains")) ||
      (category === "vegetables" && filterText.includes("vegetables")) ||
      (category === "fruits" && filterText.includes("fruits")) ||
      (category === "legumes" && filterText.includes("legumes")) ||
      (category === "herbs" && filterText.includes("herbs"))
    ) {
      tag.classList.add("active");
    }
  });
}

// Search functionality
function performSearch(searchTerm) {
  if (searchTerm.trim()) {
    // Redirect to marketplace with search query
    window.location.href = `marketplace.html?search=${encodeURIComponent(
      searchTerm.trim()
    )}`;
  }
}

// Navbar search
const navSearchBtn = document.getElementById("navSearchBtn");
const navSearchInput = document.getElementById("navSearchInput");

if (navSearchBtn && navSearchInput) {
  navSearchBtn.addEventListener("click", () => {
    performSearch(navSearchInput.value);
  });

  navSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch(navSearchInput.value);
    }
  });
}

// Hero search
const heroSearchBtn = document.getElementById("heroSearchBtn");
const heroSearchInput = document.getElementById("heroSearchInput");

if (heroSearchBtn && heroSearchInput) {
  heroSearchBtn.addEventListener("click", () => {
    performSearch(heroSearchInput.value);
  });

  heroSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch(heroSearchInput.value);
    }
  });
}

// Marketplace search functionality
const marketplaceSearchBtn = document.querySelector(
  ".marketplace-search .btn-primary"
);
const marketplaceSearchInput = document.querySelector(".search-input");

if (marketplaceSearchBtn && marketplaceSearchInput) {
  marketplaceSearchBtn.addEventListener("click", () => {
    searchProducts(marketplaceSearchInput.value);
  });

  marketplaceSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchProducts(marketplaceSearchInput.value);
    }
  });
}

function searchProducts(searchTerm) {
  const productCards = document.querySelectorAll(".product-card");
  const term = searchTerm.toLowerCase().trim();

  if (!term) {
    // Show all products if search is empty
    productCards.forEach((card) => {
      card.style.display = "block";
    });
    return;
  }

  productCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const description = card
      .querySelector(".product-description")
      .textContent.toLowerCase();
    const category = card.getAttribute("data-category");

    if (
      title.includes(term) ||
      description.includes(term) ||
      category.includes(term)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // Update title
  const sectionTitle = document.querySelector(
    ".marketplace-products .section-title"
  );
  if (sectionTitle) {
    sectionTitle.textContent = `Search Results for "${searchTerm}"`;
  }
}

// Image Slider
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  // Ensure index is within bounds
  if (index >= slides.length) currentSlideIndex = 0;
  if (index < 0) currentSlideIndex = slides.length - 1;

  // Remove active class from all slides and dots
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Add active class to current slide and dot
  if (slides[currentSlideIndex]) {
    slides[currentSlideIndex].classList.add("active");
  }
  if (dots[currentSlideIndex]) {
    dots[currentSlideIndex].classList.add("active");
  }
}

function changeSlide(direction) {
  currentSlideIndex += direction;
  if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
  if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
  showSlide(currentSlideIndex);
}

function currentSlide(index) {
  currentSlideIndex = index;
  showSlide(currentSlideIndex);
}

// Auto-advance slider every 5 seconds
if (slides.length > 0) {
  setInterval(() => {
    changeSlide(1);
  }, 5000);
}

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all animate-on-scroll elements
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Animated Counter for Stats
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent =
        target.toLocaleString() + (target === 100 ? "%" : "+");
    }
  };

  updateCounter();
}

// Trigger counter animation on scroll
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          if (!stat.classList.contains("animated")) {
            stat.classList.add("animated");
            animateCounter(stat);
          }
        });
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Enhanced navbar scroll effect
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Parallax effect for hero image
window.addEventListener("scroll", () => {
  const heroImage = document.querySelector(".hero-image");
  if (heroImage) {
    const scrolled = window.pageYOffset;
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ============================================
// AUTHENTICATION SYSTEM
// ============================================

// Auth Modal Elements
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const loginBtn = document.getElementById("loginBtn");
const loginClose = document.getElementById("loginClose");
const registerClose = document.getElementById("registerClose");
const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const userMenu = document.getElementById("userMenu");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

// Show/Hide Modals
function showModal(modal) {
  modal.classList.add("active");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hideModal(modal) {
  modal.classList.remove("active");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Event Listeners for Modals
if (loginBtn) {
  loginBtn.addEventListener("click", () => showModal(loginModal));
}

// About Us section login button
const aboutLoginBtn = document.getElementById("aboutLoginBtn");
if (aboutLoginBtn) {
  aboutLoginBtn.addEventListener("click", () => showModal(loginModal));
}

if (loginClose) {
  loginClose.addEventListener("click", () => hideModal(loginModal));
}

if (registerClose) {
  registerClose.addEventListener("click", () => hideModal(registerModal));
}

if (switchToRegister) {
  switchToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    hideModal(loginModal);
    showModal(registerModal);
  });
}

if (switchToLogin) {
  switchToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    hideModal(registerModal);
    showModal(loginModal);
  });
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    hideModal(loginModal);
  }
  if (e.target === registerModal) {
    hideModal(registerModal);
  }
});

// Show Alert Message
function showAlert(message, type = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;

  const form =
    type === "success" ? loginForm || registerForm : registerForm || loginForm;
  if (form) {
    form.insertBefore(alertDiv, form.firstChild);
    setTimeout(() => alertDiv.remove(), 4000);
  }
}

// Register Form Submission
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById(
      "registerConfirmPassword"
    ).value;
    const agreeTerms = document.getElementById("agreeTerms").checked;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      showAlert("Please fill in all fields", "error");
      return;
    }

    if (password.length < 6) {
      showAlert("Password must be at least 6 characters", "error");
      return;
    }

    if (password !== confirmPassword) {
      showAlert("Passwords do not match", "error");
      return;
    }

    if (!agreeTerms) {
      showAlert("Please agree to the Terms & Conditions", "error");
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("agriConnectUsers")) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      showAlert("An account with this email already exists", "error");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password, // In production, this should be hashed
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("agriConnectUsers", JSON.stringify(users));

    showAlert("Account created successfully! Please login.", "success");

    // Clear form
    registerForm.reset();

    // Switch to login modal after 2 seconds
    setTimeout(() => {
      hideModal(registerModal);
      showModal(loginModal);
    }, 2000);
  });
}

// Login Form Submission
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    // Validation
    if (!email || !password) {
      showAlert("Please fill in all fields", "error");
      return;
    }

    // Check credentials
    const users = JSON.parse(localStorage.getItem("agriConnectUsers")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      showAlert("Invalid email or password", "error");
      return;
    }

    // Store current user session
    const session = {
      userId: user.id,
      name: user.name,
      email: user.email,
      loginTime: new Date().toISOString(),
    };

    if (rememberMe) {
      localStorage.setItem("agriConnectSession", JSON.stringify(session));
    } else {
      sessionStorage.setItem("agriConnectSession", JSON.stringify(session));
    }

    showAlert(`Welcome back, ${user.name}!`, "success");

    // Update UI
    setTimeout(() => {
      hideModal(loginModal);
      updateAuthUI();
      loginForm.reset();
    }, 1500);
  });
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("agriConnectSession");
    sessionStorage.removeItem("agriConnectSession");
    updateAuthUI();
    alert("You have been logged out successfully!");
  });
}

// Update Auth UI based on login state
function updateAuthUI() {
  const session =
    JSON.parse(localStorage.getItem("agriConnectSession")) ||
    JSON.parse(sessionStorage.getItem("agriConnectSession"));

  if (session && session.name) {
    // User is logged in
    if (loginBtn) loginBtn.style.display = "none";
    if (userMenu) {
      userMenu.style.display = "flex";
      userName.textContent = `Hi, ${session.name.split(" ")[0]}`;
    }
  } else {
    // User is logged out
    if (loginBtn) loginBtn.style.display = "block";
    if (userMenu) userMenu.style.display = "none";
  }
}

// Check auth state on page load
document.addEventListener("DOMContentLoaded", () => {
  updateAuthUI();
});
