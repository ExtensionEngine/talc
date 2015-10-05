
Template.sGlobalAccessManagement.helpers({
  members: function() {
    return Meteor.users.find();
  },
  autocompleteEmail: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [{
        token: '',
        collection: Meteor.users,
        field: "emails.0.address",
        template: Template.autocompleteUser
      }]
    };
  },
  hasRole: function(user, role) {
    var expectedResult = role === '' ? false : true;
    role = role === '' ? ['admin', 'graph-create'] : [role];
    var result = Roles.userIsInRole(user, role, 'global');

    return expectedResult === result ? 'checked' : '';
  }
});

Template.sGlobalAccessManagement.events({
  'click .select-role': function(e) {
    var role = e.currentTarget.value;
    Meteor.call('users.role.set', this._id, role);
  }
});
