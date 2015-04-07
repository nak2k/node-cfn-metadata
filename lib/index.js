var AWS = require('aws-sdk');
var cfnTags = require('ec2-cfn-tags');

module.exports = describeMetadata;

function describeMetadata(callback) {
  cfnTags(function(err, tags) {
    if (err) {
      return callback(err);
    }

    var cloudformation = new AWS.CloudFormation();

    var params = {
      StackName: tags.stackId,
      LogicalResourceId: tags.logicalId,
    };

    cloudformation.describeStackResource(params, function(err, data) {
      if (err) {
        return callback(err);
      }

      var metadata;
      try {
        metadata = JSON.parse(data.StackResourceDetail.Metadata);
      } catch(e) {
        return callback(e);
      }

      callback(null, metadata);
    });
  });
}
