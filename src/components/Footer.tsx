const Footer = () => {
  return (
      <footer className="bg-[#5d6d5c] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-ivymode mb-4">Velvety</h3>
            <p className="text-gray-300 mb-4">
              Cuidados naturais para sua pele
            </p>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Velvety. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer