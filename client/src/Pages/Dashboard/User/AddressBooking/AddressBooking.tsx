import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ReUseableAddButton from "../../../../Component/UserDashboard/ReUseableAddButton/ReUseableAddButton";

const AddressBooking = () => {
    const landmarks = [
        {
            "title": "Central Park",
            "address": "New York, NY 10024, United States"
        },
        {
            "title": "Eiffel Tower",
            "address": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France"
        },
        {
            "title": "Sydney Opera House",
            "address": "Bennelong Point, Sydney NSW 2000, Australia"
        },
        {
            "title": "Great Wall of China",
            "address": "Huairou District, China"
        },
        {
            "title": "Taj Mahal",
            "address": "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India"
        },
        {
            "title": "Colosseum",
            "address": "Piazza del Colosseo, 1, 00184 Roma RM, Italy"
        },
        {
            "title": "Machu Picchu",
            "address": "08680, Peru"
        },
        {
            "title": "Christ the Redeemer",
            "address": "Parque Nacional da Tijuca, Rio de Janeiro - RJ, 22271-070, Brazil"
        },
        {
            "title": "Statue of Liberty",
            "address": "New York, NY 10004, United States New York, NY 10004, United States New York, NY 10004, United States New York, NY 10004, United States"
        },
        {
            "title": "Big Ben",
            "address": "Westminster, London SW1A 0AA, United Kingdom"
        }
    ];

    return (
        <div>
            <div>
                <ReUseableAddButton title={"Add Address"}/>
            </div>
            <div>
                {
                    landmarks?.map((landmark, idx) => (
                        <div key={idx} className="bg-white shadow-lg  py-3 px-4 md:py-5 md:px-8 rounded-md flex justify-between items-center mb-3">
                            <div>
                                <h1 className="font-semibold text-sm md:text-base">{landmark?.title}</h1>
                                <p className="w-[75%] text-[12px] md:text-sm text-justify">{landmark?.address}</p>
                            </div>
                            <div className="flex justify-center items-center gap-4">
                                <span className="bg-[#265edd] p-1 md:p-2 rounded-md text-white hover:bg-[#1e4cb7] transition-colors duration-200">
                                    <FaEdit className="text-base  md:w-4 md:h-4" />
                                </span>
                                <span className="bg-[#f1e2e1] p-1 md:p-2 rounded-md text-white hover:bg-[#cc8088] transition-colors duration-200">
                                    <MdDelete className="text-[#f44336] text-base md:w-4 md:h-4" />
                                </span>
                            </div>
                        </div>
                    )
                    )
                }

            </div>
        </div>
    );
};

export default AddressBooking;