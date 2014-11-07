if (Meteor.isClient) {
  // counter starts at 0
  Template.link_input.events({
    'click button': function () {
      var url = document.getElementById("url").value;
      alert('url: ' + url);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
