import ReUseableTable from "../../../../Component/UserDashboard/ReUseableTable/ReUseableTable";
const PaymentLog = () => {
    const handleMore = () => {
        console.log(`View details for transaction ID:`);
    };
    const data = [
        // {
        //     key: '1',
        //     transactionId: 'TX123',
        //     gateway: 'PayPal',
        //     amount: '$100',
        //     status: 'Completed',
        //     time: '2024-06-10 09:30:00',
        //     more: <button onClick={() => handleMore()}>View Details</button>,
        // },
        // {
        //     key: '2',
        //     transactionId: 'TX456',
        //     gateway: 'Stripe',
        //     amount: '$50',
        //     status: 'Pending',
        //     time: '2024-06-11 14:45:00',
        //     more: <button onClick={() => handleMore()}>View Details</button>,
        // },

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
        <>
            <ReUseableTable defaultKey={"PaymentLog"} data={data} columns={columns} subTitle={"No History Found"} />

        </>
    );
};

export default PaymentLog;