window.ContentdishCore = CC = {}

# Entry
do ->
  getPrimaryValues = (entry, scope) ->
    scopings = entry.relations.getScopings()
    a = []
    for scoping in scopings
      if (scoping.relations.getScope() is scope) and scoping.relations.getField().getField('primary')
        a.push(scoping.relations.getValue())
    a

  getFieldKeyValueAssociations = (entry, scope) ->
    scopings = entry.relations.getScopings()
    o = {}
    for scoping in scopings
      if scoping.relations.getScope() is scope
        console.log scoping.relations.getField()
        o[scoping.relations.getField().getField('key')] = scoping.relations.getValue()
    o

  getValue = (entry, scope, field) ->
    scopings = entry.relations.getScopings()
    actual_scope = getActualScope(entry, scope, field)
    for scoping in scopings
      if scoping.relations.getScope() is actual_scope and scoping.relations.getField() is field
        return scoping.relations.getValue()

  getActualScope = (entry, scope, field) ->
    scopings = entry.relations.getScopings()
    last_scope = scope
    while true
      for scoping in scopings
        return last_scope if scoping.relations.getScope() is last_scope and scoping.relations.getField() is field
      last_scope = last_scope.relations.getFallbackScope()
      return null if !last_scope

  getPrimaryFieldsContent = (entry, scope) ->
    fields = CC.Collection.getPrimaryFields entry.relations.getCollection()
    a = []
    for field in fields
      a.push getContent(entry, scope, field)
    a

  getContent = (entry, scope, field) ->
    value = getValue(entry, scope, field)
    value?.getField('content') || null


  CC.Entry = {
    getPrimaryFieldsContent: getPrimaryFieldsContent
    getPrimaryValues: getPrimaryValues
    getFieldKeyValueAssociations: getFieldKeyValueAssociations
    getContent: getContent
    getValue: getValue
    getActualScope: getActualScope
  }

# Collection
do ->
  getPrimaryFields = (collection) ->
    fields = collection.relations.getFields()
    a = []
    for field in fields
      a.push(field) if field.getField('primary')
    a

  CC.Collection = {
    getPrimaryFields: getPrimaryFields
  }

# Field
do ->
  getFallbackScoping = (scoping) ->
    scope = scoping.relations.getScope()


  CC.Field = {

  }
