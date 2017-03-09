import angular from 'angular';
import { distanceInWordsStrict, differenceInMilliseconds } from 'date-fns';
import notificationsComponent from './notifications.component';

let digitsFilter = () => (input) => {
  if (input < 10) {
    input = '0' + input;
  }

  return input;
};

let dateInWordsFilter = () => (timestamp) => {
  var now = new Date().getTime();
  var dateInWord = distanceInWordsStrict(now, timestamp, {
    addSuffix: true
  });
  if (differenceInMilliseconds(now, timestamp) > 0 &&
    differenceInMilliseconds(now, timestamp) < 1000) {
    console.log(differenceInMilliseconds(now, timestamp));
    return 'Just now';
  }
  if (differenceInMilliseconds(now, timestamp) > 0 &&
    differenceInMilliseconds(now, timestamp) < 86400) {
    return 'Yesterday';
  }

  return dateInWord;
};

let hideNotifications = (NotificationsService) => {
  return {
    restrict: 'A',
    link(scope, elem) {
      var $elem = elem;
      var $document = angular.element(document);

      $document.on('click', e => {
        var $target = angular.element(e.target);
        if (!$target.hasClass('btn') && !$target.hasClass('icon')) {
          scope.$apply(() => {
            NotificationsService.toggle();
          });
        }
        return false;
      });

      $elem.on('click', e => {
        e.stopPropagation();
        return false;
      });

      scope.$on('$destroy', () => {
        $document.off('click');
        $elem.off('click');
      });
    }
  };
};

hideNotifications.$inject = ["NotificationsService"];

let notificationsModule = angular
  .module('notifications', [])
  .component('notifications', notificationsComponent)
  .directive('hideNotifications', hideNotifications)
  .filter('dateinwords', dateInWordsFilter)
  .filter('digits', digitsFilter)
  .name;

export default notificationsModule;
