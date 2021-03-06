/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 * return res.badRequest(data, 'some/specific/badRequest/view');
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

module.exports = function badRequest(data, details) {

    // Get access to `req`, `res`, & `sails`
    let req = this.req;
    let res = this.res;
    let sails = req._sails;

    details = details || null;

    // Set status code
    res.status(400);

    // Log error to console
    if (data !== undefined) {
        sails.log.verbose('Sending 400 ("Bad Request") response: \n', data);
    }
    else sails.log.verbose('Sending 400 ("Bad Request") response');

    // Only include errors in response if application environment
    // is not set to 'production'.  In production, we shouldn't
    // send back any identifying information about errors.
    if (sails.config.environment === 'production' && typeof data !== 'string') {
        data = undefined;
    }

    return res.json({error: data, details: details});
};
