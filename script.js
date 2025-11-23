// ---- EmailJS init ----
(function () {
  emailjs.init({
    publicKey: "51MAJKgT5mcwlDeZg",
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ---- Hero style switcher ----
  const body = document.body;
  const styleChips = document.querySelectorAll(".style-chip");

  // localStorage se last theme load karo
  const savedStyle = localStorage.getItem("hero-style");
  if (savedStyle) {
    setTheme(savedStyle);
    markActive(savedStyle);
  }

  styleChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const style = chip.getAttribute("data-style");
      setTheme(style);
      localStorage.setItem("hero-style", style);
      markActive(style);
    });
  });

  function setTheme(style) {
    body.classList.remove("theme-netflix", "theme-cyberpunk", "theme-minimal");
    body.classList.add(`theme-${style}`);
  }

  function markActive(style) {
    styleChips.forEach((chip) => {
      chip.classList.toggle(
        "active",
        chip.getAttribute("data-style") === style
      );
    });
  }

  // ---- Contact form + EmailJS ----
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (status) status.textContent = "Sending...";

      const formData = {
        from_name: document.getElementById("name").value,
        reply_to: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      emailjs
        .send("service_iabxg5n", "template_3smajth", formData)
        .then(() => {
          if (status) status.textContent = "Thanks! Your message has been sent.";
          form.reset();
        })
        .catch((err) => {
          console.error(err);
          if (status)
            status.textContent =
              "Oops, something went wrong. Please try again later.";
        });
    });
  }
});
