function Navbar(){
    return (
        <nav className="flex justify-between shadow-xl p-3">
            <div className="text-bold text-forest-bg text-2xl mx-5"> FOR.est </div>
            <div className="flex flex-row gap-5 items-center mx-5">
                <div className="text-bold text-forest-bg hover:text-forest-moss transition-colors duration-300 cursor-pointer">Dashboard</div>    
                <div className="text-bold text-forest-bg hover:text-forest-moss transition-colors duration-300 cursor-pointer">Profile</div>    
                <div className="text-bold text-forest-bg hover:text-forest-moss transition-colors duration-300 cursor-pointer">Logout</div>    
            </div>
        </nav>
    )
}

export default Navbar