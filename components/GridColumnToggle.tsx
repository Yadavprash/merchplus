// components/GridColumnToggle.tsx
interface GridColumnToggleProps {
  setGridCols: (cols: string) => void;
}

export default function GridColumnToggle({ setGridCols }: GridColumnToggleProps) {
  return (
    <div className="flex space-x-2 bg-white">
      <button 
        onClick={() => setGridCols("3")} 
        aria-label="3 Columns" 
        className="p-2 rounded border border-gray-200 hover:bg-gray-100 transition-colors duration-150"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32px" 
          height="32px" 
          viewBox="0 0 64 64" 
          fill="none" 
          stroke="currentColor"
          className="text-gray-600"
        >
          <rect x="1" y="1" width="20" height="62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" rx="4" />
          <rect x="43" y="1" width="20" height="62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" rx="4" />
          <rect x="21" y="1" width="22" height="62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" rx="4" />
        </svg>
      </button>
      <button 
        onClick={() => setGridCols("4")} 
        aria-label="4 Columns" 
        className="p-2 rounded border border-gray-200 hover:bg-gray-100 transition-colors duration-150"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32px" 
          height="32px" 
          viewBox="0 0 64 64" 
          fill="none" 
          stroke="currentColor"
          className="text-gray-600"
        >
          <rect x="1" y="1" width="14" height="62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" rx="4" />
          <rect x="15" y="1" width="14" height="62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" rx="4" />
          <rect x="30" y="1" width="14" height="62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" rx="4" />
          <rect x="45" y="1" width="14" height="62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" rx="4" />
        </svg>
      </button>
      <button 
        onClick={() => setGridCols("5")} 
        aria-label="5 Columns" 
        className="p-2 rounded border border-gray-200 hover:bg-gray-100 transition-colors duration-150"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32px" 
          height="32px" 
          viewBox="0 0 64 64" 
          fill="none" 
          stroke="currentColor"
          className="text-gray-600"
        >
          <rect x="1" y="1" width="12" height="62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" rx="4" />
          <rect x="12" y="1" width="12" height="62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" rx="4" />
          <rect x="23" y="1" width="12" height="62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" rx="4" />
          <rect x="34" y="1" width="12" height="62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" rx="4" />
          <rect x="45" y="1" width="12" height="62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" rx="4" />
        </svg>
      </button>
    </div>
  );
}
