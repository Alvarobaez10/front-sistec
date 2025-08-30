'use client';

import { showConfirm } from '@sistec/components/common/ConfirmToast';
import { useApp } from '@sistec/context/AppContext';
import useStorage from '@sistec/hooks/useStorage';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function Header() {
  const { logOut } = useApp();
  const { getItem } = useStorage();
  const [infoUser, setInfoUser] = useState({});

  useEffect(() => {
    let data = getItem('infoUser', 'local');
    if (data) {
      setInfoUser(JSON.parse(data));
    }
  }, []);

  async function validateLogout() {
    showConfirm(
      '¿Desea cerrar sesión?',
      (confirmed) => {
        if (confirmed) {
          logOut();
        }
      },
      'top-center'
    );
  }

  const getUserInitials = () => {
    const nombre = infoUser.nombre || '';
    const apellido = infoUser.apellido || '';
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  return (
    <header className="section-header">
      <div className="div-info-session">
        <span className="user-name-only">
          {infoUser.nombre ?? ''} {infoUser.apellido ?? ''}
        </span>
        <div className="user-avatar">
          {getUserInitials()}
        </div>
        <button
          className="logout-button"
          onClick={validateLogout}
          title="Cerrar sesión"
        >
          <span>Cerrar Sesión</span>
          <span className="logout-icon">→</span>
        </button>
      </div>
    </header>
  );
}