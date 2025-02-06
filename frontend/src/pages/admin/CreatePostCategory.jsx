import React, { useEffect, useRef, useState } from 'react'
import toast from "react-hot-toast"
import MetaData from '../../components/MetaData'
import SelectPostCategoryHandler from '../../components/admin/SelectPostCategoryHandler'
import { useCreatePostCategoryMutation } from '../../redux/api/PostAPI'

const CreatePostCategory = () => {
    const inputRef = useRef()

    const [createCategory, { data, isLoading, isError, isSuccess, error }] = useCreatePostCategoryMutation()


    const [categoryName, setCategoryName] = useState("")
    const [categoryURL, setCategoryURL] = useState("")
    const [parentCategory, setParentCategory] = useState({
        id: "",
        name: ""
    })


    const inputHandler = (e) => {
        setCategoryName(inputRef.current.value)

    }


    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message)
            setCategoryName("")
            setCategoryURL("")
            setParentCategory({
                id: "",
                name: ""
            })
        }
        if (isError) {
            toast.error(error.data.message)
        }

    }, [isError, isSuccess])

    useEffect(() => {
        const url = categoryName.replace(/ /g, "-")
        setCategoryURL(url.toLocaleLowerCase());
    }, [inputHandler])

    const submitHandler = async (e) => {
        e.preventDefault()

        const body = {
            name: categoryName,
            url: categoryURL
        }

        if (parentCategory.id != "") {
            body.parentCategoryID = parentCategory.id
            body.parentCategory = parentCategory.name
        }


        await createCategory({ body })
    }



    return (
        <div className="container">
            <MetaData pageName={"Add New Category"} />
            <div className="row pt-md-2 pb-2 justify-content-center">
                <div className="col-md-6">
                    <p className="text-uppercase fs-4">Add New Category</p>
                    <div className="border auth-form border-1 p-3 ">
                        <form action="">
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Category Name
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="name"
                                    value={categoryName}
                                    ref={inputRef}
                                    placeholder="Please Enter Your Category Name"
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className="pt-3">
                                <label htmlFor="" className="form-label fw-bold">
                                    Category URL
                                </label>
                                <input
                                    className="form-control rounded-0"
                                    type="text"
                                    name="url"
                                    value={categoryURL}
                                    placeholder="Category URL"
                                />
                            </div>
                            <SelectPostCategoryHandler parentCategory={parentCategory} setParentCategory={setParentCategory} />
                            <div className="pt-3">
                                <button className="auth-btn bg-gn" disabled={isLoading} onClick={submitHandler}>
                                    Add New Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default CreatePostCategory
