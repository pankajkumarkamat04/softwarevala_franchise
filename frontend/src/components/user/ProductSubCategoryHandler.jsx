import React from 'react'
import { useGetSubCategoryQuery } from '../../redux/api/CategoryAPI'
import { useNavigate, useSearchParams } from 'react-router-dom';

const ProductSubCategoryHandler = ({ id }) => {

    const { data, isLoading, isError, isSuccess, error } = useGetSubCategoryQuery(id)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    let clickHandler = (e) => {
        if (e.target.checked && e.target.name != undefined) {
            if (searchParams.has("subCategory")) {
                searchParams.append("subCategory", e.target.value)
            }
            else {
                searchParams.set("subCategory", e.target.value);
            }
        } else if (!e.target.checked && e.target.name != undefined) {
            searchParams.delete("subCategory", e.target.value)
        }

        const path = `${window.location.pathname}?${searchParams.toString()}`;
        navigate(path);
    }

    return (
        data?.subCategories.map((category) => (
            <div key={category.id} className='ps-3'>
                <input type="checkbox" name={category._id} onClick={(e) => clickHandler(e)} id={category._id} value={category._id} /><label className='ps-2' htmlFor={category._id}>{category.name}</label>
            </div>
        ))
    )
}

export default ProductSubCategoryHandler