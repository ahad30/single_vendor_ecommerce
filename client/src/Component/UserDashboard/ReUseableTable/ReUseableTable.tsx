

const ReUseableTable = ({ columns, data, defaultKey, subTitle }) => {
    const getHeaderClassName = () => {
        switch (defaultKey) {
            case 'orderLog':
                return 'bg-white  text-[#042656] ';
            case 'ReviewProducts':
                return 'bg-white  text-[#042656]';
            case 'PaymentLog':
                return 'bg-[#265eda] text-white';
            case "SupportTickets":
                return 'bg-white  text-[#042656]';
            default:
                return 'bg-[#265eda] text-white';
        }
    };


    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full">
                <thead
                    className={getHeaderClassName()}
                // className={`${defaultKey === "orderLog" ? "bg-white  text-[#042656] " : "bg-[#265eda] text-white"} `}>
                >
                    <tr className="  font-serif">
                        {columns.map(column => (
                            <th key={column.dataIndex} className="px-4 py-2 font-light border-[#e5e9ee] border-[1px]">{column.title}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length > 0
                        ? (
                            data.map(item => (
                                <tr key={item.key}>
                                    {columns.map(column => (
                                        <td key={column.dataIndex} className="border px-4 py-2 text-sm bg-white">{item[column.dataIndex]}</td>
                                    ))}
                                </tr>
                            ))
                        ) :
                        ""

                    }

                </tbody>

            </table>
            {
                !data.length > 0 &&
                (
                    <div className="bg-white font-normal text-[##042656] text-sm py-3 flex justify-center items-center w-full">
                        {subTitle}
                    </div>

                )
            }
        </div>
    );
};

export default ReUseableTable;