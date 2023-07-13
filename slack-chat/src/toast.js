import { toast } from 'react-toastify';
import i18n from './i18n';

export default (type, message) => toast(i18n.t(`toast.${type}.${message}`), {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  type,
  theme: 'light',
});
