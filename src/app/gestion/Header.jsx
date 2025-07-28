import useStorage from '@sistec/hooks/useStorage';
import React, { useEffect, useState } from 'react';

export default function Header() {
  let { getItem } = useStorage();
  const [infoUser, setInfoUser] = useState({});

  useEffect(() => {
    let data = getItem('infoUser', 'local');
    if (data) {
      setInfoUser(JSON.parse(data));
    }
  }, []);

  return (
    <header className="section-header">
      <Image src={""} alt="MapGIS Land" className="brand-image" />
      <div>
        <h1 className="text-2xl font-bold text-md">SAC - Sistema de asociaciones y compradores</h1>
        <a className="ayuda-app">Ayuda del sistema</a>
      </div>
    </header>
  );
}
