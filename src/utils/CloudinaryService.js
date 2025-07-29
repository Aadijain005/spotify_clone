import { Cloudinary as CoreCloudinary, Util } from "cloudinary-core";

export const url = (publicId, options) => {
    try {
        const scOptions = Util.withSnakeCaseKeys(options);
        const cl = CoreCloudinary.new();
        return cl.url(publicId, scOptions);
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const openUploadWidget = (options, callback) => {
    if (window.cloudinary && window.cloudinary.openUploadWidget) {
        return window.cloudinary.openUploadWidget(options, callback);
    } else {
        console.error("Cloudinary upload widget is not loaded.");
        return null;
    }
};