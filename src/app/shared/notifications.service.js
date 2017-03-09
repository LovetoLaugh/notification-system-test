class NotificationService {
  constructor($rootScope, $http) {
    this.state = false;
    this.$http = $http;
    this.$rootScope = $rootScope;
  }

  toggle() {
    this.state = !this.state;
    this.$rootScope.$broadcast('notify');
  }

  fetch() {
    return this.$http.get('data.json');
  }
}

NotificationService.$inject = ["$rootScope", "$http"];

export default NotificationService;
