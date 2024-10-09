interface GridColumnToggleProps {
  setGridCols: (cols: string) => void;
  currentCols: string; 
}

export default function GridColumnToggle({ setGridCols, currentCols }: GridColumnToggleProps) {
  return (
    <div className="hidden md:flex space-x-2 bg-white p-2 rounded border border-gray-200">
      <button 
        onClick={() => setGridCols("2")} 
        aria-label="2 Columns" 
        aria-pressed={currentCols === "2"}
        className={`p-2 rounded border border-gray-200 transition-colors duration-150 
          ${currentCols === "2" ? "bg-gray-100" : "hover:bg-gray-100"}`}
      >
        <svg width="32px" height="32px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 17h8v-17h-8v17zM1 1h6v15h-6v-15zM9 0v17h8v-17h-8zM16 16h-6v-15h6v15z" fill="#000000"></path> </g></svg>
      </button>
      <button 
        onClick={() => setGridCols("3")} 
        aria-label="3 Columns" 
        aria-pressed={currentCols === "3"}
        className={`p-2 rounded border border-gray-200 transition-colors duration-150 
          ${currentCols === "3" ? "bg-gray-100" : "hover:bg-gray-100"}`}
      >
        <svg width="32px" height="32px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 17h5v-17h-5v17zM1 1h3v15h-3v-15zM6 17h5v-17h-5v17zM7 1h3v15h-3v-15zM12 0v17h5v-17h-5zM16 16h-3v-15h3v15z" fill="#000000"></path> </g></svg>
      </button>
      <button 
        onClick={() => setGridCols("4")} 
        aria-label="4 Columns" 
        aria-pressed={currentCols === "4"}
        className={`p-2 rounded border border-gray-200 transition-colors duration-150 
          ${currentCols === "4" ? "bg-gray-100" : "hover:bg-gray-100"}`}
      >
        <svg width="32px" height="32px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 17h3v-17h-3v17zM2 1h1v15h-1v-15zM5 17h3v-17h-3v17zM6 1h1v15h-1v-15zM9 17h3v-17h-3v17zM10 1h1v15h-1v-15zM13 0v17h3v-17h-3zM15 16h-1v-15h1v15z" fill="#000000"></path> </g></svg>
      </button>
    </div>
  );
}
