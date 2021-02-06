export function RegisterValidation(values) {
    let errors = {};
  
    if (values.name == null || !values.name.trim()) {
      errors.name = "Username Required";
    }
  
    if (values.email == null || !values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Email Address format is invalid";
    }
  
    if (values.password == null || !values.password.trim()) {
      errors.password = "Password Required";
    }

    if (!values.cPassword.trim()) {
        errors.cPassword = "Confirm Password Required";
      } else if (values.cPassword !== values.password) {
        errors.cPassword = "Password doesn't match";
      }
  
    return errors;
  }

  export function LoginValidation(values) {
    let errors = {};
  
    if (values.email == null || !values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Email Address format is invalid";
    }
  
    if (values.password == null || !values.password.trim()) {
      errors.password = "Password Required";
    }
  
    return errors;
  }