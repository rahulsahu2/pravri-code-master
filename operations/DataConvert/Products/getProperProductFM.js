
export const getProperProductFM = ({ data, accId }) => {
    try {
        const obj = {
            name: data.name,
            description: data.description,
            category: data.category,
            brand: data.brand,
            price: data.price,
            offeredPrice: data.offeredPrice,
            shippingFee: data.shippingFee,
            discount:data.price - data.offeredPrice,
            alt:data.alt || "",
            tax: data.tax,
            tags: data.tags,
            size: data.size,
            color: data.color,
            stock: data.stock,
            weight: data.weight,
            images: JSON.stringify([data.image1, data.image2, data.image3, data.image4]),
            publishedBy: accId,
        }
        return obj;
    } catch (err) {
        return err;
    }

}

