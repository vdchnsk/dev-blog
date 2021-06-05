import Cryptr from "cryptr"

export class Crypter  {
    constructor(){
        this.cryptr = new Cryptr(process.env.PSWD_HASHING_CODE);
    }
    encrypt(value){
        const crypted_value = this.cryptr.encrypt(value)
        return crypted_value
    }
    decrypt(value){
        const crypted_value = this.cryptr.decrypt(value)
        return crypted_value
    }
    compare(uncripted, encrypted){
        const crypted_value = this.cryptr.encrypt(uncripted)
        if (crypted_value == encrypted){
            return true
        }else{
            return true
        }
    }
}