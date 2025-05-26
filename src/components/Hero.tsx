const Hero = () => {
    return (
        <section className="relative min-h-[70vh] md:min-h-screen">
            <div className="hidden md:flex md:min-h-screen">
                <div className="w-1/2 flex items-center justify-center relative z-10">
                    <img
                        src="/src/assets/Velvety2.png"
                        alt="Produto Velvety"
                        className="drop-shadow-2xl z-[11] max-h-[1000vh]"
                    />
                </div>
                <div className="w-1/2 relative">
                    <img 
                        src="/src/assets/Image.png" 
                        alt="Background" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* poe so o texto e o fundo p mobile*/}
            <div className="md:hidden w-full h-full">
                <div className="absolute inset-0 bg-[#889e86] z-0"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center px-4 md:px-10 md:ml-[32rem] mb-[5rem] md:mb-[15rem]">
                <h1 className="text-white text-3xl md:text-[115px] leading-[1.1] font-ivymode text-center">
                    Let nature take <br /> care of your body <br /> and soul
                </h1>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-20 md:h-40 bg-[#f2f6ef] z-0"></div>
        </section>
    );
};

export default Hero;
