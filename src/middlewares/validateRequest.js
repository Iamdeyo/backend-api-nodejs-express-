const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      // Validate request body
      if (schema.body) {
        const bodyValue = await schema.body.validateAsync(req.body);
        if (!req.value) {
          req.value = {};
        }
        req.value.body = bodyValue;
      }

      // Validate query parameters
      if (schema.query) {
        const queryValue = await schema.query.validateAsync(req.query);
        if (!req.value) {
          req.value = {};
        }
        req.value.query = queryValue;
      }

      // Validate route parameters
      if (schema.params) {
        const paramsValue = await schema.params.validateAsync(req.params);
        if (!req.value) {
          req.value = {};
        }
        req.value.params = paramsValue;
      }
      return next();
    } catch (err) {
      return res.status(400).json({
        error: err.details[0].message,
      });
    }
  };
};

export default validateRequest;
