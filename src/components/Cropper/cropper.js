import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const CropperImage = ({ image, setFile }) => {

    const [cropData, setCropData] = useState(null);
    const cropperRef = createRef();


    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas();
            if (croppedCanvas) {
                // Chuyển đổi canvas thành Base64 URL và hiển thị hình ảnh đã crop
                const cropDataURL = croppedCanvas.toDataURL();
                setCropData(cropDataURL);

                // Chuyển đổi canvas thành Blob để lưu thành tệp
                croppedCanvas.toBlob((blob) => {
                    // Tạo file từ Blob
                    const file = new File([blob], "cropped_image.png", { type: "image/png" });
                    setFile(file); // Gửi file đã cắt cho setFile
                }, "image/png");
            }
        }
    };

    return (
        <div className="col-12 d-flex-column justify-content-between">
            <div className="d-flex justify-content-between" style={{ height: 400 }}>
                <div className="me-2" style={{ flex: 1 }}>
                    <Cropper
                        ref={cropperRef}
                        style={{ height: "100%", width: "100%" }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        guides={true}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    {cropData ? (
                        <div style={{ flex: 1 }}>
                            <img
                                style={{ height: "auto", maxHeight: "400px", width: "auto", maxWidth: "100%" }}
                                src={cropData}
                                alt="Cropped"
                            />
                        </div>
                    ) : ""}
                </div>

            </div>

            <button onClick={getCropData} className="my-2">
                Crop Image
            </button>
        </div>


    );
};

export default CropperImage;
