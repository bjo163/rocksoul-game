"use client";
export default function GameError({ reset }) {
  return (
    <main id="main" className="page-wrap content-page" role="alert">
      <p className="eyebrow">/// SIGNAL INTERRUPTED</p>
      <h1>TRANSMISSION ERROR</h1>
      <p className="page-intro">The game interface could not load. Your browser-demo progress is not deleted by this error.</p>
      <button className="btn btn-primary" onClick={() => reset()}>RETRY TRANSMISSION ↗</button>
    </main>
  );
}
