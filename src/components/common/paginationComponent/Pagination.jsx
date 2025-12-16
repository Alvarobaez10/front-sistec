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
        onClick={() => onclick(meta.currentPage - 1)}
        className="flex items-center justify-center w-6 h-6 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
        title="Anterior"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>
    );
  }

  if (meta.currentPage < meta.lastPage) {
    btnSiguiente = (
      <button
        onClick={() => onclick(meta.currentPage + 1)}
        className="flex items-center justify-center w-6 h-6 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
        title="Siguiente"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    );
  }

  const paginas = [];
  paginaInicial = paginaInicial === 0 ? 1 : paginaInicial;
  for (let i = paginaInicial; i <= paginaFinal; i++) {
    let activa = '';
    if (i === meta.currentPage) {
      activa = '!bg-blue-500 text-white hover:bg-blue-600 cursor-default';
    }
    paginas.push(
      <span
        onClick={() => onclick(i)}
        key={i}
        className={`flex items-center text-sm justify-center w-6 h-6 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 cursor-pointer ${activa}`}
      >
        {i}
      </span>
    );
  }

  if (meta.total > 0) {
    return (
      <div className="footer-pagination">
        <div className="div-pagination flex flex-row items-center">
          <span className="mr-auto text-sm text-gray-700">
            {totalPagina} de {meta.total} {description}
          </span>
          <div className="flex flex-row items-center gap-1">
            {btnAnterior}
            {paginas.length > 1 ? paginas : []}
            {btnSiguiente}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
