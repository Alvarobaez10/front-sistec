export default function Pagination({
  meta,
  onclick,
  exportExcel,
  reportExcel,
  state,
  description = '',
}) {
  let paginaFinal = meta?.lastPage <= 5 ? meta?.lastPage : 5;
  let btnAnterior;
  let btnSiguiente;
  let paginaInicial = 1;
  const totalPagina =
    meta.currentPage * meta.perPage > meta.total ? meta.total : meta.currentPage * meta.perPage;

  if (meta.currentPage > 3) {
    paginaFinal = meta.currentPage + 2;
    if (paginaFinal > meta.lastPage) {
      const diferencia = paginaFinal - meta.lastPage;
      paginaInicial = meta.currentPage - 2 - diferencia;
      paginaFinal = meta.lastPage;
    } else {
      paginaInicial = meta.currentPage - 2;
    }
  }

  if (meta.currentPage > 1) {
    btnAnterior = (
      <button
        onClick={onclick}
        data-id={meta.currentPage - 1}
        title={'Anterior'}
        className={'btn-pagination icon-prev'}
      ></button>
    );
  }

  if (meta.currentPage < meta.lastPage) {
    btnSiguiente = (
      <button
        onClick={onclick}
        data-id={meta.currentPage + 1}
        title={'Siguiente'}
        className={'btn-pagination icon-next'}
      ></button>
    );
  }

  const paginas = [];
  paginaInicial = paginaInicial === 0 ? 1 : paginaInicial;
  for (let i = paginaInicial; i <= paginaFinal; i++) {
    let activa = '';
    if (i === meta.currentPage) {
      activa = 'page-active';
    }
    paginas.push(
      <span onClick={onclick} data-id={i} key={i} className={`number-page ${activa}`}>
        {i}
      </span>
    );
  }

  if (meta.total > 0) {
    return (
      <div className="footer-pagination">
        <div className="div-pagination">
          <span className="numPag">
            {totalPagina} de {meta.total} {description}
          </span>
          {btnAnterior}
          {paginas.length > 1 ? paginas : []}
          {btnSiguiente}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
