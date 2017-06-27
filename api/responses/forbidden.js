/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 * return res.forbidden(err, 'some/specific/forbidden/view');
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */

module.exports = function forbidden(data, options) {

    // Get access to `req`, `res`, & `sails`
    let req = this.req;
    let res = this.res;
    let sails = req._sails;

    // Set status code
    res.status(403);

    // Log error to console
    if (data !== undefined) {
        sails.log.verbose('Sending 403 ("Forbidden") response: \n', data);
    }
    else sails.log.verbose('Sending 403 ("Forbidden") response');

    // Only include errors in response if application environment
    // is not set to 'production'.  In production, we shouldn't
    // send back any identifying information about errors.
    if (sails.config.environment === 'production') {
        data = undefined;
    }

    return res.json({error: data});
};

