var cfnMetadata = require('..');

cfnMetadata(function(err, metadata) {
  if (err) {
    throw err;
  }

  console.log(metadata);
});
