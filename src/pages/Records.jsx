import 'dayjs/locale/en';
import StudentRecords from './StudentRecords';
import SPSORecords from './SPSORecords';
import { useSelector } from 'react-redux';

const Records = () => {
  const { user } = useSelector((state) => state.auth);

  const renderRecordScreen = (role) => {
    switch (role) {
      case 'student':
        return <StudentRecords />;
      default:
        return <SPSORecords />;
    }
  };

  return <>{renderRecordScreen(user.role)}</>;
};

export default Records;
