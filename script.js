const progress = document.getElementById("progress");
    const nav = document.getElementById("nav");
    const menu = document.getElementById("menu");

    window.addEventListener("scroll", () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progressWidth = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      progress.style.width = `${progressWidth}%`;
    });

    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      menu.setAttribute("aria-expanded", String(open));
    });

    document.querySelectorAll(".drawer a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        document.body.classList.remove("nav-open");
        menu.setAttribute("aria-expanded", "false");
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".fade").forEach((el) => observer.observe(el));

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const prefix = el.dataset.prefix || "";
        if (!target) return;

        let current = 0;
        const step = Math.max(1, Math.ceil(target / 34));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = `${prefix}${target}`;
            clearInterval(timer);
            return;
          }
          el.textContent = `${prefix}${current}`;
        }, 32);

        countObserver.unobserve(el);
      });
    }, { threshold: 0.65 });

    document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

    document.querySelectorAll(".faq-block details").forEach((detail) => {
      detail.addEventListener("toggle", () => {
        if (!detail.open) return;
        const block = detail.closest(".faq-block");
        block.querySelectorAll("details").forEach((other) => {
          if (other !== detail) other.open = false;
        });
      });
    });
