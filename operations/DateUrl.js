
export const DataUrl = (files) => {
    return new Promise((resolve, reject) => {
        const file = files[0];

            var reader = new FileReader();
            reader.readAsDataURL(file);
            
            reader.onload = function () {
                resolve(reader.result);
            };
            
            reader.onerror = function () {
                reject(reader.error);
            };
    });
}
