function Navbar(){
    return (
        <nav className="bg-forest-bark/50 sticky flex justify-between shadow-xl p-3 z-10">
            <div className="font-bold text-forest-mist my-auto text-2xl mx-5"> FOR.est </div>
            <div className="flex w-100 gap-2 justify-center text-white/50 mx-5 my-auto text-lg p-1 rounded-full bg-forest-fog"> <i className="my-auto text-center text-white/60 fas fa-search"></i> Search </div>
            <div className="flex flex-row gap-5 items-center mx-5">
                <div className="text-bold text-forest-mist hover:text-white transition-colors duration-300 cursor-pointer">Dashboard</div>    
                <div className="text-bold text-forest-mist hover:text-white transition-colors duration-300 cursor-pointer">Profile</div>    
                <div className="text-bold text-forest-mist hover:text-white transition-colors duration-300 cursor-pointer">Logout</div>    
            </div>
        </nav>
    )
}

export default Navbar