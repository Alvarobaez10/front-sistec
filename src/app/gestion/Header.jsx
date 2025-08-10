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

  return (
    <header className="section-header">
      <Image src={'/logo.png'} alt="SAC Logo" className="brand-image" width={100} height={40} />
      
      <div>
        <h1 className="text-xl font-semibold">SAC - Sistema de asociaciones y compradores</h1>
        <a className="ayuda-app" href="#ayuda">Ayuda del sistema</a>
      </div>
      
      <div className="div-info-session">
        <div className="info-session">
          <label>
            {infoUser.nombre ?? ''} {infoUser.apellido ?? ''}
          </label>
        </div>
        <span 
          className="icon-logout" 
          onClick={() => validateLogout()}
          title="Cerrar sesión"
        ></span>
      </div>
    </header>
  );
}