Links = new Mongo.Collection("links");

if (Meteor.isClient) {
  Template.body.helpers({
    links: function () {
      return Links.find({}, { sort: { createdAt: -1 } });
    }
  });

  Template.link_input.events({
    'click button': function () {
      var url = document.getElementById("url").value;
      
      Meteor.call("addLink", url);

      document.getElementById("url").value = 'fuckin done right!';

      return false;
    }    
  });

  Template.link.events({
    'click button': function() {
      Meteor.call("removeLink", this._id);
    }
  })

  Template.link_list.events({

  });
}

if (Meteor.isServer) {
  Meteor.methods({
    addLink: function (url) {
      Links.insert({
        url: url,
        createdAt: new Date()
      });
    },
    removeLink: function (id) {
      Links.remove(id);
    }
  })
}
