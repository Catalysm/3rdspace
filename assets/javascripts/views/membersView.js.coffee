((Thirdspace, Backbone) ->
  "use strict"

  Thirdspace.Views.Members = Backbone.View.extend(
    el: "#content"
    events:
      "click #add": "addNode"

    initialize: ->
      @collection = new Nodex.Collections.Nodes()
      @collection.fetch reset: true
      @render()
      @listenTo @collection, "add", @renderNode
      @listenTo @collection, "reset", @render

    render: ->
      @collection.each ((node) ->
        @renderNode node
      ), this

    addNode: (e) ->
      e.preventDefault()
      formData = {}
      $("#addNode div").children("input").each (i, el) ->
        formData[el.id] = $(el).val()  unless $(el).val() is ""
        $(el).val ""

      @collection.create formData

    renderNode: (item) ->
      nodeView = new Nodex.Views.Node(model: item)
      @$el.append nodeView.render().el
      @$(".lines").autosize()

  )

).call this, Thirdspace, Backbone