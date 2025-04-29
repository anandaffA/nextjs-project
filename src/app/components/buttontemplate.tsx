export default function Button({children}){
    return(
        <button className="bg-amber-600 text-4xl hover:text-white hover:bg-black transition-colors duration-200">
            {children}
        </button>
    )
}