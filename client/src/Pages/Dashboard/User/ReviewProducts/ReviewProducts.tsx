import ReUseableTable from "../../../../Component/UserDashboard/ReUseableTable/ReUseableTable";


const ReviewProducts = () => {
    const data = [
        // {
        //     'products': 'Product A',
        //     'review': 'Excellent quality, highly recommend!',
        // },
        // {
        //     'products': 'Product B',
        //     'review': 'Good value for money, satisfied with the purchase.',
        // },
        // {
        //     'products': 'Product C',
        //     'review': 'Average product, could be improved.',
        // }
    ];
    
    const columns = [
        {
            title: 'Products',
            dataIndex: 'products',
        },
        {
            title: 'Review',
            dataIndex: 'review',
        },
      
       

    ];
    return (
        <div>
           <ReUseableTable defaultKey={"ReviewProducts"}
            subTitle={"You didn't receive any of our product yet"} 
            data={data}  columns={columns} />
        </div>
    );
};

export default ReviewProducts;