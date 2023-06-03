import { conn1 } from "../../Db/Db.js";
import { findUserType } from "../family/findUserType.js";
import { getInvoicesCountsForUser, getInvoicesCountsForAdmin, getInvoicesCountsForSuper, getInvoicesCountsForMaster } from "./counters/master/getCounts.js";



export const countInvoices = async (req, res) => {

    try {
        if (await findUserType(req.params.userId) === "user") {
            getCounterDataForUser(req, res);
        } else if (await findUserType(req.params.userId) === "admin") {
            getCounterDataForAdmin(req, res);
        } else if (await findUserType(req.params.userId) === "super") {
            getCounterDataForSuper(req, res);
        } else if (await findUserType(req.params.userId) === "master") {
            getCounterDataForMaster(req, res);
        }else if(await findUserType(req.params.userId) === "t"){
            getCounterDataForAssociate(req,res);
        }
    } catch (err) {
        res.json({ success: false, data: err })
    }

}


const getCounterDataForUser = async (req, res) => {
    try {
        const recievedAmount = await getInvoicesCountsForUser(req.params.userId, "recieved");
        const draftedAmount = await getInvoicesCountsForUser(req.params.userId, "drafted");
        const pendingAmount = await getInvoicesCountsForUser(req.params.userId, "pending");
        let amounts = { recievedAmount, draftedAmount, pendingAmount };
        res.json({ success: true, data: amounts });

    } catch (err) {
        res.json({ success: false, data: err });
    }
}


const getCounterDataForAdmin = async (req, res) => {
    try {
        const recievedAmount = await getInvoicesCountsForAdmin(req.params.userId, "recieved");
        const draftedAmount = await getInvoicesCountsForAdmin(req.params.userId, "drafted");
        const pendingAmount = await getInvoicesCountsForAdmin(req.params.userId, "pending");
        const amounts = { recievedAmount, draftedAmount, pendingAmount };
        res.json({ success: false, data: amounts })
        return amounts;
    } catch (err) {
        res.json({ success: false, data: err });
    }
}

const getCounterDataForAssociate = async(req,res)=>{
    try {
        const recievedAmount = await getInvoicesCountsForAdmin(req.params.userId, "recieved");
        const draftedAmount = await getInvoicesCountsForAdmin(req.params.userId, "drafted");
        const pendingAmount = await getInvoicesCountsForAdmin(req.params.userId, "pending");
        const amounts = { recievedAmount, draftedAmount, pendingAmount };
        res.json({ success: false, data: amounts })
        return amounts;
    } catch (err) {
        res.json({ success: false, data: err });
    }
}


const getCounterDataForSuper = async (req, res) => {
    try {
        const recievedAmount = await getInvoicesCountsForSuper(req.params.userId, "recieved");
        const draftedAmount = await getInvoicesCountsForSuper(req.params.userId, "drafted");
        const pendingAmount = await getInvoicesCountsForSuper(req.params.userId, "pending");
        const amounts = { recievedAmount, draftedAmount, pendingAmount };
        res.json({ success: true, data: amounts })
        return amounts;
    } catch (err) {
        res.json({ success: false, data: err });
    }
}

const getCounterDataForMaster = async (req, res) => {
    try {
        const recievedAmount = await getInvoicesCountsForMaster(req.params.userId, "recieved");
        const draftedAmount = await getInvoicesCountsForMaster(req.params.userId, "drafted");
        const pendingAmount = await getInvoicesCountsForMaster(req.params.userId, "pending");
        const amounts = { recievedAmount, draftedAmount, pendingAmount };
        res.json({ success: true, data: amounts })
        return amounts;
    } catch (err) {
        res.json({ success: false, data: err });
    }
}