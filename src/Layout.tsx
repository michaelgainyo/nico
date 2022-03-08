import * as React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import './layout.scss';

// import { useSlideOut } from '@miq/hookjs';
import { Icons, View } from '@miq/componentjs';
// import { getClassName as getCN } from '@miq/utiljs';

import CounterView from './Counter';
import { EntryAddForm } from './Monoloq';

const MonoloqView = React.lazy(() => import('./Monoloq'));
const AchivementsView = React.lazy(() => import('./Achievements'));
const StatsView = React.lazy(() => import('./Stats'));
const LogsView = React.lazy(() => import('./Logs'));
const SettingsView = React.lazy(() => import('./Settings'));

interface ILayoutProps extends React.ComponentPropsWithoutRef<'div'> {
  renderHeader?: (o: any) => React.ReactNode;
  renderFooter?: (o: any) => React.ReactNode;
}

export const Layout = ({ children, renderHeader, renderFooter, ...props }: ILayoutProps) => {
  // if (!state.user.slug) return <LoginView />;

  return (
    <div className="nico-layout">
      <View
        title={<Header />}
        actions={
          <div className="p-1">
            <NavLink to="monoloq">
              <Icons.ChatSquareText />
            </NavLink>
          </div>
        }
        footer={<Footer />}
        className="nico-layout-inner"
        mainCN="nico-layout-main"
        headerCN="nico-layout-header"
        footerCN="nico-layout-footer"
      >
        <div className="miq-container center">
          <Routes>
            <Route path="monoloq/*" element={<MonoloqView />} />
            <Route path="achivements/*" element={<AchivementsView />} />
            <Route path="stats" element={<StatsView />} />
            <Route path="logs" element={<LogsView />} />
            <Route path="settings" element={<SettingsView />} />
            <Route index element={<CounterView />} />
          </Routes>
        </div>
      </View>
    </div>
  );
};

const Header = (props: any) => {
  return (
    <div className="p-1">
      <div className="d-flex">
        <div className="logo">
          <Icons.Robot />
        </div>
      </div>
    </div>
  );
};
const Footer = () => {
  return (
    <div className="nico-layout-footer-inner">
      <Routes>
        <Route
          path="monoloq"
          element={
            <div className="w-100 p-1">
              <EntryAddForm />
            </div>
          }
        />
        <Route
          path="/*"
          element={
            <div className="d-grid grid-5 gap-1 p-1" style={{ justifyItems: 'center', alignSelf: 'center' }}>
              <FooterLink to="achivements" label="Achivements" Icon={Icons.Trophy} />
              <FooterLink to="stats" label="Stats" Icon={Icons.GraphDownArrow} />
              <FooterLink to="/" label="Counter" Icon={Icons.Speedometer} />
              <FooterLink to="logs" label="Logs" Icon={Icons.JournalBookmark} />
              <FooterLink to="settings" label="Settings" Icon={Icons.Gear} />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

const FooterLink = (props: { to: string; label: string; Icon: typeof Icons.House }) => {
  const { Icon } = props;
  return (
    <NavLink to={props.to} className="nico-layout-footer-link p-1" title={props.label}>
      <div className="d-flex flex-column align-items-center">
        <Icon className="icon" />
        <div className="label text-ellipsis">{props.label}</div>
      </div>
    </NavLink>
  );
};
