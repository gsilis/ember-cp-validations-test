import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { buildValidations, validator } from 'ember-cp-validations';

const { computed } = Ember;

const CommunicationType = {
  EMAIL: 'email',
  NONE: 'none',
  PHONE: 'phone',
};

const Validations = buildValidations({
  firstName: validator('presence', {
    description: 'First name',
    presence: true,
  }),
  thing: [
    validator('presence', {
      description: 'The thing',
      disabled: computed.not('model.requireThing'),
      presence: true,
    }),
  ],
  email: {
    description: 'Email address',
    disabled: computed.not('model.isEmailType'),
    validators: [
      validator('presence', true),
      validator('format', { type: 'email' }),
    ],
  },
  phone: {
    description: 'Phone number',
    disabled: computed.not('model.isPhoneType'),
    validators: [
      validator('presence', true),
      validator('format', { type: 'phone' }),
    ],
  },
});

export default DS.Model.extend(
  Validations,
  {
    firstName: attr('string'),
    lastName: attr('string'),
    requireThing: attr('boolean'),
    thing: attr('string'),
    communicationType: attr('string', { defaultValue: CommunicationType.NONE }),
    email: attr('string'),
    phone: attr('string'),

    isEmailType: computed.equal('communicationType', CommunicationType.EMAIL),
    isPhoneType: computed.equal('communicationType', CommunicationType.PHONE),
  }
);
