import { IoKeyOutline } from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ChangePassword from "../ChangePassword/ChangePassword";
import DeleteAccount from "../DeleteAccount/DeleteAccount";

const Settings = () => {


    return (
        <div className="h-screen">

            <Tabs>
                <TabList>
                    <Tab>Change Password</Tab>
                    <Tab>Delete Account</Tab>
                </TabList>

                <TabPanel>
                    <ChangePassword />
                </TabPanel>
                <TabPanel>
                    <DeleteAccount />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Settings;