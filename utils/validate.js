
export const validateEmail = (email)=>{
    let patt = new RegExp(/^[a-zA-Z]+\.?\d*\.?\w*\.?@\w+\.\w+(\.\w+)?$/g)
    if(!patt.test(email.trim())){
        return false
    }
    return true
}

export const validatePhone = (phoneNumber)=>{
    let patt = new RegExp(/^\+?251\d{9}$|^0\d{9}$/g)
    if(!patt.test(phoneNumber.trim())){
        return false
    }
    return true
}

export const validateName = (name)=>{
    let patt = new RegExp(/^[a-zA-Z\s]+$|^[\u1200-\u135A]+$/g)
    if(!patt.test(name.trim())||name.trim().length<3){
        return false
    }
        return true
}

export const validatePassword = (password)=>{
    if(password.length<8){
        return false
    }
    return true
}