import { useRef, useEffect, useState, memo, Children } from "react";
import {
  motion,
  useInView,
  animate,
} from "framer-motion";


// ---------------------------------------------------------------------------
// Animation variant definitions
// ---------------------------------------------------------------------------

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Detect whether the user prefers reduced motion via their OS / browser
 * settings. Returns `true` when animations should be suppressed.
 */
function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event) => setPrefersReduced(event.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

// ---------------------------------------------------------------------------
// AnimatedSection – generic scroll-triggered animation wrapper
// ---------------------------------------------------------------------------

/**
 * A generic section wrapper that animates on scroll into view.
 *
 * @param {Object}  props
 * @param {'fadeUp'|'fadeIn'|'slideLeft'|'slideRight'|'scaleIn'} [props.animation='fadeUp']
 *   The animation variant to use.
 * @param {number}  [props.delay=0]       – Delay in seconds before the animation starts.
 * @param {number}  [props.duration=0.6]  – Duration of the animation in seconds.
 * @param {string}  [props.className]     – Additional CSS class names.
 * @param {import('react').ReactNode} props.children – Content to render.
 * @param {boolean} [props.once=true]     – If true, animate only the first time in view.
 * @param {number}  [props.amount=0.2]    – Fraction of the element that must be visible (0‑1).
 * @param {string}  [props.as='div']      – HTML element tag to render.
 */
function AnimatedSection({
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  className,
  children,
  once = true,
  amount = 0.2,
  as = "div",
  ...rest
}) {
  const prefersReduced = usePrefersReducedMotion();

  // Resolve durations to 0 when the user prefers reduced motion
  const resolvedDuration = prefersReduced ? 0 : duration;
  const resolvedDelay = prefersReduced ? 0 : delay;

  // Build the motion component for the requested HTML tag
  const MotionComponent = motion[as] || motion.div;

  const selectedVariant = variants[animation] || variants.fadeUp;

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={selectedVariant}
      transition={{
        duration: resolvedDuration,
        delay: resolvedDelay,
        ease: "easeOut",
      }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}

const MemoizedAnimatedSection = memo(AnimatedSection);

// ---------------------------------------------------------------------------
// StaggeredGrid – staggers its children's animations
// ---------------------------------------------------------------------------

/**
 * Container that staggers the entrance animations of its children.
 *
 * Each direct child is wrapped in a `motion.div` that inherits the chosen
 * animation variant and is staggered by `staggerDelay` seconds.
 *
 * @param {Object}  props
 * @param {number}  [props.staggerDelay=0.1] – Delay between each child's animation.
 * @param {'fadeUp'|'fadeIn'|'slideLeft'|'slideRight'|'scaleIn'} [props.animation='fadeUp']
 * @param {string}  [props.className]
 * @param {import('react').ReactNode} props.children
 * @param {boolean} [props.once=true]
 * @param {number}  [props.amount=0.15]
 */
function StaggeredGrid({
  staggerDelay = 0.1,
  animation = "fadeUp",
  className,
  children,
  once = true,
  amount = 0.15,
  ...rest
}) {
  const prefersReduced = usePrefersReducedMotion();

  const resolvedStagger = prefersReduced ? 0 : staggerDelay;

  const selectedVariant = variants[animation] || variants.fadeUp;

  // Parent orchestrator variant — drives stagger timing
  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: resolvedStagger,
      },
    },
  };

  // Child variant — each child animates with the selected variant
  const childVariant = {
    hidden: selectedVariant.hidden,
    visible: {
      ...selectedVariant.visible,
      transition: {
        duration: prefersReduced ? 0 : 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariant}
      {...rest}
    >
      {Children.map(children, (child, index) => {
        if (!child) return null;
        return (
          <motion.div key={child.key ?? index} variants={childVariant}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

const MemoizedStaggeredGrid = memo(StaggeredGrid);

// ---------------------------------------------------------------------------
// AnimatedCounter – counts up to a target number when scrolled into view
// ---------------------------------------------------------------------------

/**
 * An animated number counter that counts up from 0 to `target` when visible.
 *
 * @param {Object} props
 * @param {number} props.target    – The final number to count to.
 * @param {number} [props.duration=2] – Duration of the counting animation in seconds.
 * @param {string} [props.prefix='']  – Text displayed before the number (e.g. "$").
 * @param {string} [props.suffix='']  – Text displayed after the number (e.g. "%").
 * @param {string} [props.className]
 */
function AnimatedCounter({
  target,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
  ...rest
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = usePrefersReducedMotion();

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // If the user prefers reduced motion, jump straight to the target
    if (prefersReduced) {
      setDisplayValue(target);
      return;
    }

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        // Use integers when the target is a whole number, otherwise 1 decimal
        setDisplayValue(
          Number.isInteger(target) ? Math.round(latest) : parseFloat(latest.toFixed(1))
        );
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration, prefersReduced]);

  return (
    <span ref={ref} className={className} {...rest}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

const MemoizedAnimatedCounter = memo(AnimatedCounter);

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { MemoizedStaggeredGrid as StaggeredGrid };
export { MemoizedAnimatedCounter as AnimatedCounter };
export default MemoizedAnimatedSection;
