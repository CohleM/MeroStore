import React from 'react'
import { Carousel } from 'antd';

function ImageSlider(props) {
   //const image = props.images[0]; 
   console.log(props)
    
    return (
        <div>
{/* 
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }}
                            src={`http://localhost:5000/uploads/${image}`} alt="productImage" />
                    </div>
                ))}
            </Carousel> */}

            {/* add some sliding design or some image preview */}

            <div> 
                <img  style = {{ width : '100%', maxHeight : '150px'}}src={`http://localhost:5000/uploads/1595252133213_wallpaperflare.com_wallpaper (5).jpg`} alt="productImage" />
            </div>
        
        </div>
    )
}

export default ImageSlider