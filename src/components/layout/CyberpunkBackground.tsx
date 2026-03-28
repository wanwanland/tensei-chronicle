export function CyberpunkBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Animated grid */}
      <div className="animated-grid absolute inset-0" />

      {/* Radial gradient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,243,255,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Bottom magenta glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,0,255,0.04) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}
