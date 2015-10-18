var Rsync = require('rsync');

var plugins = require(process.cwd() + '/app/services/plugins');
var config  = plugins.require('config');
var log     = plugins.require('services/log')(module);

function sync(event) {
    var listener = this;
    var opts = {};

    // Resolve any functions in the settings.
    for (var key in listener) {
        opts[key] = config.resolve(listener, key, listener);
    }

    log.info("Starting rsync", opts);
    var cmd = Rsync.build(opts);
    cmd.execute(function(error, stdout, stderr) {
        if (error) {
            log.error("Error running rsync", opts, error);
        }
        log.info("Rsync complete", opts);
    });
}

module.exports = function(hooks, app) {
    var listeners = config.get('rsync.listeners');
    if (!listeners) {
        log.error("Rsync requires a configuration file with a listeners array.");
        return;
    }

    listeners.forEach(function(listener) {
        hooks.on(listener.event, sync.bind(listener));
    });

};
