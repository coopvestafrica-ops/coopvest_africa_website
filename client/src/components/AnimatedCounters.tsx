import { useEffect, useState } from "react";

interface Counter {
  label: string;
  value: number;
  suffix?: string;
}

interface AnimatedCountersProps {
  counters: Counter[];
}

function AnimatedCounter({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function AnimatedCounters({ counters }: AnimatedCountersProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {counters.map((counter, index) => (
        <div key={index} className="text-center">
          <p className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            <AnimatedCounter value={counter.value} suffix={counter.suffix} />
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {counter.label}
          </p>
        </div>
      ))}
    </div>
  );
}
