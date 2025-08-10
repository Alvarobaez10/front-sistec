'use client';
import { useState } from 'react';
import Header from './Header';
import Menu from './Menu';

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className={`main-view ${collapsed ? 'menu-collapsed' : ''}`}>
      <Header />
      <Menu collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="section-view">{children}</main>
    </section>
  );
}
