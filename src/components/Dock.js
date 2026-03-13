import { useState } from "react";
import "./Dock.css";

function DockItem({
  item,
  isActive,
  onHover,
  onLeave,
  magnification,
  baseItemSize,
}) {
  const size = isActive ? magnification : baseItemSize;

  return (
    <button
      type="button"
      className={`dock-item${isActive ? " active" : ""}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={item.onClick}
      style={{ width: size, height: size }}
      aria-label={item.label}
    >
      <span className={`dock-label${isActive ? " visible" : ""}`}>{item.label}</span>
      <span className="dock-icon">{item.icon}</span>
    </button>
  );
}

export default function Dock({
  items,
  className = "",
  magnification = 70,
  panelHeight = 68,
  baseItemSize = 50,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="dock-outer" style={{ height: panelHeight + 22 }}>
      <div
        className={`dock-panel ${className}`.trim()}
        style={{ minHeight: panelHeight }}
        role="toolbar"
        aria-label="Site navigation dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={`${item.label}-${index}`}
            item={item}
            isActive={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            magnification={magnification}
            baseItemSize={baseItemSize}
          />
        ))}
      </div>
    </div>
  );
}
