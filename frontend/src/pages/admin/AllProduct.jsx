import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from "mdbreact"
import { useGetAllAdminProductQuery } from '../../redux/api/ProductAPI'
import Loader from "../../components/user/Loader"
import defalut_product_image from "../../assets/img/product-default.png"
import MetaData from '../../components/MetaData'

const AllProduct = () => {

  const navigate = useNavigate()
  const { data, isLoading, error } = useGetAllAdminProductQuery()

  const productData = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 10
      },
      {
        label: "Image",
        field: "image",
        sort: "disabled",
        width: 30
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150
      },
      {
        label: "Price",
        field: "price",
        sort: "asc",
        width: 40
      },
      {
        label: "Category",
        field: "category",
        sort: "asc"
      },
      {
        label: "Sub category",
        field: "subCategory",
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


  data?.product?.map((product, index) => {

    const imgURL = product.images.length == 0 ? defalut_product_image : `https://softwarevala.net/assets/productImage/${product?.images[0]?.filename}`

    productData?.rows.push({
      id: product._id,
      name: product.name.length > 15 ? `${product.name.substring(0, 15)}...` : product.name,
      image: (<img src={imgURL} width={"35px"} />),
      price: `$${product.price}`,
      category: product?.category?.name,
      subCategory: product?.subCategory?.name,
      actions: (<>
        <button className='btn btn-success ms-2' onClick={() => navigate(`/product/${product._id}`)}>
          <i className='fa-solid fa-eye'></i>
        </button>
      </>
      )
    })
  })


  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='container pt-2'>
      <MetaData pageName={"All Products"} />
      <div className='d-flex justify-content-between'>
        <p className='fs-4'>All Products</p>
      </div>
      <div className='mt-2'>
        <MDBDataTable striped bordered hover data={productData} />
      </div>
    </div>
  )
}

export default AllProduct
