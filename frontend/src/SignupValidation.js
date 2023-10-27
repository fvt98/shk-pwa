function Validation(values){
    alert("")
    let error = {};
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.name === " "){
        error.name = "Name schould not be empty"
    }

    if(values.username === " "){
        error.username = "Username schould not be empty"
    }

    if(values.password === " "){
        error.password = "Password should not be empty"
    }

    return error;
}

export default Validation;