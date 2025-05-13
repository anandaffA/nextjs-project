export default function Button({children,...props}){
    return (
        <button 
        {...props}
            className="text-white text-center p-2 m-2 hover:bg-white hover:text-black transition-colors duration-300 font-mono gap-2 mb-0">
                {children}
        </button>
    )
}