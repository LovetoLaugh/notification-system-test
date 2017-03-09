class NavbarController {
  constructor(NotificationsService) {
    this.name = 'Brand';
    this.notificationsService = NotificationsService;
  }

  toggle() {
    // debugger;
    this.notificationsService.toggle();
  }
}

NavbarController.$inject = ["NotificationsService"];

export default NavbarController;
