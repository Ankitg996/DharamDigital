const isValidBody = function (value) {
    if(typeof value === 'undefined' || typeof value === null)return false
    if(typeof value ==='string' && value.trim().length ===0) return false
    if(typeof value ==='number' && value.toString().trim().length ===0) return false
    return true
}

const isValidPhone = function (value) {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(value)
};

const isValidGender = function (value) {
    if (['Male', 'Female', 'LGBTQ'].includes(value)) return true;
    return false;
}

const isValidEmail = function (value) {
    const regex = /^([a-zA-Z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/
    return regex.test(value)
};

const isValidPassword  = function (value) {
    const regex = /^[0-9a-zA-Z!@#$%&*]{8,15}$/;
    return regex.test(value)
};

const isValidSToken = function (value){
    const regex = /^[0-9]{5}$/ ;
    return regex.test(value)
}

const isValidUrl = function (value) {
    const regex = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
    return regex.test(value)
}

const isValidRatioPercentage = function (value) {
    const regex = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/
    return regex.test(value)
}

export {isValidBody, isValidEmail, isValidGender, isValidPassword, isValidPhone, isValidSToken, isValidUrl, isValidRatioPercentage}