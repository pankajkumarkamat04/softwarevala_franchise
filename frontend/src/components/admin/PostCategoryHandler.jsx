import React, { useEffect } from 'react'
import { useGetAllPostCategoryQuery, useLazyGetPostSubCategoryQuery } from '../../redux/api/PostAPI'


const PostCategoryHandler = ({ category, subCat, setCategory, setSubCat, defaultCategoryName, defaultCategoryID, defaultSubCategoryName, defaultSubCategoryID }) => {

    const [subCategory, { data: subCategoryData, isSuccess: subCategoryIsSuucess, isError: subCategoryIsError, error: subCategoryError }] = useLazyGetPostSubCategoryQuery()
    const { data: CategoryData, isSuccess: CategoryisSuccess } = useGetAllPostCategoryQuery()



    let Categories = CategoryData?.categories.filter((category) => {
        return category.parentCategory == undefined
    })


    useEffect(() => {
        subCategory(defaultCategoryID)
    }, [])

    const categoryHandler = async (e) => {
        const value = e.target.value.split("&")
        const id = value[0]
        const name = value[1]

        await subCategory(id)
        setCategory({ ...category, id, name })
        setSubCat({ ...subCat, id: "", name: "" })

    }
    const subCategoryHandler = async (e) => {
        const value = e.target.value.split("&")
        const id = value[0]
        const name = value[1]

        setSubCat({ ...subCat, id, name })
    }

    return (
        <>
            <div className="pt-3">
                <label htmlFor="" className="form-label fw-bold">
                    Category<sup className='required'>*</sup>
                </label>
                <select
                    className="form-control rounded-0"
                    name="category"
                    placeholder="Please Select Parent Category"
                    defaultValue={defaultCategoryName != undefined ? defaultCategoryName : `Select Parent Category`}
                    onChange={(e) => categoryHandler(e)}
                >
                    {
                        Categories?.map((category) => (
                            <option key={category._id} value={`${category._id}&${category?.name}`}>{category?.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="pt-3">
                <label htmlFor="" className="form-label fw-bold">
                    Sub category
                </label>
                <select
                    className="form-control rounded-0"
                    name="subCategory"
                    placeholder="Please Select Parent Category"
                    defaultValue={defaultSubCategoryName != undefined ? defaultSubCategoryName : `Select Sub category`}
                    onChange={(e) => subCategoryHandler(e)}
                >
                    {
                        subCategoryData?.subCategories?.map((category) => (
                            <option key={category._id} value={`${category._id}&${category?.name}`}>{category?.name}</option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}

export default PostCategoryHandler
