// route to projects list

Router.route('/', function () {
  this.render('projects');
});

// Collection to add a membership to
Projects = new Meteor.Collection('projects');


// Schema for collection
Schemas.Projects = new SimpleSchema([Schemas.Base, {
  title: {
        type: String
    },

    description: {
        type: String,
        optional: true
    }
}])
Projects.attachSchema(Schemas.Projects);


if (Meteor.isClient) {

  // subscribe to projects
  Template.projects.onCreated(function() {
    this.subscribe('projects');
  })

  Template.projects.helpers({
    projects: function() {
      return Projects.find();
    }
  });

  Template.insertProject.helpers({
    doc: function() {
        return Meteor.userId();
    },
    docType: function() {
          return 'User';
      }
  });

  // hooks
  WSL.collection.addOwnershipBefore(Projects);

  AutoForm.hooks({
    addProjectForm: {
        onSubmit: function(insert, doc) {},
        onError: function(insert, error, template) {
            return console.log(error);
        },
        onSuccess: function(insert, doc) {
            return console.log('success', insert, doc);
        }
    }
  });
}

if (Meteor.isServer) {

  // language settings
  //WSL.i18n.setLanguage('en')

  // publish collection
  Meteor.publish('projects', function() {
      return Projects.find();
  });

  // allow settings
  Projects.allow({
    insert: function(userId, doc) {
      return true // change this to your needs
    },
    update: function(userId, doc, fields, modifier) {
      if (doc.owners.indexOf(userId) > -1) {
        return true;
      }
    },
    remove: function(userId, doc) {
      return userId === doc.owner;
    }
  });

  Meteor.startup(function () {   
    if(Projects.find().count() > 0) Projects.remove({}) 
  });
}
