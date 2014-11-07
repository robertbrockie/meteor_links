Links = new Mongo.Collection("links");

if (Meteor.isClient) {
  Template.body.helpers({
    links: function () {
      return Links.find({}, { sort: { createdAt: -1 } });
    }
  });

  Template.link_input.events({
    'click button': function () {
      
      // get the url we want to save
      var url = $("#url").val();

      // add url
      Meteor.call("addLink", url, function(error, result) {
        // callback for the server to update the name of the website
        Meteor.call("updateLinkTitle", result, url);
      });

      // clear input
      $("#url").val('');

      return false;
    }    
  });

  Template.link.events({
    'click button': function() {
      Meteor.call("removeLink", this._id);
    }
  })
}

if (Meteor.isServer) {
  Meteor.methods({
    addLink: function (url) {
      var link = Links.insert({
        url: url,
        title: '', // we don't know the title yet
        createdAt: new Date()
      });

      return link;
    },
    removeLink: function (id) {
      Links.remove(id);
    },
    updateLinkTitle: function (linkId, url) {
      $ = cheerio.load(HTTP.get(url).content);
      var title = $('title')
      Links.update(linkId, { $set: { title: title.text() } });
    }
  });
}
