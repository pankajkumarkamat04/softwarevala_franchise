import React, { useEffect } from 'react'
import Select from 'react-select'
import Loader from '../user/Loader'
import { useGetAllPostCategoryQuery } from '../../redux/api/PostAPI'

const SelectPostCategoryHandler = ({ categoryID, parentCategory, setParentCategory, defaultCategoryName, defaultCategoryID }) => {
    const { data: CategoryData, isSuccess: CategoryisSuccess, isLoading: CategoryisLoading } = useGetAllPostCategoryQuery()



    let Categories = CategoryData?.categories.filter((category) => {
        return category.parentCategory == undefined
    })

    Categories = Categories?.filter((category) => {
        return category._id != categoryID
    })

    const parentCategoryHandler = (e) => {
        const value = e.value.split("&")
        const id = value[0]
        const name = value[1]


        setParentCategory({ ...parentCategory, id, name });
    }
    const options = []

    useEffect(() => {
        if (CategoryisSuccess) {
            Categories.map((category) => {
                options.push(
                    {
                        value: `${category._id}&${category.name}`, label: category.name
                    }
                )
            })
        }
    }, [options])


    const defaultValue = `${defaultCategoryID}&${defaultCategoryName}`

    if (CategoryisLoading) {
        return <div className="pt-3">
            <label htmlFor="" className="form-label fw-bold">
                Parent Category
            </label>
            <Loader />
        </div>
    }

    return (
        <div className="pt-3">
            <label htmlFor="" className="form-label fw-bold">
                Parent Category
            </label>
            <Select
                name='parentCategory'
                className='rounded-0'
                placeholder={"Please select parent category"}
                options={options}
                defaultValue={defaultCategoryName != undefined ? { value: defaultValue, label: defaultCategoryName } : `Please select parent category`}
                onChange={parentCategoryHandler}
            />
        </div>
    )
}

export default SelectPostCategoryHandler
