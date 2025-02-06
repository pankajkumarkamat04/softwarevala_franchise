import React from 'react'
import DashboardLayout from '../../components/user/DashboardLayout';
import MetaData from '../../components/MetaData';
import { Link } from 'react-router-dom';
import Loader from '../../components/user/Loader';
import { useGetAllOrderQuery } from '../../redux/api/OrderAPI';
import { useSelector } from 'react-redux';

const UserOrders = () => {
    const { user } = useSelector((state) => state.user)
    const { data, isLoading } = useGetAllOrderQuery(user._id)

    if (isLoading) {
        return <DashboardLayout>
            <MetaData pageName={"Orders"} />
            <Loader />
        </DashboardLayout>
    }

    if (data.orders.length == 0) {
        return <DashboardLayout>
            <MetaData pageName={"Orders"} />
            <div className="text-center">
                <p className="fs-1">Your Order is Empty</p>
                <p className="fw-bold">Explore More Shortlist Some Items.</p>
                <Link to={"/"}>
                    <button className="btn btn-gn rounded-0 mt-2">Back To Shop</button>
                </Link>
            </div>
        </DashboardLayout>
    }

    return (
        <DashboardLayout>
            <MetaData pageName={"Orders"} />
            <div className="container border pt-1 pb-1">
                <p className="fs-5 fw-bold">My Orders</p>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.orders.map((order, index) => (
                                <tr className="order-table">
                                    <td>{`#${index + 1}`}</td>
                                    <td>{order.createdAt.split('T')[0]}</td>
                                    <td>{order?.orderStatus}</td>
                                    <td>{`$${order.priceInfo.discountPrice || order.priceInfo.price}`}</td>
                                    <td><Link className="btn btn-gn" to={`/order/${order._id}`}>View Order</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default UserOrders