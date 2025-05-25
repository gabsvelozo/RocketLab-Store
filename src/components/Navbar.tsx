import { ChevronRight } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="absolute w-full top-0 bg-transparent text-white px-12 py-4 z-[99]">
        <div className="flex flex-row justify-between items-center uppercase">
            <img src="/src/assets/Logo.png" alt="Logo" className="cursor-pointer" />
            <div className="flex items-center gap-[150px]">
                <div className="flex gap-6 font-thin">
                    <a className='flex flex-row gap-1 items-center hover:text-gray-400' href="">Páginas <span><ChevronRight size={16} strokeWidth={2}/></span></a>
                    <a href="" className="uppercase font-thin hover:underline hover:text-gray-400 ease-in-out duration-200">Comprar</a>
                    <a href="" className="uppercase font-thin hover:underline hover:text-gray-400 ease-in-out duration-200">Sobre</a>
                </div>
                <div className="flex gap-3 ">
                    <button className="uppercase font-thin hover:underline hover:text-gray-400 ease-in-out duration-200">Entrar</button>
                    <button className="uppercase font-thin hover:underline hover:text-gray-400 ease-in-out duration-200">Carrinho</button>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
