import React, { useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import siteData from "../../utils/siteData";

const HeroSection = () => {

    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const inputHandler = (e) => {
        setSearch(e.target.value);
    }

    const searchHanlder = (e) => {
        e.preventDefault()
        searchParams.set("keyword", search)
        const path = `/search?${searchParams.toString()}`;
        navigate(path);
    }

    return (
        <>
            <section class="hero-section" style={{ background: `linear-gradient(#00000080,#00000080),url(./assets/websiteImages/bannerImage.jpeg) no-repeat 50%` }}>
                <div class="hero-content">
                    <h1 class="display-4">Welcome to {siteData.siteTitle}</h1>
                    <p class="lead">Find what you're looking for in seconds.</p>
                    <div class="mt-4">
                        <form class="d-flex justify-content-center" role="search">
                            <input onChange={(e) => inputHandler(e)} class="form-control me-2 w-50" type="search" placeholder="Search here..." aria-label="Search" />
                            <button class="btn btn-primary" type="submit" onClick={searchHanlder} >Search</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;
