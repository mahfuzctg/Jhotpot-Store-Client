const TableLoadingSkeleton: React.FC = () => {
    return (
      <div className="overflow-x-auto my-10">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {Array.from({ length: 6 }).map((_, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-400"
                >
                  <div className="h-4 bg-gray-600 rounded w-20 animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="bg-gray-800">
                {Array.from({ length: 6 }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 bg-gray-600 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TableLoadingSkeleton;