const Navbar = () => {
    return (
        <div>
            <div className="flex justify-between px-8 w-full h-[50px] items-center">

                <div className="bg-red-400 w-[103px] h-[25px]"></div>
                
                <ul className="md:flex gap-4 hidden">
                    <li>Home</li>
                    <li>About</li>
                    <li>Featur</li>
                    <li>Reward</li>
                </ul>

                <div className="px-4 py-2 bg-red-500 text-white rounded-xl">
                    <button type="submit" >Sigin In</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar