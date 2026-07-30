import '../styles/Gallery.css';

function Gallery() {
    const images = [
        "/image1.JPG",
        "/image2.JPG",
        "/image3.JPG",
        "/image4.JPG",
        "/image1.JPG",
        "/image6.JPG",
        "/image7.JPG",
        "/image8.JPG",
        "/image9.JPG"
    ];

    return (
        <div className="gallery-wrapper">
            <h2 className="gallery-title">ALBUM</h2>
            <div className="gallery-grid">
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`기념사진${index + 1}`}
                        className="gallery-image"
                    />
                ))}
            </div>
        </div>
    );
}

export default Gallery;
