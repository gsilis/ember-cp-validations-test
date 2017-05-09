import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('something', 'Unit | Model | something', {
  needs: [
    'validator:presence',
    'validator:format',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it validates first name', function(assert) {
  let model = this.subject();

  assert.equal(
    model.get('validations.attrs.firstName.isValid'), false,
    'default state is invalid'
  );

  Ember.run(function() {
    model.set('firstName', 'some value');
  });

  assert.equal(
    model.get('validations.attrs.firstName.isValid'), true,
    'first name is now valid'
  );
});

test('it validates thing if it is required', function(assert) {
  let model = this.subject();

  assert.equal(
    model.get('validations.attrs.thing.isValid'), true,
    'thing is not required by default'
  );

  Ember.run(function() {
    model.set('requireThing', true);
  });

  assert.equal(
    model.get('validations.attrs.thing.isValid'), false,
    'thing is now required'
  );

  Ember.run(function() {
    model.set('thing', 'here is a thing');
  });

  assert.equal(
    model.get('validations.attrs.thing.isValid'), true,
    'thing is valid'
  );
});

test('it validates email based on communication type', function(assert) {
  let model = this.subject();

  assert.equal(
    model.get('validations.attrs.email.isValid'), true,
    'email is valid at first because it is not required'
  );

  Ember.run(function() {
    model.set('communicationType', 'email');
  });

  assert.equal(
    model.get('validations.attrs.email.isValid'), false,
    'email is now required so it is invalid'
  );

  Ember.run(function() {
    model.set('email', 'some-junk');
  });

  assert.equal(
    model.get('validations.attrs.email.isValid'), false,
    'junk email is not accepted'
  );

  Ember.run(function() {
    model.set('email', 'valid-email@iloan.com');
  });

  assert.equal(
    model.get('validations.attrs.email.isValid'), true,
    'email is now valid'
  );
});

test('it validates phone number based on communication type', function(assert) {
  let model = this.subject();

  assert.equal(
    model.get('validations.attrs.phone.isValid'), true,
    'phone is not required by default'
  );

  Ember.run(function() {
    model.set('communicationType', 'phone');
  });

  assert.equal(
    model.get('validations.attrs.phone.isValid'), false,
    'phone is required because of communication type'
  );

  Ember.run(function() {
    model.set('phone', '123');
  });

  assert.equal(
    model.get('validations.attrs.phone.isValid'), false,
    'phone does not accept junk values'
  );

  Ember.run(function() {
    model.set('phone', '(123) 456-7891');
  });

  assert.equal(
    model.get('validations.attrs.phone.isValid'), true,
    'phone is valid'
  );
});
