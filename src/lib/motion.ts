import gsap from "gsap";

export const motionConfig = {
  duration: {
    reveal: 1,
    hover: 0.3,
    fast: 0.2,
  },
  ease: {
    reveal: "power3.out",
    transition: "power2.inOut",
    hover: "power1.out",
  },
  stagger: {
    default: 0.1,
    fast: 0.05,
    slow: 0.15,
  },
};

// Ensure a safe way to match media for responsive animations
export const createMedia = () => {
  if (typeof window !== "undefined") {
    return gsap.matchMedia();
  }
  return null;
};
