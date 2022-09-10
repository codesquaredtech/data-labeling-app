import React from "react";
import CountUp from "react-countup";

type StatsCardProps = {
  title: string;
  extraText?: string;
  countupDuration?: number;
} & (PercentageStatsInfo | TimeStatsInfo);

type PercentageStatsInfo = {
  type: "percentage";
  currentValue: number;
  percentageDecimals?: number;
  totalValue: number;
};

type TimeStatsInfo = {
  type: "time";
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  progressValue: number;
  progressTimeUnit: "d" | "h" | "m" | "s";
};

export default function StatsCard(props: StatsCardProps) {
  const { title, extraText, type, countupDuration } = props;
  return (
    <div className="card flex flex-col w-full md:w-[calc(50%_-_0.75rem)] xl:w-[calc(25%_-_1.2rem)] p-4 bg-neutral-focus">
      <h2 className="text-xl text-neutral-content">{title}</h2>
      <div className="divider mt-2 mb-4 w-80 h-0.5 before:bg-gradient-to-r before:from-primary before:to-neutral-focus after:bg-neutral-focus" />
      <div className="flex w-full h-full pl-4 pr-4 justify-between align-items-center">
        {type === "percentage" ? (
          <PercentageStats
            countupDuration={countupDuration}
            percentageDecimals={props.percentageDecimals}
            currentValue={props.currentValue}
            totalValue={props.totalValue}
          />
        ) : (
          <TimeStats
            countupDuration={countupDuration}
            days={props.days}
            hours={props.hours}
            minutes={props.minutes}
            seconds={props.seconds}
            progressValue={props.progressValue}
            progressTimeUnit={props.progressTimeUnit}
          />
        )}
      </div>
      <div className="flex w-full h-full pr-4 justify-end align-items-center">
        <span className="text-neutral-content text-sm font-bold">{extraText}</span>
      </div>
    </div>
  );
}

function PercentageStats(props: any) {
  const { currentValue, countupDuration, totalValue, percentageDecimals = 1 } = props;
  const percentageValue = (currentValue / totalValue) * 100;
  return (
    <>
      <h4 className="text-3xl text-neutral-content font-bold">
        <CountUp duration={countupDuration} decimals={percentageDecimals} end={percentageValue} />
        <span className="text-2xl font-bold">%</span>
      </h4>
      <div className="text-primary-focus text-3xl font-bold">
        <CountUp duration={countupDuration} end={currentValue} />
        {" / "}
        <span className="text-sm font-bold text-neutral-content">
          <CountUp duration={0} end={totalValue} />
        </span>
      </div>
    </>
  );
}

function TimeStats(props: any) {
  const { days, hours, minutes, seconds, progressValue, progressTimeUnit, countupDuration } = props;
  const positiveProgress = progressValue >= 0;
  return (
    <>
      <h4 className="text-3xl text-neutral-content font-bold">
        {days && (
          <>
            <CountUp duration={countupDuration} end={days} />
            <span className="text-2xl font-bold">d </span>
          </>
        )}
        {(days || hours) && (
          <>
            <CountUp duration={countupDuration} end={hours || 0} />
            <span className="text-2xl font-bold">h </span>
          </>
        )}
        {(minutes || seconds) && (
          <>
            <CountUp duration={countupDuration} end={minutes || 0} />
            <span className="text-2xl font-bold">m </span>
          </>
        )}
        {seconds && (
          <>
            <CountUp duration={countupDuration} end={seconds} />
            <span className="text-2xl font-bold">s</span>
          </>
        )}
      </h4>
      <div className={`${positiveProgress ? "text-success" : "text-error"} text-3xl font-bold`}>
        {positiveProgress && "+"}
        <CountUp duration={countupDuration} end={progressValue} />
        <span className="text-2xl font-bold">{progressTimeUnit}</span>
      </div>
    </>
  );
}
