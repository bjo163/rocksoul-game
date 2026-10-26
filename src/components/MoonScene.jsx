export default function MoonScene({ label = "Moon over the signal", variant = "" }) {
  return (
    <div className={"moon-scene " + variant} role="img" aria-label={label}>
      <span className="moon-halo" aria-hidden="true" />
      <span className="moon-disc" aria-hidden="true" />
      <span className="orbit orbit-a" aria-hidden="true" />
      <span className="orbit orbit-b" aria-hidden="true" />
      <span className="signal-axis" aria-hidden="true" />
      <span className="signal-streak streak-1" aria-hidden="true" />
      <span className="signal-streak streak-2" aria-hidden="true" />
      <span className="signal-streak streak-3" aria-hidden="true" />
      <span className="antenna" aria-hidden="true" />
      <span className="hill hill-a" aria-hidden="true" />
      <span className="hill hill-b" aria-hidden="true" />
      <span className="scene-coordinate" aria-hidden="true">00° / SIGNAL UNKNOWN</span>
    </div>
  );
}
