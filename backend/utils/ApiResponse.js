// Standard api response format 
const ApiResponse = {
    success: (data = null, message = 'Success') => ({
      success: true,
      data,
      message,
    }),
  
    error: (message = 'Internal Server Error') => ({
      success: false,
      error: {
        message,
      },
    }),
  
    validationError: (validationResult) => {
      const errorsArray = validationResult.array();
  
      return {
        success: false,
        error: {
          message: 'Validation Error',
          details: errorsArray.map((error) => ({
            param: error.param,
            msg: error.msg,
            value: error.value,
          })),
        },
      };
    },
  
    customError: (message, statusCode = 500) => ({
      success: false,
      error: {
        message,
      },
      statusCode,
    }),
  };
  
  module.exports = ApiResponse;