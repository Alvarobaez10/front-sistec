'use client';
import { useState } from 'react';
import Header from './Header';
import Menu from './Menu';
import { useApp } from '@sistec/context/AppContext';
import ContainerForms from './ContainerForms';

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { menu } = useApp();

  return (
    <section className={`main-view ${collapsed ? 'menu-collapsed' : ''}`}>
      <Header />
      <Menu menuItems={menu} collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="section-view">
        <ContainerForms></ContainerForms>
      </main>
    </section>
  );
}
