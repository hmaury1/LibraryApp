'use strict';

describe('libraryApp.version module', function() {
  beforeEach(module('libraryApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
