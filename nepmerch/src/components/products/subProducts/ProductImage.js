import React,{useState, useEffect} from 'react'
import ImageGallery from 'react-image-gallery'

function ProductImage(props) {
    
    const [Images, setImages] = useState([])
    useEffect(() => {
        let images = []
       if ( props.detail.images && props.detail.images.length > 0 ){
            props.detail.images.map((image) =>   { images.push({
                original : `http://localhost:5000/uploads/${image}`,
                thumbnail : `http://localhost:5000/uploads/${image}`
            }) } )
        }

        setImages(images)
    }, [props.detail])
    return (
        <div>
          <ImageGallery items = {Images} /> 
        </div>
    )
}

export default ProductImage
