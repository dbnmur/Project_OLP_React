let Jasmine = require('jasmine');
let jasmine = new Jasmine();

// modify this line to point to your jasmine.json
jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.configureDefaultReporter({
  showColors: true
});

jasmine.onComplete(function(passed) {
  if (passed) {
    console.log('All specs have passed');
  } else {
    console.log('At least one spec has failed');
  }
});
jasmine.execute();
