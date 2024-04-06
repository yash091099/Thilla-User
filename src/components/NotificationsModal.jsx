import React, { useEffect, useState } from 'react';
import closeIcon from '../assets/close-icon.svg';
import calenderIcon from '../assets/calender.svg';
import notificationIcon from '../assets/stores/S3.png';
import moment from 'moment';
import { getNotifications, markNotificationAsRead } from '../context/services/notification';
import CustomLoader from './loader';
import toast from 'react-hot-toast';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function NotificationsModal(props) {
    const [data, setData] = useState([]);
    const [isFetched, setFetching] = useState(false);

    const fetchData = async () => {
        setFetching(true);
        try {
            const response = await getNotifications();
            if (response?.data?.status) {
                setData(response?.data?.notifications);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleMarkAsRead = async (id) => {
        setFetching(true);
        try {
            const response = await markNotificationAsRead(id);
            if (response?.data?.status) {
                toast.success(response?.data?.message || 'Notification marked as read');
                fetchData(); // Refresh notifications
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
            toast.error('Failed to mark notification as read');
        } finally {
            setFetching(false);
        }
    };

    const notify = (x) => (
        <div className='flex justify-between bg-white p-[16px] rounded-[6px]'>
            <div className='flex gap-[16px] items-center'>
                <img className='w-[60px] rounded-[50%]' src={notificationIcon} alt="icon"/>
                <div className='flex flex-col gap-[8px] max-w-[212px]'>
                    <h1 className='text-text text-[12px] font-[500]'>{x.message}</h1>
                    <div className='flex gap-[4px]'>
                        <img src={calenderIcon} alt="calender"/>
                        <p className='text-[#737373] text-[10px] font-[400]'>
                            {moment.utc(x.created_at).local().format('hh:mm A, dddd')}
                        </p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} onClick={() => handleMarkAsRead(x.id)}>
                <span className="cursor-pointer" title='Mark as read'>X
                    {/* <FontAwesomeIcon icon={faTimes} /> */}
                </span>
            </div>
        </div>
    );

    return (
        <>
            {isFetched ? <CustomLoader /> : (
                <div className='fixed bg-transparent top-0 left-0 right-0 bottom-0'>
                    <div className='fixed bg-transparent top-0 left-0 right-0 bottom-0' onClick={() => { props.onClose(false) }}></div>
                    <div className='fixed md:top-[120px] md:right-[20px] flex flex-col gap-[16px] max-h-[100vh] md:max-h-[80vh] overflow-y-auto p-[32px] bg-light-background w-full md:w-[511px] border border-gray-200 rounded-md shadow-md'>
                        <div className='flex justify-between'>
                            <h1>Notifications</h1>
                            <img className="cursor-pointer" src={closeIcon} alt="close" onClick={() => { props.onClose(false) }} />
                        </div>
                        {data.length === 0 ? (
                            <div className="flex justify-center items-center h-full">No Notifications</div>
                        ) : (
                            data.map((x, index) => (
                                <React.Fragment key={index}>
                                    {notify(x)}
                                </React.Fragment>
                            ))
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
