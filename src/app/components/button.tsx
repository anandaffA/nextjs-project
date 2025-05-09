export default function Button({onClick,children}){
    return (
        <button 
            onClick={onClick} 
            className="text-white text-center p-2 m-2 hover:bg-white hover:text-black transition-colors duration-300 font-mono flex justify-end items-center gap-2 mb-0">
                {children}
        </button>
    )
}