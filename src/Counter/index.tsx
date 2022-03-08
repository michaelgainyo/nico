import * as React from 'react';

import './counter.scss';

import { Button, Icons, View } from '@miq/componentjs';
import { AppCtx, appEmitter, IAppCtxValue } from '../appStore';
import { debounce } from '@miq/utiljs';
import { NavLink } from 'react-router-dom';

export default function CounterView() {
  const { state } = React.useContext<IAppCtxValue>(AppCtx);
  const current = state.logs.items[new Date().formatDateToStr()] || { count: 0, dt: new Date() };
  const [count, setCount] = React.useState<number>(Number(current.count));

  const debounceOnChange = React.useRef(debounce((count: number) => appEmitter.addLog(count), 500));

  console.log(current.count);

  const inCount = () => {
    setCount((count) => {
      debounceOnChange?.current(count + 1);
      return count + 1;
    });
  };

  const deCount = () => {
    setCount((count) => {
      if (count === 0) return 0;

      debounceOnChange?.current(count - 1);
      return count - 1;
    });
  };

  return (
    <View
      className="counter-view"
      footer={
        <div className="d-flex align-items-center justify-content-between">
          <div>
            {count > 0 && (
              <Button onClick={deCount}>
                <Icons.Plus />
              </Button>
            )}
          </div>

          <Button onClick={inCount}>
            <Icons.Plus />
          </Button>
        </div>
      }
    >
      <View.TabSection>
        <div className="">
          <NavLink to="./">Home </NavLink>
          <NavLink to="./?tab=run">Run</NavLink>
        </div>

        <div className="">
          <LastSmoke current={current} />
        </div>
      </View.TabSection>

      <div className="text-center">
        <Count count={count} inCount={inCount} />
      </div>
    </View>
  );
}

const LastSmoke = ({ current }: any) => {
  const [smoke, setSmoke] = React.useState(timeSince(new Date(), new Date()));
  const { dt } = current;
  React.useEffect(() => {
    const check = () =>
      setInterval(() => {
        setSmoke(timeSince(dt as Date, new Date()));
      }, 1000 * 60);

    const interval = check();

    return () => {
      clearInterval(interval);
    };
  }, [dt]);

  return (
    <div className="text-center mb-3">
      <p>{`${smoke.hours > 0 ? `${smoke.hours} hours ` : ''}${smoke.minutes} minutes`}</p>
      <p>since your last cigarette</p>
    </div>
  );
};

const Count = ({ count, inCount }: { count: number; inCount: () => void }) => {
  return (
    <div className="count-wrapper" role="button" onClick={inCount}>
      <h1>{count}</h1>
      <Loader />
    </div>
  );
};

const timeSince = (from: Date, to: Date) => {
  const since = from.getTime() - to.getTime();
  const m = 1000 * 60;
  const h = m * 60;
  const d = h * 24;

  const sinceD = Math.ceil(since / d);
  const sinceH = Math.ceil((since - sinceD * d) / h);

  const sinceM = Math.ceil((since - sinceD * d - sinceH * h) / m);
  const sinceS = Math.ceil((since - sinceD * d - sinceH * h - sinceM * m) / 1000);

  return { days: Math.abs(sinceH), hours: Math.abs(sinceH), minutes: Math.abs(sinceM), seconds: Math.abs(sinceS) };
};

const Loader = () => {
  const [time, setTime] = React.useState<Date>(new Date());
  React.useEffect(() => {
    const tick = () =>
      setInterval(() => {
        setTime(() => new Date());
      }, 1000);

    const interval = tick();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const tm = time.tomorrow();
  tm.setHours(0, 0, 0, 0);

  const left = timeSince(time, tm);

  return (
    <div className="loader-wrapper">
      {time.formatTime({
        hour: 'numeric',
        minute: 'numeric',
        // second: '2-digit',
      })}
      <div className="">{`${left.hours} hours ${left.minutes} minutes left`}</div>
      {}
    </div>
  );
};
