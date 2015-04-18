Router.map(function(){
    this.route('home', {path:'/'})
    this.route('login', {path: '/login'});
    this.route('category', {path:'/category'});
    this.route('volunteer', {path:'/volunteer'});
    this.route('gethelp', {path:'/gethelp'});
});

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
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
        Router.go('category');
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


  WebFontConfig = {
    google: { families: [ 'Montserrat:400,700,900,400' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

VolunteerPosts = new Mongo.Collection("volunteerposts");
Template.listing.helpers({
    datas: function () {
      return VolunteerPosts.find();
    }
  });

