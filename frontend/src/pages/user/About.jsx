import React from 'react'
import Breadcrumb from '../../components/user/Breadcrumb'
import MetaData from '../../components/MetaData'
import siteData from '../../utils/siteData'

const About = () => {
    return (
        <div>
            <MetaData pageName={"About"} />
            <Breadcrumb
                breadcrumbTitle={"About"}
                breadcrumbLink1Text={"About"}
                breadcrumbLink1={"/about"}
            />
            <div className='container'>
                <div className='row py-2 align-items-center justify-content-between'>
                    <div className="col-md-6">
                        <img className='pe-3 img-fluid' src="https://img.freepik.com/free-vector/isometric-cms-concept_23-2148807389.jpg" alt="" />
                    </div>
                    <div className="col-md-6">
                        <div dangerouslySetInnerHTML={{ __html: siteData.siteAbout }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About