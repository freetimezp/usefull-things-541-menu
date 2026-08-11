const openBtn = document.getElementById("open-menu");
const closeBtn = document.getElementById("close-menu");
const main = document.querySelector("main");
const nav = document.querySelector("nav");

gsap.registerPlugin(CustomEase, SplitText);
CustomEase.create("tilt", "M0,0 C0.55,0 0.45,1 1,1");

const gsapMenu = (xPercent, rotation) => {
    gsap.to(main, {
        xPercent,
        rotation,
        duration: 0.77,
        ease: "tilt",
        overwrite: true,
    });
};

openBtn.addEventListener("click", () => {
    gsapMenu(-50, 12);
});

closeBtn.addEventListener("click", () => {
    gsapMenu(0, 0);
});

document.querySelectorAll(".roll-up").forEach((el) => {
    const label = el.textContent.trim();

    const out = SplitText.create(el, {
        type: "chars",
        mask: "chars",
    });

    const clone = document.createElement("span");
    clone.className = "roll-clone";
    clone.textContent = label;
    clone.setAttribute("aria-hidden", "true");
    el.appendChild(clone);

    const into = SplitText.create(clone, {
        type: "chars",
        mask: "chars",
    });
    gsap.set(into.chars, { yPercent: 100 });

    const roll = gsap
        .timeline({
            paused: true,
            defaults: {
                duration: 0.45,
                ease: "power3.inOut",
                stagger: Math.min(0.022, 0.25 / label.length),
            },
        })
        .to(out.chars, { yPercent: -100 })
        .to(into.chars, { yPercent: 0 }, 0);

    const target = el.closest("a, button") || el;
    target.addEventListener("mouseenter", () => roll.play());
    target.addEventListener("mouseleave", () => roll.reverse());
});
