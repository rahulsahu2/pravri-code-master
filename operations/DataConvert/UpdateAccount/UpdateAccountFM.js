
export const convertDataFromMasterForAccountUpdate = async(data,acc) => {


    console.log(data);

    const obj = {
        fullname: data.fullName,
        role: JSON.stringify({userlevel:data.role.toLowerCase()}),
        title: data.companyName,
        email: data.email,
        username: data.username,
        mobile: data.phone,
        businessGst: data.gstin,
        permissions: JSON.stringify({
            crm: data.crm,
            emailApproval: data.emailApproval,
            reports: data.reports,
            logs: data.logs,
            products: data.productStatus,
            vendors: data.vendorStatus,
            associates: data.associates,
            billings: data.billings,
            orders: data.orders,
            import: data.import,
        }),
        billingAddress:JSON.stringify({
            attention:data.attention,
            country:data.country,
            city:data.city,
            state:data.state,
            pinCode:data.pinCode,
            street:data.billingAddress
        }),
        shippingAddress:JSON.stringify({
            attention:data.Sattention,
            country:data.Scountry,
            city:data.Scity,
            state:data.Sstate,
            pinCode:data.pinCode,
            street:data.SshippingAddress
        }),
        password:data.password,
        profileImg:data.profileImg,
        others:JSON.stringify({companyType:data.companyType,placeOfSupply:data.placeOfSupply})
    };
    return obj;
}