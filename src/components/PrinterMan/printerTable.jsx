import { HashLink } from 'react-router-hash-link';
import { getPrinter } from '../../services/printer.service';
import { useState, useEffect } from 'react';

import { formatDate } from '../../utils/date';

const printerTable = ({ branch, building, statuss }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getPrinter().then((resData) => setData(resData));
  }, []);

  const filteredData = data.filter((row) => {
    const formatedStatus = row.enabled ? 'enabled' : 'disabled';

    const statusCheck =
      statuss === null || statuss === 'chưa chọn' || formatedStatus == statuss;
    const branchCheck =
      branch === null ||
      branch === 'chưa chọn' ||
      row.location.branch === branch;
    const buildingCheck =
      building === null ||
      building === undefined ||
      row.location.building.includes(building);

    return statusCheck && branchCheck && buildingCheck;
  });
  const rowsToDisplay =
    filteredData.length === data.length ? data : filteredData;
  return (
    <div className="scroll h-[625px] w-auto overflow-y-scroll rounded-lg bg-secondaryContainer text-base tracking-wide">
      <table className="w-full table-fixed whitespace-nowrap">
        <thead className="sticky top-0">
          <tr className="roboto border-b bg-customBlue text-left font-bold text-white">
            <th className="w-[20%] px-4 py-3">ID</th>
            <th className="px-4 py-3">Vị trí</th>
            <th className="px-4 py-3">Máy in</th>
            <th className="w-[20%] px-4 py-3">Lần in cuối cùng</th>
            <th className="flex  justify-center px-4 py-3">
              Khổ giấy cho phép
            </th>
            <th className=" px-4 py-3">Trạng thái</th>
          </tr>
        </thead>
        <tbody className="roboto h-auto divide-y">
          {rowsToDisplay.map((row, index) => (
            <HashLink
              key={index}
              to={`${row._id}`}
              className="tr bg-white font-bold text-black hover:bg-primaryContainer"
            >
              <td className="px-4 py-3">{row._id}</td>
              <td className="px-4 py-3">
                {row.location.branch} {row.location.building}
              </td>
              <td className="px-4 py-3">{row.name}</td>
              <td className="px-4 py-3">
                {row.lastUsed ? formatDate(row.lastUsed) : 'Has not been used'}
              </td>
              <td className="flex w-full justify-center px-4 py-3">
                {row.maxSize}
              </td>

              <td className="w-full max-w-[200px] px-4  py-3">
                <div className="flex items-center justify-center">
                  <h2
                    className={`flex w-fit items-center justify-center rounded-2xl px-3 py-1 text-base  font-normal text-white ${
                      row.enabled ? '   bg-green-700' : '  bg-red-700 '
                    }`}
                  >
                    {row.enabled ? 'Khả dụng' : 'Không khả dụng '}
                  </h2>
                </div>
              </td>
            </HashLink>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default printerTable;
