import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ProductPagination = ({ data }) => {
    const [searchParams] = useSearchParams()

    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
    const [maxPageNumbers, setMaxPageNumbers] = useState(7);
    const navigate = useNavigate()

    const totalPages = data?.totalPages

    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = startPage + maxPageNumbers - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }
    const onPageChange = (currentPage) => {

        if (searchParams.has("page")) {
            searchParams.set("page", currentPage)
        } else {
            searchParams.append("page", currentPage)
        }

        setCurrentPage(currentPage)

        const path = `${window.location.pathname}?${searchParams.toString()}`;
        navigate(path);
    };

    // Handle next page
    const onNextPage = () => {
        setCurrentPage(currentPage + 1)
        if (searchParams.has("page")) {
            searchParams.set("page", currentPage + 1)
        } else {
            searchParams.append("page", currentPage + 1)
        }

        const path = `${window.location.pathname}?${searchParams.toString()}`;
        navigate(path);
    };

    // Handle previous page
    const onPrevPage = () => {
        setCurrentPage(currentPage - 1)
        if (searchParams.has("page")) {
            searchParams.set("page", currentPage - 1)
        } else {
            searchParams.append("page", currentPage - 1)
        }
        const path = `${window.location.pathname}?${searchParams.toString()}`;
        navigate(path);
    };


    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={currentPage === number ? 'active' : ''}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default ProductPagination;
