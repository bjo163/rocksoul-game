/** Local-only illustrative state — NEVER an authoritative online economy or save. */
export const DEMO_KEY = "rocksoul-signal-station-local-demo-v1";
export const INITIAL_DEMO = Object.freeze({ charge: 0, repaired: false, inspected: false, decision: null });
export const DECISIONS = Object.freeze(["unknown", "verify"]);
export function normalizeDemo(value) {
  if (!value || typeof value !== "object") return { ...INITIAL_DEMO };
  const charge = Number.isInteger(value.charge) ? Math.min(12, Math.max(0, value.charge)) : 0;
  return {
    charge,
    repaired: value.repaired === true,
    inspected: value.inspected === true,
    decision: DECISIONS.includes(value.decision) ? value.decision : null
  };
}
export function reducer(state, action) {
  const s = normalizeDemo(state);
  switch (action) {
    case "charge": return { ...s, charge: Math.min(12, s.charge + 1) };
    case "repair": return s.charge >= 3 ? { ...s, charge: s.charge - 3, repaired: true } : s;
    case "inspect": return s.repaired ? { ...s, inspected: true } : s;
    case "unknown": case "verify": return s.inspected ? { ...s, decision: action } : s;
    case "reset": return { ...INITIAL_DEMO };
    default: return s;
  }
}
