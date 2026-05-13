import React from 'react'
import './ImageSlider.css'
import { Carousel } from 'react-bootstrap'

function ImageSlider() {
    return (
        <div className='slider'>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2020/10/5/842222/Tu-Vien-Strahov-5.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>John C. Maxwell</h3>
                        <p>Successful people understand that reading is an essential part of their journey.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="https://kenh14cdn.com/2017/2-1511319657288.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3> Ralph Waldo Emerson</h3>
                        <p>Each page in a book offers me an opportunity to learn and grow.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://png.pngtree.com/background/20211215/original/pngtree-the-background-photography-of-the-empty-library-bookstore-indoors-picture-image_1474812.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Harvey MacKay</h3>
                        <p>A person’s life changes in two ways: through the people they meet and through the books they read.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default ImageSlider
