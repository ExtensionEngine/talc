
Dependency.add('browserService', (function browserService() {
  var s = {};
  var data = {
    path: new ReactiveVar([])
  };

  function processNode(node) {
    return {
      id: node._id,
      name: node.name,
      type: (node.type || 'C')
    };
  }

  s.init = function(root) {
    var node = processNode(root);
    data.path.set([node]);
  };

  s.forward = function(root) {
    var node = processNode(root);
    var path = data.path.get();
    path.push(node);
    data.path.set(path);
  };

  s.back = function() {
    var path = data.path.get();
    path.pop();
    data.path.set(path);
  };

  s.root = function() {
    var path = data.path.get();
    return path[path.length-1];
  };

  s.parent = function() {
    var path = data.path.get();
    if (path.length > 1) {
      return path[path.length-2];
    }

    return null;
  };

  s.path = function() {
    return data.path.get();
  };

  return s;
})());
