import { mailSender } from "../utils/oauthAuthenticator.js"


export const registerController = async (req, res) => {
    const { email } = req.body;
    if(!email){
        return res.status(400).json({
            message: "Email is required",
        });
    }
    try {
        await mailSender(email);
        return res.status(200).json({
            message: "Email sent",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}