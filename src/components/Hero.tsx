const Hero = () => {
    return (
        <section className="flex min-h-screen relative">
            <div className="w-1/2 flex items-center justify-center relative z-10">
                <img
                    src="/src/assets/Velvety2.png"
                    alt="Produto Velvety"
                    className="drop-shadow-2xl z-[80]"
                />
            </div>

            <div className="w-1/2 relative">
                <img 
                    src="/src/assets/Image.png" 
                    alt="Image" 
                    className="w-full h-full object-cover"
                />
            </div>

                <div className="absolute inset-0 ml-[30.5rem] flex items-center justify-center px-10 mb-[15rem]">
                    <h1 className="text-white text-[115px] leading-[1.1] font-ivymode">
                        Let nature take <br /> care of your body <br /> and soul
                    </h1>
                </div>
            <div className="absolute bottom-0 left-0 w-full h-40 bg-[#f2f6ef] z-0"></div>
        </section>
    );
};

export default Hero;
