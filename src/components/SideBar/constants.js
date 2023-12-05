import printing from '../../assets/icon/printing.png';
import undo from '../../assets/icon/undo.png';
import settings from '../../assets/icon/settings.png';
export const DEFAULT_ROUTES = {
  student: [
    {
      path: 'printing',
      label: 'In tài liệu',
      icon: printing,
    },
    {
      path: 'records',
      label: 'Lịch sử in',
      icon: undo,
    },
  ],
  spso: [
    {
      path: 'printers',
      label: 'Quản lý máy in',
      icon: printing,
    },
    {
      path: 'records',
      label: 'Lịch sử in',
      icon: undo,
    },
    {
      path: 'policies',
      label: 'Thay đổi chính sách',
      icon: settings,
    },
  ],
};
