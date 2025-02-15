import ReUseableTable from "../../../../Component/UserDashboard/ReUseableTable/ReUseableTable";


const OrderLog = () => {
    const handleMore = () => {
        console.log(`View details for transaction ID:`);
    };
    const data = [
        // {
        //     's.n': 1,
        //     'gateway': 'ORD12345',
        //     'products': 'Product A, Product B',
        //     'payment': 'Paid',
        //     'order': 'Delivered',
        //     'action': 'View Details',
        // },
        // {
        //     's.n': 2,
        //     'gateway': 'ORD12346',
        //     'products': 'Product C',
        //     'payment': 'Pending',
        //     'order': 'Processing',
        //     'action': 'View Details',
        // },
        // {
        //     's.n': 3,
        //     'gateway': 'ORD12347',
        //     'products': 'Product D, Product E, Product F',
        //     'payment': 'Paid',
        //     'order': 'Shipped',
        //     'action': 'View Details',
        // },
       
    ];


    const columns = [
        {
            title: 'S.N',
            dataIndex: 's.n',
        },
        {
            title: 'Order ID',
            dataIndex: 'gateway',
        },
        {
            title: 'Products',
            dataIndex: 'products',
        },
        {
            title: 'Payment',
            dataIndex: 'payment',
        },
        {
            title: 'Order',
            dataIndex: 'order',
        },
        {
            title: 'ACTION',
            dataIndex: 'action',
        },

    ];
    return (
        <div>
            <ReUseableTable 
            subTitle={"No order yet"} 
            data={data} defaultKey={"orderLog"} 
            columns={columns} />
        </div>
    );
};

export default OrderLog;