(() => {
  const siteConfig = {
    welcome: {
      eyebrow: "A little more human, a little less complicated",
      title: "Welcome to DevNova.",
      message: "Good products begin with a conversation. We bring thoughtful design and dependable engineering to your next big idea.",
      image: "assets/devnova-welcome.svg",
      imageAlt: "Abstract illustration of ideas connected through design and engineering",
      actionLabel: "Let’s explore your idea",
      actionHref: "#contact",
      closeLabel: "Close welcome dialog",
      footnote: "No pressure. Just a good place to start.",
    },
    contactEmail: "mohitpal85@gmail.com",
  };

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-nav");
  const welcomeDialog = document.querySelector("#welcome-dialog");
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");

  function closeMenu() {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector(".sr-only").textContent = "Open navigation menu";
    navigation.classList.remove("is-open");
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      menuToggle.querySelector(".sr-only").textContent = isExpanded
        ? "Open navigation menu"
        : "Close navigation menu";
      navigation.classList.toggle("is-open", !isExpanded);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        navigation.classList.contains("is-open") &&
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("is-open")) {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  if (welcomeDialog instanceof HTMLDialogElement) {
    const welcomeImage = welcomeDialog.querySelector(".dialog-art img");
    const welcomeEyebrow = welcomeDialog.querySelector(".eyebrow");
    const welcomeTitle = welcomeDialog.querySelector("#welcome-title");
    const welcomeMessage = welcomeDialog.querySelector("#welcome-description");
    const welcomeAction = welcomeDialog.querySelector(".dialog-cta");
    const welcomeActionLabel = welcomeAction.querySelector("[data-action-label]");
    const welcomeFootnote = welcomeDialog.querySelector(".dialog-footnote");
    const closeButton = welcomeDialog.querySelector(".dialog-close");

    welcomeEyebrow.textContent = siteConfig.welcome.eyebrow;
    welcomeTitle.textContent = siteConfig.welcome.title;
    welcomeMessage.textContent = siteConfig.welcome.message;
    welcomeImage.src = siteConfig.welcome.image;
    welcomeImage.alt = siteConfig.welcome.imageAlt;
    welcomeAction.href = siteConfig.welcome.actionHref;
    welcomeActionLabel.textContent = siteConfig.welcome.actionLabel;
    welcomeFootnote.textContent = siteConfig.welcome.footnote;
    closeButton.setAttribute("aria-label", siteConfig.welcome.closeLabel);

    welcomeDialog.addEventListener("close", () => {
      document.body.classList.remove("dialog-open");
    });

    welcomeDialog.addEventListener("click", (event) => {
      const bounds = welcomeDialog.getBoundingClientRect();
      const clickedOutside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;
      if (clickedOutside) welcomeDialog.close();
    });

    closeButton.addEventListener("click", () => welcomeDialog.close());

    welcomeAction.addEventListener("click", () => welcomeDialog.close());

    let hasShownWelcome = false;
    try {
      hasShownWelcome = sessionStorage.getItem("devnova-welcome-shown") === "true";
      if (!hasShownWelcome) sessionStorage.setItem("devnova-welcome-shown", "true");
    } catch {
      hasShownWelcome = false;
    }

    if (!hasShownWelcome) {
      window.setTimeout(() => {
        welcomeDialog.showModal();
        document.body.classList.add("dialog-open");
        closeButton.focus();
      }, 250);
    }
  }

  if (contactForm instanceof HTMLFormElement && formStatus instanceof HTMLElement) {
    const nameField = contactForm.elements.namedItem("name");
    const emailField = contactForm.elements.namedItem("email");
    const messageField = contactForm.elements.namedItem("message");

    [nameField, messageField].forEach((field) => {
      field.addEventListener("input", () => field.setCustomValidity(""));
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      formStatus.textContent = "";

      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const message = messageField.value.trim();
      nameField.setCustomValidity(name.length < 2 ? "Please enter a name with at least 2 characters." : "");
      messageField.setCustomValidity(
        message.length < 10 ? "Please share at least 10 characters so we have some context." : "",
      );

      if (!contactForm.reportValidity()) return;

      const subject = `A project conversation with DevNova — ${name}`;
      const body = [
        `Name: ${name}`,
        `Reply-to: ${email}`,
        "",
        message,
      ].join("\n");
      const mailto = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
      formStatus.textContent =
        "Your email app should open with a draft. Review it and press Send there. If it does not open, email us directly at " +
        siteConfig.contactEmail +
        ".";
    });
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();