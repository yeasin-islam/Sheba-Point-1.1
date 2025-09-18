import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const DataCardGrid = ({ columns, data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="grid grid-cols- md:grid-cols-1 lg:grid-cols-3 gap-4">
      {table.getRowModel().rows.map((row) => (
        <div
          key={row.id}
          className="card border border-base-300 shadow-md bg-base-100"
        >
          <div className="card-body space-y-2">
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id} className="flex justify-between">
                <span className="font-semibold">
                  {flexRender(
                    cell.column.columnDef.header,
                    cell.getContext()
                  )}
                  :
                </span>
                <span>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataCardGrid;
