'use strict';

/* globals angular */

angular.module('optionsApp')
  .service('optionsService', function () {

      var options = {
        mpeLeads: {
          type: 'checkbox',
          value: true,
          label: 'Create Quote from lead',
          description: 'Add Create Quote button next to lead on leads.html',
          disabled: false
        },
        mpeMapsAutocomplete: {
          type: 'checkbox',
          value: true,
          label: 'Address autocomplete',
          description: 'Add autocomplete to address fields.',
          disabled: false
        },
        mpeDirections: {
          type: 'checkbox',
          value: true,
          label: 'Directions',
          description: 'Add a Directions button in the Charges page. Directions can include a parking lot address and extra stops.',
          disabled: false
        },
        mpeParkingLotFirst: {
          type: 'checkbox',
          value: true,
          label: 'Parking lot first',
          description: 'Include the parking lot address as a starting point in directions.',
          disabled: '!options.mpeDirections.value'
        },
        mpeParkingLotLast: {
          type: 'checkbox',
          value: false,
          label: 'Parking lot last',
          description: 'Include the parking lot address as a ending point in directions.',
          disabled: '!options.mpeDirections.value'
        },
        mpeParkingLotAddress: {
          type: 'text',
          value: 'NY 11106',
          placeholder: 'Enter the parking lot address',
          class: 'form-control',
          label: 'Parking lot address',
          labelClass: 'sr-only',
          description: 'The address of the parking lot.',
          disabled: '!(options.mpeDirections.value && (options.mpeParkingLotFirst.value || options.mpeParkingLotLast.value))'
        },
        // mpeEmailSearch: {
        //   type: 'checkbox',
        //   value: false,
        //   label: 'Search in email',
        //   description: 'Add link to search for coversations in email.',
        //   disabled: false
        // }
      };

      this.getOptions = function() {
        return options;
      };

      this.getOption = function(optionName) {
        return options[optionName];
      };

    });
