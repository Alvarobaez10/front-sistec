// ConfirmToast.jsx
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastInstance = null;

export const showConfirm = (message, onConfirm, position = 'top-center') => {
  // Evita múltiples confirmaciones activas
  if (toastInstance !== null) return;

  // Bloquea scroll
  document.body.style.overflow = 'hidden';
  document.getElementById('confirmBackdrop').classList.remove('hidden');

  async function closeConfirm(res) {
    await toast.dismiss(toastInstance);
    toastInstance = null;
    onConfirm(res);
    document.getElementById('confirmBackdrop').classList.add('hidden');
    document.body.style.overflow = '';
  }

  toastInstance = toast(
    ({ closeToast }) => (
      <div className="flex flex-col w-full items-center">
        <p className="mb-2">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => closeConfirm(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded cursor-pointer text-sm"
          >
            Sí
          </button>
          <button
            onClick={() => closeConfirm(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer text-sm"
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      position,
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    }
  );
};
