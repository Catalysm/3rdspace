((Thirdspace, Backbone) ->
  "use strict"

Thirdspace.Views.Member = Backbone.View.extend(
    className: "memberContainer"
    
    template: _.template("""
      <h3 class='memberLabel'><%- member.name.first + " " + member.name.last %></h3>
      <a href='mailto:<%- member.email %>'><%- member.email %></a>

    """)
    
    events:
      "click #checkInMember": "checkInMember"

    initialize: ->
      @listenTo @model, "change", @render

    render: ->
      @$el.html @template(@model.toJSON())
      $(".lines").autosize()
      @$("textarea").focus()
      this

    checkInMember: ->
      @model.save @model.type -= 1

  )

).call this, Thirdspace, Backbone