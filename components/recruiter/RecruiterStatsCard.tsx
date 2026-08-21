import { LucideIcon } from "lucide-react";

type RecruiterStatsCardProps = {
  title: string;
  value: number;
  subtitle?: string;
  icon: LucideIcon;
};

export default function RecruiterStatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: RecruiterStatsCardProps) {
  return (
    <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between group">
      <div>
        <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {title}
        </h3>
        <p className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          {value}
        </p>
        {subtitle && (
          <p className="mt-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="h-11 w-11 rounded-xl flex items-center justify-center btn-primary shadow-sm shadow-teal-500/20 dark:shadow-purple-500/20 group-hover:scale-105 transition-transform shrink-0">
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}