Router.map(function(){
    this.route('home', {path:'/'})
    this.route('login', {path: '/login'});
    this.route('catogary', {path:'/catogary'});
    this.route('volunteer', {path:'/volunteer'});
    this.route('gethelp', {path:'/gethelp'});
});

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook(function() {
        }, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    }
});

Template.login.autoredirect = function(){
        Router.go('catogary');
    };

  Template.header.events({
      'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        });
        Router.go('login');
    }
  });

  Template.catogary.events({
    'click #volunteer': function() {
      Router.go('volunteer');
    },
    'click #help': function() {
      Router.go('gethelp');
    }
  });

