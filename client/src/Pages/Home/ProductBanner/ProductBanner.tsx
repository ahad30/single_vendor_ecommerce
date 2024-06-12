

const ProductBanner = () => {
    return (
        <div className="text-white bg-white grid grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr] gap-x-3">
            <div className="h-36 bg-[#edeeef] flex justify-center items-center">
                <img className="object-cover w-full h-full animate-zoom animate-zoom-2s" src="https://i.ibb.co/RvL1dXH/pexels-stasknop-1298601-removebg-preview.png" alt="" />
            </div>
            <div className="h-36 bg-[#edeeef] flex justify-center items-center">
                <img className="object-cover w-full h-full animate-zoom animate-zoom-3s" src="https://i.ibb.co/C9Nx9tQ/pexels-kinkate-205926-removebg-preview.png" alt="" />
            </div>
            <div className="h-36 bg-[#edeeef] flex justify-center items-center">
                <img className="object-cover w-full h-full animate-zoom animate-zoom-4s" src="https://i.ibb.co/PgchQ1G/pexels-pixabay-51383-removebg-preview.png" alt="" />
            </div>
            <div className="h-36 bg-[#edeeef] flex justify-center items-center">
                <img className="object-cover w-full h-full animate-zoom animate-zoom-5s" src="https://i.ibb.co/0ftWC3f/pexels-madebymath-90946-removebg-preview.png" alt="" />
            </div>
        </div>
    );
};

export default ProductBanner;
