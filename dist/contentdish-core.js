var CC;

window.ContentdishCore = CC = {};

(function() {
  var getActualScope, getContent, getFieldKeyValueAssociations, getPrimaryFieldsContent, getPrimaryValues, getValue;
  getPrimaryValues = function(entry, scope) {
    var a, i, len, scoping, scopings;
    scopings = entry.relations.getScopings();
    a = [];
    for (i = 0, len = scopings.length; i < len; i++) {
      scoping = scopings[i];
      if ((scoping.relations.getScope() === scope) && scoping.relations.getField().getField('primary')) {
        a.push(scoping.relations.getValue());
      }
    }
    return a;
  };
  getFieldKeyValueAssociations = function(entry, scope) {
    var i, len, o, scoping, scopings;
    scopings = entry.relations.getScopings();
    o = {};
    for (i = 0, len = scopings.length; i < len; i++) {
      scoping = scopings[i];
      if (scoping.relations.getScope() === scope) {
        console.log(scoping.relations.getField());
        o[scoping.relations.getField().getField('key')] = scoping.relations.getValue();
      }
    }
    return o;
  };
  getValue = function(entry, scope, field) {
    var actual_scope, i, len, scoping, scopings;
    scopings = entry.relations.getScopings();
    actual_scope = getActualScope(entry, scope, field);
    for (i = 0, len = scopings.length; i < len; i++) {
      scoping = scopings[i];
      if (scoping.relations.getScope() === actual_scope && scoping.relations.getField() === field) {
        return scoping.relations.getValue();
      }
    }
  };
  getActualScope = function(entry, scope, field) {
    var i, last_scope, len, scoping, scopings;
    scopings = entry.relations.getScopings();
    last_scope = scope;
    while (true) {
      for (i = 0, len = scopings.length; i < len; i++) {
        scoping = scopings[i];
        if (scoping.relations.getScope() === last_scope && scoping.relations.getField() === field) {
          return last_scope;
        }
      }
      last_scope = last_scope.relations.getFallbackScope();
      if (!last_scope) {
        return null;
      }
    }
  };
  getPrimaryFieldsContent = function(entry, scope) {
    var a, field, fields, i, len;
    fields = CC.Collection.getPrimaryFields(entry.relations.getCollection());
    a = [];
    for (i = 0, len = fields.length; i < len; i++) {
      field = fields[i];
      a.push(getContent(entry, scope, field));
    }
    return a;
  };
  getContent = function(entry, scope, field) {
    var value;
    value = getValue(entry, scope, field);
    return (value != null ? value.getField('content') : void 0) || null;
  };
  return CC.Entry = {
    getPrimaryFieldsContent: getPrimaryFieldsContent,
    getPrimaryValues: getPrimaryValues,
    getFieldKeyValueAssociations: getFieldKeyValueAssociations,
    getContent: getContent,
    getValue: getValue,
    getActualScope: getActualScope
  };
})();

(function() {
  var getPrimaryFields;
  getPrimaryFields = function(collection) {
    var a, field, fields, i, len;
    fields = collection.relations.getFields();
    a = [];
    for (i = 0, len = fields.length; i < len; i++) {
      field = fields[i];
      if (field.getField('primary')) {
        a.push(field);
      }
    }
    return a;
  };
  return CC.Collection = {
    getPrimaryFields: getPrimaryFields
  };
})();

(function() {
  var getFallbackScoping;
  getFallbackScoping = function(scoping) {
    var scope;
    return scope = scoping.relations.getScope();
  };
  return CC.Field = {};
})();
