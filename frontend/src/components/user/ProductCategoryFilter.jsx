import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetAllCategoryQuery } from '../../redux/api/CategoryAPI';
import Loader from "./Loader"
import ProductSubCategoryHandler from './ProductSubCategoryHandler';

const ProductCategoryFilter = () => {
    const { data, isLoading, isSuccess } = useGetAllCategoryQuery()
    const [parentCategories, setParentCategories] = useState([])
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()


    useEffect(() => {

        if (isSuccess) {
            data?.categories?.map((category) => {
                if (category?.parentCategory == undefined) {
                    setParentCategories(parentCategories => [...parentCategories, { name: category.name, id: category._id }])
                }
            })

        }

    }, [isSuccess])

    let clickHandler = (e) => {
        if (e.target.checked && e.target.name != undefined) {

            if (searchParams.has("category")) {
                searchParams.append("category", e.target.value)
            }
            else {
                searchParams.set("category", e.target.value);
            }
        } else if (!e.target.checked && e.target.name != undefined) {
            searchParams.delete("category", e.target.value)
        }

        const path = `${window.location.pathname}?${searchParams.toString()}`;
        navigate(path);
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="p-2">
            <Link
                className="fliter-btn"
                data-bs-toggle="collapse"
                to="#filter-category"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
            >
                <p className="mb-1">Category</p> <i class="fa-solid fa-caret-down"></i>
            </Link>
            <div class="collapse " id="filter-category">
                {parentCategories?.map((category) => (
                    <div key={category.name} >
                        <input type="checkbox" onClick={(e) => clickHandler(e)} value={category.id} name={category.id} id={category.id} /><label className='ps-2' htmlFor={category.id}>{category.name}</label>
                        <ProductSubCategoryHandler id={category?.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductCategoryFilter