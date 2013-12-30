(function() {
  var app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  app = angular.module('awesome', ['ngAnimate', 'ngResource', 'ngRoute']);

  app.constant('debug', void 0);

  app.provider('AppService', function() {
    var AppService, AppServiceProvider, AwesomeApp, AwesomeAppDialog, AwesomeAppNotify, AwesomeAppRouteServiceProvider, AwesomeAppRouter;
    AppService = {
      App: AwesomeApp = (function() {
        function AwesomeApp() {}

        return AwesomeApp;

      })(),
      AppDialog: AwesomeAppDialog = (function() {
        function AwesomeAppDialog() {}

        return AwesomeAppDialog;

      })(),
      AppNotify: AwesomeAppNotify = (function() {
        function AwesomeAppNotify() {}

        return AwesomeAppNotify;

      })(),
      AppRouter: AwesomeAppRouter = (function() {
        function AwesomeAppRouter() {}

        return AwesomeAppRouter;

      })()
    };
    return AppServiceProvider = {
      Route: AwesomeAppRouteServiceProvider = (function() {
        function AwesomeAppRouteServiceProvider() {}

        AwesomeAppRouteServiceProvider.factory = function(name, type, config) {
          config.name = name;
          config.type = type;
          return config;
        };

        return AwesomeAppRouteServiceProvider;

      })(),
      $get: function() {
        return AppService;
      }
    };
  });

  app.config(function($routeProvider, AppServiceProvider) {
    return $routeProvider.otherwise({
      redirectTo: '/'
    });
  });

  app.factory('App', function(AppService) {
    var App;
    return App = (function(_super) {
      __extends(App, _super);

      function App(version, $rootScope, debug) {
        var _this = this;
        if (debug) {
          debug.groupCollapsed('App#constructor...', this);
        }
        if (debug) {
          debug.log('$rootScope', $rootScope);
        }
        this.version = version;
        this.pathPrefix = this.prefix = '#';
        this.path = '';
        this.route = null;
        $rootScope.$on('$routeChangeStart', function(evt, route) {
          if (route.name) {
            if (debug) {
              return debug.log('App#onRouteChangeStart: change to named route -', route.name);
            }
          }
        });
        $rootScope.$on('$routeChangeSuccess', function(evt, route) {
          if (route.name) {
            if (debug) {
              debug.log('App#onRouteChangeSuccess: changed to named route -', route.name);
            }
            return _this.route = route;
          }
        });
        this.state = null;
        if (debug) {
          debug.groupEnd();
        }
      }

      return App;

    })(AppService.App);
  });

  app.factory('AppDialog', function(AppService) {
    var AppDialog;
    return AppDialog = (function(_super) {
      __extends(AppDialog, _super);

      function AppDialog(app, $location, $route, $rootScope, debug) {
        var _this = this;
        if (debug) {
          debug.groupCollapsed('AppDialog#constructor...', this, app);
        }
        if (debug) {
          debug.log('$rootScope', $rootScope);
        }
        this.overlay = null;
        if (debug) {
          debug.log('define scope properties...');
        }
        $rootScope.showViewDialog = function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return _this.show.apply(_this, args);
        };
        $rootScope.hideViewDialog = function() {
          return $location.path(app.location || '/');
        };
        if (debug) {
          debug.log('listen scope...');
        }
        $rootScope.$on('$locationChangeSuccess', function(evt) {
          var currentRoute, dialog;
          currentRoute = $route.current;
          if ('dialog' === currentRoute.type) {
            dialog = currentRoute.params.dialog || currentRoute.name;
            if (debug) {
              debug.log('App#onLocationChangeSuccess: change to dialog route -', dialog, currentRoute);
            }
            if (dialog === _this.overlay) {
              if (debug) {
                debug.log('App#onLocationChangeSuccess: openned dialog...', _this.overlay, currentRoute.params);
              }
              _this.show(dialog, currentRoute);
            } else {
              if (_this.overlay) {
                _this.templateUrl = null;
              }
              if (currentRoute.templateUrl) {
                _this.templateUrl = currentRoute.templateUrl;
              }
              _this.show(dialog, currentRoute);
              if (debug) {
                debug.log('App#onLocationChangeSuccess: open dialog...', _this.overlay, currentRoute.params);
              }
            }
            if (debug) {
              debug.log('App#onLocationChangeSuccess: replace route...', currentRoute, app.route);
            }
            return $route.current = app.route;
          } else {
            app.location = $location.path();
            if (_this.overlay) {
              if (debug) {
                debug.log('App#onLocationChangeSuccess: hide dialog...', _this.overlay);
              }
              _this.hide();
              if (app.route && $route.current && (app.route.name === $route.current.name)) {
                if (debug) {
                  debug.log('App#onLocationChangeSuccess: prevent route change...');
                }
                return $route.current = app.route;
              }
            }
          }
        });
        if (debug) {
          debug.groupEnd();
        }
      }

      AppDialog.prototype.show = function(type, route) {
        this.overlay = type;
        this.tab = route.params.tab;
        return this.route = route;
      };

      AppDialog.prototype.hide = function() {
        this.overlay = null;
        this.tab = null;
        this.route = null;
        return this.templateUrl = null;
      };

      return AppDialog;

    })(AppService.AppDialog);
  });

  app.factory('AppNotify', function(AppService) {
    var AppNotify;
    return AppNotify = (function(_super) {
      __extends(AppNotify, _super);

      function AppNotify(app, $location, $route, $rootScope, debug) {
        var _this = this;
        if (debug) {
          debug.groupCollapsed('AppNotify#constructor...', this, app);
        }
        if (debug) {
          debug.log('$rootScope', $rootScope);
        }
        this.notifications = [];
        if (debug) {
          debug.log('define scope properties...');
        }
        $rootScope.notify = function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return _this.notify.apply(_this, args);
        };
        if (debug) {
          debug.groupEnd();
        }
      }

      AppNotify.prototype.notify = function(type, data) {
        return this.notifications.unshift({
          type: type,
          data: data
        });
      };

      return AppNotify;

    })(AppService.AppNotify);
  });

  app.factory('$app', function(App, AppDialog, AppNotify) {
    var $app;
    return $app = {
      App: App,
      AppDialog: AppDialog,
      AppNotify: AppNotify
    };
  });

  app.controller('AppCtrl', function(version, $app, $rootScope, $scope, $route, $location, debug) {
    if (debug) {
      debug.log('AppCtrl', $app, $rootScope);
    }
    $rootScope.app = new $app.App(version, $rootScope, debug);
    $rootScope.app.dialog = new $app.AppDialog($rootScope.app, $location, $route, $rootScope, debug);
    $rootScope.app.notify = new $app.AppNotify($rootScope.app, $location, $route, $rootScope, debug);
    $rootScope.app.ready = null;
    $rootScope.app.error = null;
    $rootScope.referer = $location.absUrl();
    return $rootScope.view = $rootScope.app;
  });

  app.controller('ViewCtrl', function($scope, $rootScope, $route, debug) {
    if (debug) {
      return debug.log('ViewCtrl');
    }
  });

}).call(this);
