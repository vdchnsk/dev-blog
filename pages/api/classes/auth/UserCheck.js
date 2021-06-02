
export class UserCheck {
    constructor( userData){
        this.userData = userData
    }
    async checkGoogleCaptcha(token){
        const secretCode = process.env.RECAPTCHA_KEY_SECRET
        const responce = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretCode}&response=${token}`, {
            method:"POST",
        })
        const data = await responce.json()
        return data.success
    }
}