

const validationErrorHumanify =  (error) => {
    let errors = {};
    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
    } 
    if (error.name === "MongoError") {
   
    }
    if (error.code === 11000) { 
        errors['duplicate'] = error.message
    }else{
         errors['msg']= error.message
    }
    
      return errors;
}

module.exports = {
    validationErrorHumanify
}