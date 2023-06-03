import { findSuperParent } from "../../Controller/family/findSuperParent.js";
import { makeSalt } from "../makeSalt.js";

export const convertDataFromAssociateForUser = async({data,acc}) => {

    const pass =await makeSalt(data.password);

    const obj = {
        fullname: data.fullName,
        role: JSON.stringify({userlevel:"user"}),
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
            pinCode:data.SpinCode,
            street:data.SshippingAddress
        }),
        password:pass,
        profileImg:data.profileImg,
        associateParentId:acc.id,
        others:JSON.stringify({companyType:data.companyType,placeOfSupply:data.placeOfSupply}),
        status:"approved",
        active:1,
        merchantId:"",
        verified:true,
        parents:"",
        isVendor:data.role.toLowerCase() === "vendor" ? true : false
    };
    return obj;
}