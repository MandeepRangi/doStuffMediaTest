define(function(require, exports, module) {
  "use strict";

  // External dependencies.
  var Backbone = require("backbone");
  var Handlebars = require('handlebars');

  // Defining the application router.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      Backbone.HomeModel = Backbone.Model.extend({
        url: 'metadata.json'
      });

      Backbone.Things = Backbone.Collection.extend({
        url: 'things.json'
      });

      Backbone.HomeView = Backbone.View.extend({
        template: Handlebars.compile($("#home-template").html()),

        render: function() {
          var templateData = {
            model: this.model.toJSON(),
            collection: this.collection.toJSON()
          }
          this.$el.html(this.template(templateData));
        }
      });

      var homeModel = new Backbone.HomeModel();

      var thingsCollection = new Backbone.Things();

      homeModel.fetch({
        success: function() {
          thingsCollection.fetch({
            success: function() {
              var homeView = new Backbone.HomeView({
                model: homeModel,
                collection: thingsCollection
              });
              $("#main").html(homeView.el);
              homeView.render();
            }
          })

        }
      });
    }
  });

  module.exports = Router;
});
