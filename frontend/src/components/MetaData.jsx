import React from 'react'
import { Helmet } from "react-helmet";
import siteData from '../utils/siteData';

const MetaData = ({ pageName, description }) => {
    const desp = description || siteData.siteDescription
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{pageName} - {siteData.siteTitle}</title>
            <meta name="description" content={desp} />
        </Helmet>
    )
}

export default MetaData
