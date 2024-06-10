

const ReUseableTable = () => {
    const handleMore = () => {
        console.log(`View details for transaction ID:`);
    };
    const data = [
        {
            key: '1',
            transactionId: 'TX123',
            gateway: 'PayPal',
            amount: '$100',
            status: 'Completed',
            time: '2024-06-10 09:30:00',
            more: <button onClick={() => handleMore()}>View Details</button>,
        },
        {
            key: '2',
            transactionId: 'TX456',
            gateway: 'Stripe',
            amount: '$50',
            status: 'Pending',
            time: '2024-06-11 14:45:00',
            more: <button onClick={() => handleMore()}>View Details</button>,
        },

    ];
    const columns = [
        {
            title: 'Transaction ID',
            dataIndex: 'transactionId',
        },
        {
            title: 'Gateway',
            dataIndex: 'gateway',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Time',
            dataIndex: 'time',
        },
        {
            title: 'MORE',
            dataIndex: 'more',
        },

    ];
    return (
        <div>
            <table className="table-auto border-collapse w-full">
                <thead className='bg-[#265eda]'>
                    <tr className=" text-white font-serif">
                        {columns.map(column => (
                            <th key={column.dataIndex} className="px-4 py-2">{column.title}</th>
                        ))}
                    </tr>
                </thead>
             
                <tbody>
                    {data.length > 0
                        ? (
                            data.map(item => (
                                <tr key={item.key}>
                                    {columns.map(column => (
                                        <td key={column.dataIndex} className="border px-4 py-2">{item[column.dataIndex]}</td>
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
                        No History Found
                    </div>
                )
            }
        </div>
    );
};

export default ReUseableTable;