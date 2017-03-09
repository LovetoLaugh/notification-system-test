import angular from 'angular';
import Navbar from './navbar/navbar';
import Notifications from './notifications/notifications';
import Hero from './hero/hero';

import {
  NotificationsService
} from '../shared';

let commonModule = angular
  .module('app.common', [
    Navbar,
    Notifications,
    Hero
  ])
  .service('NotificationsService', NotificationsService)
  .name;

export default commonModule;
