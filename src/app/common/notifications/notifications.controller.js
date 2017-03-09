import { format } from 'date-fns';

class NotificationsController {
  constructor($scope, $timeout, NotificationsService) {
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.notificationsService = NotificationsService;

    this.name = 'notifications';
    this.date = format(new Date(), 'dddd MMM DD, YYYY');
    this.showNotification = this.notificationsService.state;
    this.loading = true;
    this.notifications = {};

    this.$scope.$on('notify', () => {
      this.showNotification = this.notificationsService.state;
    });

    this.$timeout(() => {
      this.notificationsService.fetch().then(res => {
        this.loading = false;
        this.notifications = res.data;
      });
    }, 5000);
  }
}

NotificationsController.$inject = ["$scope", "$timeout", "NotificationsService"];

export default NotificationsController;
