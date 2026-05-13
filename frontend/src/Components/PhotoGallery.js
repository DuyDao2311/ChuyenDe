import React from 'react'
import './PhotoGallery.css'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from "react-router-dom";
function PhotoGallery() {
    return (
        <div className='photogallery-container'>
            <h1 className='photogallery-title'>Photo Gallery</h1>
            <div className="photogallery-images">
                <img src="https://file.hstatic.net/200000123069/article/clean_minimal_cover_book_4x6_vol_584-r_332df1d090c7407cbcdc99d5e8fed962_1024x1024.jpg" alt=''/>
                <img src="https://static.tramdoc.vn/image/img.media/D%E1%BB%8Bu/B%C3%A0i%20t%E1%BB%95ng%20h%E1%BB%A3p/Th%C3%A1ng%2011/35%20cu%E1%BB%91n%20s%C3%A1ch%20tri%E1%BA%BFt%20h%E1%BB%8Dc%20hay%20nh%E1%BA%A5t/35%20cu%E1%BB%91n%20s%C3%A1ch%20tri%E1%BA%BFt%20h%E1%BB%8Dc%20hay%20nh%E1%BA%A5t%203.jpg" alt=''/>
                <img src="https://pacebooks.pace.edu.vn/Uploads/PACE_BOOKS/2023/1/6/trithuccuachungtavengoaigioithumbnailpng.png" alt=''/>
                <img src="https://simg.zalopay.com.vn/zlp-website/assets/nghe_doc_truyen_dem_khuya_tieu_thuyet_Anna_Karenina_radio_online_1_d80c0b14b9.jpg" alt=''/>
                <img src="https://bookmedi.vn/image/gallery/Hinh%20blog/sach-tieu-thuyet-tieng-anh-lord-of-the-flies.jpg" alt=''/>
                <img src="https://vaic.edu.vn/wp-content/uploads/2024/04/number-the-stars.png" alt=''/>
                <img src="https://product.hstatic.net/200000122283/product/100-triet-gia-tieu-bieu-the-ky-xx-3h2w9_f315115e7b344380a2ae920d386ab589_grande.png" alt=''/>
                <img src="https://i.ex-cdn.com/mientay.giadinhonline.vn/files/content/2021/09/18/275-1113.jpg" alt=''/>
                <img src="https://audio-books-spaces-bucket.sgp1.digitaloceanspaces.com/audio-books/1be102ea3a5e2163499c0fb23211011ab6.jpg" alt=''/>
            </div>
           <Link to="/books">
        <button> VIEW MORE <ArrowForwardIosIcon style={{ fontSize: 20 }} />
        </button>
    </Link>
</div>
    )
}
export default PhotoGallery