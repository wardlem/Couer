const R = require('ramda');
const Future = require('fluture');

const Pipeline = require('./Pipeline');
const {matchPath, trimTrailingSlash} = require('couer-util');

const methods = module.exports = function methods(methods, route, action) {
    if (route !== '/' && R.last(route) === '/') {
        route = R.init(route);
    }
    methods = methods.map((m) => m.toUpperCase());
    return (req, res) => {
        const reqmethod = req.method.toUpperCase();
        const methodMatches = methods.reduce((matches, method) => matches || method === reqmethod || method === '*', false);
        if (!methodMatches) {
            return Pipeline.next(req, res);
        }

        const match = matchPath(route, trimTrailingSlash(req.resource));
        if (R.isNil(match)) {
            return Pipeline.next(req, res);
        }

        return action(
            req.update({
                params: R.merge(req.params, match),
            }),
            res
        ).chain(continuation => continuation.isdone ? Future.of(continuation) : Pipeline.next(req, res));
    };
};

Object.assign(methods, {
    all: (route, action) => methods(['*'], route, action),
    get: (route, action) => methods(['GET', 'HEAD'], route, action),
    head: (route, action) => methods(['HEAD'], route, action),
    post: (route, action) => methods(['POST'], route, action),
    put: (route, action) => methods(['PUT'], route, action),
    patch: (route, action) => methods(['PATCH'], route, action),
    'delete': (route, action) => methods(['DELETE'], route, action),
});
