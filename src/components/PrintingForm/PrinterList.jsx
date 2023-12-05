import PropTypes from 'prop-types';
import PrinterCard from './PrinterCard';

export default function PrinterList({
  printers,
  selectedPrinter,
  setSelectedPrinter,
}) {
  console.log('[FROM P.List]', printers);

  return (
    <div className="scroll grid flex-1 grid-cols-3 gap-2 overflow-y-scroll p-4">
      {printers.map((p) => (
        <PrinterCard
          key={p._id}
          printer={p}
          selectedPrinter={selectedPrinter}
          setSelectedPrinter={setSelectedPrinter}
        />
      ))}
    </div>
  );
}

PrinterList.propTypes = {
  printers: PropTypes.array,
  selectedPrinter: PropTypes.object,
  setSelectedPrinter: PropTypes.func,
};
