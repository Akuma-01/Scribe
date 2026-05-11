"use client";

import {
  IconRefresh,
  IconTarget,
  IconClock,
  IconBolt,
  IconActivity,
} from "@tabler/icons-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type {
  HistorySnapshot,
  CharacterStats,
  TestMode,
} from "@/hooks/useTypingTest";
import type { ReactNode } from "react";

interface StatsScreenProps {
  stats: {
    wpm: number;
    rawWpm: number;
    accuracy: number;
    characters: CharacterStats;
    totalTyped: number;
  };
  history: HistorySnapshot[];
  mode: TestMode;
  targetValue: number;
  timeElapsed: number;
  onRestart: () => void;
}

export function StatsScreen({
  stats,
  history,
  mode,
  targetValue,
  timeElapsed,
  onRestart,
}: StatsScreenProps) {
  let consistency = 0;
  if (history.length > 0) {
    const mean = stats.wpm;
    const squareDiffs = history.map((h) => Math.pow(h.wpm - mean, 2));
    const variance =
      squareDiffs.reduce((a, b) => a + b, 0) / history.length;
    const stdDev = Math.sqrt(variance);
    consistency = Math.max(
      0,
      Math.round(100 - (stdDev / (mean || 1)) * 100)
    );
  }

  const { correct, incorrect, extra, missed } = stats.characters;

  return (
    <div className="w-full max-w-5xl flex flex-col items-center justify-center p-4 space-y-6 animate-in fade-in zoom-in duration-700">
      {/* Main Stats Row */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 h-auto lg:h-[320px]">
        {/* Metrics Column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="flex-1 bg-[var(--theme-secondary-bg)]/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 flex flex-col justify-center items-start group hover:bg-[var(--theme-secondary-bg)]/60 transition-all duration-300">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--theme-muted)] font-bold mb-1 group-hover:text-[var(--theme-accent)] transition-colors">
              Speed
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-[var(--theme-accent)] drop-shadow-[0_0_10px_rgba(var(--theme-accent-rgb),0.3)] leading-none">
                {stats.wpm}
              </span>
              <span className="text-lg font-bold text-[var(--theme-muted)]">
                wpm
              </span>
            </div>
          </div>

          <div className="flex-1 bg-[var(--theme-secondary-bg)]/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 flex flex-col justify-center items-start group hover:bg-[var(--theme-secondary-bg)]/60 transition-all duration-300">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--theme-muted)] font-bold mb-1 group-hover:text-[var(--theme-accent)] transition-colors">
              Accuracy
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-[var(--theme-accent)] drop-shadow-[0_0_10px_rgba(var(--theme-accent-rgb),0.3)] leading-none">
                {stats.accuracy}
              </span>
              <span className="text-lg font-bold text-[var(--theme-muted)]">
                %
              </span>
            </div>
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-9 bg-[var(--theme-secondary-bg)]/40 backdrop-blur-md border border-white/5 rounded-[24px] p-6 pb-2 relative overflow-hidden group hover:bg-[var(--theme-secondary-bg)]/60 transition-all duration-300">
          <div className="absolute top-4 left-6 flex items-center gap-2 text-[var(--theme-muted)] font-medium text-[9px] tracking-widest uppercase opacity-60">
            <IconActivity size={12} />
            Performance Over Time
          </div>

          <div
            className="w-full h-full pt-6 min-h-[250px]"
            style={{ cursor: "crosshair" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={history}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorWpm"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--theme-accent)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--theme-accent)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorRaw"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--theme-muted)"
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--theme-muted)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="text-white/5"
                  vertical={false}
                />

                <XAxis
                  dataKey="time"
                  stroke="var(--theme-muted)"
                  tick={{ fill: "var(--theme-muted)", fontSize: 9 }}
                  tickMargin={8}
                  axisLine={false}
                  tickLine={false}
                  opacity={0.4}
                />

                <YAxis
                  stroke="var(--theme-muted)"
                  tick={{ fill: "var(--theme-muted)", fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, "auto"]}
                  width={35}
                  opacity={0.4}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.85)",
                    backdropFilter: "blur(8px)",
                    borderColor: "rgba(255,255,255,0.05)",
                    borderRadius: "10px",
                    color: "var(--theme-text)",
                    fontSize: "11px",
                    fontWeight: "600",
                    padding: "8px",
                  }}
                  itemStyle={{ padding: "0" }}
                  cursor={{
                    stroke: "var(--theme-accent)",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="rawWpm"
                  stroke="var(--theme-muted)"
                  strokeWidth={1}
                  fillOpacity={1}
                  fill="url(#colorRaw)"
                  name="Raw"
                  isAnimationActive={true}
                />

                <Area
                  type="monotone"
                  dataKey="wpm"
                  stroke="var(--theme-accent)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorWpm)"
                  name="WPM"
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Stats Row */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <StatCard
          label="Test Mode"
          value={`${mode} ${targetValue}`}
          subValue="english (simplified)"
          icon={<IconTarget size={18} className="text-[var(--theme-muted)]" />}
        />

        <StatCard
          label="Raw Speed"
          value={`${stats.rawWpm}`}
          subValue="words per min"
          icon={<IconBolt size={18} className="text-[var(--theme-muted)]" />}
        />

        <StatCard
          label="Characters"
          value={`${correct}/${incorrect}/${extra}/${missed}`}
          subValue="correct/fail/xtra/miss"
          icon={
            <IconActivity size={18} className="text-[var(--theme-muted)]" />
          }
        />

        <StatCard
          label="Consistency"
          value={`${consistency}%`}
          subValue="stability metric"
          icon={
            <IconActivity size={18} className="text-[var(--theme-muted)]" />
          }
        />

        <StatCard
          label="Total Time"
          value={`${timeElapsed}s`}
          subValue="total duration"
          icon={<IconClock size={18} className="text-[var(--theme-muted)]" />}
        />
      </div>

      {/* Restart Action */}
      <div className="flex pt-2">
        <button
          onClick={onRestart}
          className="group bg-[var(--theme-secondary-bg)]/50 backdrop-blur-sm border border-white/5 hover:bg-[var(--theme-accent)]/10 hover:border-[var(--theme-accent)]/50 p-4 px-8 rounded-xl text-[var(--theme-muted)] hover:text-[var(--theme-accent)] transition-all duration-300 shadow-lg flex items-center gap-3"
          title="Restart Test (tab + enter)"
          id="reset-test-button"
        >
          <IconRefresh className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700 ease-out" />
          <span className="font-bold text-[11px] tracking-widest uppercase">
            Restart
          </span>
        </button>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subValue,
  icon,
}: {
  label: string;
  value: string;
  subValue?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="bg-[var(--theme-secondary-bg)]/40 backdrop-blur-md border border-white/5 rounded-[20px] p-4 flex flex-col justify-between hover:bg-[var(--theme-secondary-bg)]/60 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-1">
        <span className="text-[9px] uppercase tracking-widest text-[var(--theme-muted)] font-black opacity-80">
          {label}
        </span>
        {icon}
      </div>
      <div>
        <div className="text-xl font-black text-[var(--theme-accent)] truncate tracking-tight">
          {value}
        </div>
        {subValue && (
          <div className="text-[8px] text-[var(--theme-muted)] opacity-50 font-bold uppercase tracking-tighter">
            {subValue}
          </div>
        )}
      </div>
    </div>
  );
}
