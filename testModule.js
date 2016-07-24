

const Jasmine = require('jasmine'),
    jasmine = new Jasmine(),
    SpecReporter = require('jasmine-spec-reporter');

jasmine.addReporter(new SpecReporter());

jasmine.loadConfig({
    spec_dir: '/',
    spec_files: [
        "spec.js"
    ],
    helpers: [
        'node_modules/babel-core/register.js'
    ]
});


jasmine.execute();