import ReUseableTable from "../../../../Component/UserDashboard/ReUseableTable/ReUseableTable";
const PaymentLog = () => {
    const data = [
        {
            key: '1',
            transactionId: 'TX123',
            gateway: 'PayPal',
            amount: '$100',
            status: 'Completed',
            time: '2024-06-10 09:30:00',
            
        },
        {
            key: '2',
            transactionId: 'TX456',
            gateway: 'Stripe',
            amount: '$50',
            status: 'Pending',
            time: '2024-06-11 14:45:00',
           
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
        <>

            {/* {!data.length > 0 ? (
                <Table
                    columns={columns}
                    dataSource={data}
                />
            ) : (
                <div className='bg-white flex justify-center items-center p-5'>No History Found</div>
            )} */}
          <ReUseableTable data={data} columns={columns}/>

        </>
    );
};

export default PaymentLog;