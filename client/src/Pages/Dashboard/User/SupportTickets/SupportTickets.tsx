import ReUseableTable from "../../../../Component/UserDashboard/ReUseableTable/ReUseableTable";
import { IoMdCard } from "react-icons/io";

const SupportTickets = () => {
    const data = [
        // {
        //     key: 1,
        //     subject: 'Website Issue',
        //     status: 'Open',
        //     priority: 'High',
        //     'last reply': '2024-06-09 10:24 AM',
        //     action: 'View',
        // },
        // {
        //     key: 2,
        //     subject: 'Billing Question',
        //     status: 'Closed',
        //     priority: 'Low',
        //     'last reply': '2024-06-08 02:15 PM',
        //     action: 'View',
        // },
        // {
        //     key: 3,
        //     subject: 'Account Access',
        //     status: 'Pending',
        //     priority: 'Medium',
        //     'last reply': '2024-06-10 08:00 AM',
        //     action: 'View',
        // },

    ];

    const columns = [
        {
            title: 'Subject',
            dataIndex: 'subject',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
        },
        {
            title: 'Last Reply',
            dataIndex: 'last reply',
        }, {
            title: 'Action',
            dataIndex: 'action',
        },

    ];
    return (
        <div>
            <div className="flex justify-end items-center mt-2 mb-4">
                <div className="bg-[#265eda] text-white flex justify-between items-center gap-2 py-2 px-4 rounded-md">
                <IoMdCard className="w-4 h-4"/>
                    <span className="text-sm">Open New Tickets</span>
                </div>
            </div>
            <div>
                <ReUseableTable defaultKey={"SupportTickets"}
                    subTitle={"No data Found"}
                    data={data} columns={columns} />
            </div>
        </div>
    );
};

export default SupportTickets;