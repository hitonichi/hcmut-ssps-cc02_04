import { useState, useEffect } from 'react';
import { getRecords } from '../../services/records.service';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useSelector } from 'react-redux';
dayjs.extend(utc);
const recordTable = ({
  paperSize,
  startDate,
  endDate,
  selectedMonth,
  selectedYear,
  studentID,
  variant,
  id,
}) => {
  const { user } = useSelector((state) => state.auth);
  const userId = user.orgId;
  console.log("idd ",userId);
  const [data, setData] = useState([]);
  useEffect(() => {
    getRecords().then((resData) => setData(resData));
  }, []);
  let filteredData;
  if (variant == 'student') {
    filteredData = data.filter((row) => {
      if (startDate !== null && endDate !== null) {
        const formatedStartDate = dayjs.utc(startDate).startOf('day');
        const formatedEndDate = dayjs.utc(endDate).endOf('day');

        const rowDate = dayjs.utc(row.date);

        const startDateCheck =
          rowDate.isAfter(formatedStartDate) ||
          rowDate.isSame(formatedStartDate) ||
          startDate === null;
        const endDateCheck =
          rowDate.isBefore(formatedEndDate) ||
          rowDate.isSame(formatedEndDate) ||
          endDate === null;

        const paperSizeCheck =
          paperSize === null ||
          paperSize === 'all' ||
          row.paperSize === paperSize;

        const userIdCheck = row.author === userId;

        return paperSizeCheck && startDateCheck && endDateCheck && userIdCheck;
      } else {
        const paperSizeCheck =
          paperSize === null ||
          paperSize === 'all' ||
          row.paperSize === paperSize;

        const userIdCheck = row.author === userId;

        return paperSizeCheck && userIdCheck;
      }
    });
  } else if (variant == 'general') {
    filteredData = data.filter((row) => {
      if (startDate !== null && endDate !== null) {
        const formatedStartDate = dayjs.utc(startDate).startOf('day');
        const formatedEndDate = dayjs.utc(endDate).endOf('day');

        const rowDate = dayjs.utc(row.date);

        const startDateCheck =
          rowDate.isAfter(formatedStartDate) ||
          rowDate.isSame(formatedStartDate) ||
          startDate === null;
        const endDateCheck =
          rowDate.isBefore(formatedEndDate) ||
          rowDate.isSame(formatedEndDate) ||
          endDate === null;
        const studentidCheck =
          studentID === null || studentID === '' || row.author === studentID;

        const paperSizeCheck =
          paperSize === null ||
          paperSize === 'all' ||
          row.paperSize === paperSize;

        return (
          paperSizeCheck && startDateCheck && endDateCheck && studentidCheck
        );
      } else {
        const paperSizeCheck =
          paperSize === null ||
          paperSize === 'all' ||
          row.paperSize === paperSize;
        const studentidCheck =
          studentID === null || studentID === '' || row.author === studentID;

        return paperSizeCheck && studentidCheck;
      }
    });
  } else if (variant == 'monthly') {
    filteredData = data.filter((row) => {
      const paperSizeCheck =
        paperSize === null ||
        paperSize === 'all' ||
        row.paperSize === paperSize;
      const selectedMonthCheck =
        selectedMonth === null ||
        selectedMonth === 'all' ||
        dayjs.utc(row.date).month() + 1 == selectedMonth;

      return paperSizeCheck && selectedMonthCheck;
    });
  } else if (variant == 'annual') {
    filteredData = data.filter((row) => {
      const paperSizeCheck =
        paperSize === null ||
        paperSize === 'all' ||
        row.paperSize === paperSize;
      const selectedYearCheck =
        selectedYear === null ||
        selectedYear === 'all' ||
        dayjs.utc(row.date).year() == selectedYear;

      return paperSizeCheck && selectedYearCheck;
    });
  } else {
    filteredData = data.filter((row) => {
      const idCheck = row.printer.id == id;

      return idCheck;
    });
  }
  return (
    <div className="scroll h-[625px] w-auto overflow-y-scroll rounded-lg bg-secondaryContainer text-base tracking-wide">
      <table className="w-full table-fixed whitespace-nowrap">
        <thead className="sticky top-0">
          <tr className="roboto border-b bg-customBlue text-left font-bold text-white">
            <th className="w-[12%] px-4 py-3">Ngày in</th>
            <th className="w-[12%] px-4 py-3">Thời gian in</th>
            <th className="w-[12%] px-4 py-3">MSSV</th>
            <th className="w-[12%] px-4 py-3">In tại</th>
            <th className="px-4 py-3">Tên tài liệu</th>
            <th className="w-[8%] px-4 py-3">Khổ giấy</th>
            <th className="w-[8%] px-4 py-3">Số bản in</th>
            <th className="w-[10%] px-4 py-3">Số trang</th>
          </tr>
        </thead>
        <tbody className="roboto h-auto divide-y">
          {filteredData.map((row, index) => (
            <tr
              key={index}
              className="bg-white font-bold text-black hover:bg-primaryContainer"
            >
              <td className="px-4 py-3">{row.date.substring(0, 10)}</td>
              <td className="px-4 py-3 ">{row.date.substring(11, 19)}</td>
              <td className="px-4 py-3">{row.author}</td>
              <td className="px-4 py-3">{row.printer.location.building}</td>
              <td className="px-4 py-3">{row.fileName}</td>
              <td className="px-4 py-3">{row.paperSize}</td>
              <td className="px-4 py-3">{row.printCount}</td>
              <td className="px-4 py-3">{row.pageCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default recordTable;
