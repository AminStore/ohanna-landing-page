interface WaveDividerProps {
  from: string;
  to: string;
  variant?: 1 | 2 | 3 | 4 | 5;
  flip?: boolean;
  height?: number;
}

const PATHS: Record<number, string> = {
  1: "M0,40 C480,80 960,0 1440,40 L1440,80 L0,80Z",
  2: "M0,20 C240,80 720,10 1200,65 C1340,80 1400,60 1440,50 L1440,80 L0,80Z",
  3: "M0,60 C360,10 700,80 1080,25 C1260,5 1390,55 1440,40 L1440,80 L0,80Z",
  4: "M0,0 C300,80 700,10 1080,70 C1260,90 1390,45 1440,20 L1440,80 L0,80Z",
  5: "M0,50 C240,15 480,75 720,35 C960,5 1200,70 1440,45 L1440,80 L0,80Z",
};

export default function WaveDivider({
  from,
  to,
  variant = 1,
  flip = false,
  height = 80,
}: WaveDividerProps) {
  return (
    <div
      style={{ background: from, marginBottom: -1, lineHeight: 0 }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height, transform: flip ? "scaleX(-1)" : undefined }}
      >
        <path fill={to} d={PATHS[variant]} />
      </svg>
    </div>
  );
}
