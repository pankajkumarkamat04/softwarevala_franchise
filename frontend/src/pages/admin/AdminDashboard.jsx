import React from 'react'
import MetaData from '../../components/MetaData'
import Loader from "../../components/user/Loader"
import { useDashboardDataQuery } from '../../redux/api/AdminAPI'
import DashboardTiles from '../../components/admin/DashboardTiles'

const AdminDashboard = () => {

    const { data, isLoading, isError, error, isSuccess } = useDashboardDataQuery()

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='container'>
            <MetaData pageName={"Admin Dashboard"} />
            <p className='fs-3'>Dashboard</p>
            <div className='row justify-content-between'>
                <DashboardTiles name={"Pending Order"} number={data?.pendingOrders} />
                <DashboardTiles name={"Total Order"} number={data?.totalOrders} />
                <DashboardTiles name={"Users"} number={data?.totalUsers} />
                <DashboardTiles name={"Franchise"} number={data?.totalFranchises} />
                <DashboardTiles name={"Reseller"} number={data?.totalResellers} />
            </div>
        </div >
    )

}

export default AdminDashboard