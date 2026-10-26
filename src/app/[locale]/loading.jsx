export default function Loading() {
  return (
    <main id="main" className="page-wrap content-page" aria-busy="true">
      <p className="eyebrow">/// RECEIVING TRANSMISSION</p>
      <h1>RECONNECTING SIGNAL…</h1>
      <p className="page-intro">Loading the ROCKSOUL story interface.</p>
      <div className="loading-skeleton" aria-hidden="true"><span/><span/><span/></div>
    </main>
  );
}
