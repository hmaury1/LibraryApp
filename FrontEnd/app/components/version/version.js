'use strict';

angular.module('libraryApp.version', [
  'libraryApp.version.interpolate-filter',
  'libraryApp.version.version-directive'
])

.value('version', '0.1');
