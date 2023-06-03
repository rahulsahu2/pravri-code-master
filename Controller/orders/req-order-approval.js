import { sendMail } from "../../operations/sendMail.js";
import jwt from "jsonwebtoken";
import findParents from "../family/findParents.js";


const reqOrderApproval = (data,orderId)=>{

    const token = jwt.sign({ email: data?.user?.email, id: data?.user?.id }, process.env.JWT_SECRET_KEY, { expiresIn: "2d" })
     
    const parents = findParents(data?.user);

    const link = `${process.env.APPURL}/approve-order/${data?.user.id}/${orderId}/${token}`;
    console.log(link,data?.user?.email);
    sendMail({
        recipient:data?.user?.email,
        text: link,
        subject: "Order Approval Request",
        html:"",
    });
}

export default reqOrderApproval;