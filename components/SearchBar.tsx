
export const SearchBar = () =>{
    return <div className="border rounded-3xl border-hidden bg-primary">
    <div className="relative flex items-center  h-8 rounded-lg  overflow-hidden">
        <div className="grid place-items-center pl-3 h-full w-8 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="chocolate">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
        className="peer h-full w-full outline-none text-xs text-gray-700 px-2  bg-primary rounded-3xl "
        type="text"
        id="search"
        placeholder="Search" /> 
    </div>
</div>
}