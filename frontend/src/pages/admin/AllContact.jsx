import React, { useState } from 'react'
import { MDBDataTable } from "mdbreact"
import Loader from "../../components/user/Loader"
import MetaData from '../../components/MetaData'
import { useGetAllContactFormQuery } from '../../redux/api/ExtraAPI'
import ContactFormDataPopup from './ContactFormDataPopup'

const AllContact = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { data, isLoading } = useGetAllContactFormQuery()

    const [fData, setFData] = useState({
        name: "",
        email: "",
        phoneNo: "",
        message: "",
    })

    const handleOpenPopup = ({ name, email, phoneNo, message }) => {
        setFData({
            name,
            email,
            phoneNo,
            message,
        })
        return setIsPopupOpen(true);
    }
    const handleClosePopup = () => setIsPopupOpen(false);

    const contactData = {
        columns: [
            {
                label: "ID",
                field: "id",
                sort: "asc",
            },
            {
                label: "Name",
                field: "name",
                sort: "asc",
            },
            {
                label: "Email",
                field: "email",
                sort: "asc",
            },
            {
                label: "Phone No",
                field: "phoneNo",
                sort: "asc",
            },
            {
                label: "Message",
                field: "messgae",
                sort: "asc"
            },
            {
                label: "Actions",
                field: "actions",
                sort: "disabled",
            },

        ],

        rows: []
    }

    data?.result?.map((form, index) => {

        contactData?.rows.push({
            id: form._id,
            name: form?.name,
            email: form?.email?.length > 15 ? `${form?.email?.substring(0, 15)}...` : form?.email?.length,
            phoneNo: form?.phoneNo,
            messgae: form?.message,
            actions: (<>
                <button className='btn btn-success ms-2' onClick={() => handleOpenPopup({ name: form?.name, phoneNo: form?.phoneNo, email: form?.email, message: form?.message })}>
                    <i className='fa-solid fa-eye'></i>
                </button>
            </>
            ),


        })
    })


    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='container pt-2'>
            <MetaData pageName={"All Contact"} />
            <div className='d-flex justify-content-between'>
                <p className='fs-4'>All Contact</p>
            </div>
            <div className='mt-2'>
                <MDBDataTable striped bordered hover data={contactData} />
                <ContactFormDataPopup fData={fData} isOpen={isPopupOpen} onClose={handleClosePopup} />
            </div>
        </div>
    )
}

export default AllContact
