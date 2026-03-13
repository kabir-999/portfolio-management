import { useEffect, useMemo, useState } from "react";
import "./Carousel.css";

export default function Carousel({
  images = [],
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const total = safeImages.length;

  useEffect(() => {
    if (!autoplay || total <= 1 || (pauseOnHover && isPaused)) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current === total - 1) {
          return loop ? 0 : current;
        }
        return current + 1;
      });
    }, autoplayDelay);

    return () => window.clearInterval(intervalId);
  }, [autoplay, autoplayDelay, isPaused, loop, pauseOnHover, total]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goPrevious = () => {
    setActiveIndex((current) => {
      if (current === 0) {
        return loop ? total - 1 : current;
      }
      return current - 1;
    });
  };

  const goNext = () => {
    setActiveIndex((current) => {
      if (current === total - 1) {
        return loop ? 0 : current;
      }
      return current + 1;
    });
  };

  if (!total) return null;

  const isPrevDisabled = !loop && activeIndex === 0;
  const isNextDisabled = !loop && activeIndex === total - 1;

  return (
    <div
      className={`rb-carousel${round ? " round" : ""}`}
      style={{ "--carousel-base-width": `${baseWidth}px` }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="rb-carousel-viewport">
        <button
          type="button"
          className="rb-carousel-arrow prev"
          onClick={goPrevious}
          disabled={isPrevDisabled}
          aria-label="Previous image"
        >
          &#8249;
        </button>

        <div className="rb-carousel-stage">
          {safeImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className={`rb-carousel-slide${index === activeIndex ? " active" : ""}`}
              aria-hidden={index !== activeIndex}
            >
              <img src={image.src} alt={image.alt || `Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="rb-carousel-arrow next"
          onClick={goNext}
          disabled={isNextDisabled}
          aria-label="Next image"
        >
          &#8250;
        </button>
      </div>

      <div className="rb-carousel-dots">
        {safeImages.map((image, index) => (
          <button
            key={`${image.alt || "dot"}-${index}`}
            type="button"
            className={`rb-carousel-dot${index === activeIndex ? " active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
