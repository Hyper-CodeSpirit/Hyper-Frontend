import { FaCar, FaUsers } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import { LuInspectionPanel } from "react-icons/lu";
import { PiBeachBall } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

const sidebarData = [
    {id:0, title: 'Home', icon:<HiHome />, link: '/'},
    {id:1, title: 'Appoinment', icon:<SlCalender />, link: '/appoinment'},
    {id:2, title: 'Inspections', icon:<LuInspectionPanel />, link: '/inspections'},
    {id:3, title: 'Invoices', icon:<FaFileInvoiceDollar />, link: '/invoices'},
    {id:4, title: 'Clients', icon:<FaUsers />, link: '/clients'},
    {id:5, title: 'Vehicles', icon:<FaCar />, link: '/vehicles'},
    {id:6, title: 'Services', icon:<PiBeachBall />, link: '/services'},
];

export default sidebarData;