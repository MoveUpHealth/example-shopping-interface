//  Author: Jessica Tax;
//  Date: August 15, 2021

//  Description: Landing page

import React, { useState, useEffect, useRef } from "react";
import mainVid from "../images/shopping.mp4";
import timeToShop from "../images/timetoshop.jpg";
import slide1 from "../images/purse.jpg"
import slide2 from "../images/chair.jpg"
import slide3 from "../images/earbuds.jpg"
import slide4 from "../images/plates.jpg"
import slide5 from "../images/sunglasses.jpg"
import slide6 from "../images/tablet.jpg"
import slide7 from "../images/greypurse.jpg"
import slide8 from "../images/pot.jpg"
import "./styles.css";

 

function Landing (props) {

    const [slideIndex, setslideIndex] = useState(1)
    const productList = [
        {
            product_id: 1,
            product: "Red Purse",
            price: "59.99",
            img: "purse.jpg"
        },
        {
            product_id: 2,
            product: "Yellow Chair",
            price: "129.99",
            img: "chair.jpg"
        },
        {
            product_id: 3,
            product: "Earbuds",
            price: "99.99",
            img: "earbuds.jpg"
        },
        {
            product_id: 4,
            product: "Blue Plates",
            price: "79.99",
            img: "plates.jpg"
        },
        {
            product_id: 5,
            product: "Sunglasses",
            price: "49.99",
            img: "sunglasses.jpg"
        },
        {
            product_id: 6,
            product: "Tablet",
            price: "259.99",
            img: "tablet.jpg"
        },
    ]

    const incSlides = () => {
        if ((slideIndex + 3) > productList.length) {
            setslideIndex(1)
        } else {
            setslideIndex(slideIndex + 3)
        } 
    }

    const decSlides = () => {
        if ((slideIndex -3) < 1) {
            setslideIndex(productList.length -2)
        } else {
            setslideIndex(slideIndex -3)
        } 
    }

    return (
        <div className="body">
            <div className="main">
                <div className="topRow">
                    <video autoPlay loop muted>
                        <source src={mainVid} type="video/mp4"></source>
                        Your browser does not support video player.
                    </video>
                    <div className="column">
                        <div className="imgContainer">
                            <img src={timeToShop} alt="Items for sale" width="100%"/>
                            <div className="overlay">
                                <h1 className="announcement">
                                    It's time to shop!
                                </h1>
                            </div>  
                        </div>
                    </div>
                </div>
                <div className="row whiteBG">
                    <h2 className="subAnnouncement">
                        <a href="/department" className="pageLink">Shop</a> all sales!
                    </h2>
                </div>
            </div>
            <div className="row slides">
                {productList.map((slide) => {  
                    return (
                    <div className={((productList.indexOf(slide) === (slideIndex-1) || 
                        productList.indexOf(slide) === slideIndex || 
                        productList.indexOf(slide) === (slideIndex+1)) === true) ? "slide inView" : "slide"}>
                        <div className="bestImg">
                            <img className="productImg" key={slide.product_id} src={require(`../images/${slide.img}`).default} alt={"Product" + slide.product_id} />
                        </div>
                        <div className="productInfo">
                            <h3 className="productName">
                                {slide.product}
                            </h3>
                            <h3 className="productPrice">
                                {slide.price}
                            </h3>
                        </div>
                    </div>
                    )
                    }
                )}
                <a className="prev" onClick={decSlides}>&#10094;</a>
                <a className="next" onClick={incSlides}>&#10095;</a>
            </div>
            <div className="sectionTitle">
                <h2 className="title">
                    Best Sellers
                </h2>
                <h2 className="subAnnouncement">
                    Get these items while you still can!
                </h2>
            </div>
        </div>
    )
}

export default Landing;