export const ValidateEmail = (email) => {
  if(email.trim()){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email));
  }
    return false;
}

export const ValidatePassword = (password) => {
    if(password.trim()){
        const re = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%&*]{8,}$/;
        return re.test(String(password));
    }
    return false;
}