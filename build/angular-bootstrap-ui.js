// READ: http://docs-next.angularjs.org/guide/ie
(function(){
  
  var getIE = function() {
      // Returns the version of Internet Explorer or a -1
      // (indicating the use of another browser).
     var rv = -1; // Return value assumes failure.
     if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) {
        	rv = parseFloat( RegExp.$1 );
        }
     }
     return rv;
  };

  var tags = [ 'ng-include', 'ng-pluralize', 'ng-view', 'ng:include', 'ng:pluralize', 'ng:view' ];
  var shiv = function() {
    for(var i = 0, len = tags.length; i < len; i++) {
      document.createElement(tags[i]);
    }
  };
	
  var ieVersion = getIE();
  if (ieVersion > -1 && ieVersion < 9) {
    shiv();
  }
  
})();
(function() {

  angular.module('angularBootstrap', ['angularBootstrap.modal', 'angularBootstrap.tabs', 'angularBootstrap.popover']);

}).call(this);
/* =========================================================
 * bootstrap-modal.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (content, options) {
    this.options = options
    this.$element = $(content)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        $('body').addClass('modal-open')

        this.isShown = true

        escape.call(this)
        backdrop.call(this, function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element.addClass('in')

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        $('body').removeClass('modal-open')

        escape.call(this)

        this.$element.removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideModal.call(this)
      }

  }


 /* MODAL PRIVATE METHODS
  * ===================== */

  function hideWithTransition() {
    var that = this
      , timeout = setTimeout(function () {
          that.$element.off($.support.transition.end)
          hideModal.call(that)
        }, 500)

    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout)
      hideModal.call(that)
    })
  }

  function hideModal(that) {
    this.$element
      .hide()
      .trigger('hidden')

    backdrop.call(this)
  }

  function backdrop(callback) {
    var that = this
      , animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      if (this.options.backdrop != 'static') {
        this.$backdrop.click($.proxy(this.hide, this))
      }

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      doAnimate ?
        this.$backdrop.one($.support.transition.end, callback) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :
        removeBackdrop.call(this)

    } else if (callback) {
      callback()
    }
  }

  function removeBackdrop() {
    this.$backdrop.remove()
    this.$backdrop = null
  }

  function escape() {
    var that = this
    if (this.isShown && this.options.keyboard) {
      $(document).on('keyup.dismiss.modal', function ( e ) {
        e.which == 27 && that.hide()
      })
    } else if (!this.isShown) {
      $(document).off('keyup.dismiss.modal')
    }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data())

      e.preventDefault()
      $target.modal(option)
    })
  })

}(window.jQuery);(function() {

  angular.module('angularBootstrap.popover', []).directive('strapPopover', [
    function() {
      var $, defaults, getBounds, linkFn;
      $ = jQuery;
      defaults = {
        placement: 'right',
        margin: 0
      };
      getBounds = function($el) {
        return $.extend($el.offset(), {
          width: $el[0].offsetWidth || $el.width(),
          height: $el[0].offsetHeight || $el.height()
        });
      };
      linkFn = function(scope, elm, attrs) {
        var $this, currentSource, directiveOptions, hidePopover, showPopover, togglePopover;
        $this = $(elm).hide().addClass('popover');
        directiveOptions = {
          placement: attrs.placement
        };
        currentSource = null;
        showPopover = function(options) {
          var $source, decidePosition, margin, placement, popBounds, sourceBounds;
          $source = options.$source, placement = options.placement, margin = options.margin;
          if ($source === currentSource) return;
          popBounds = getBounds($this);
          sourceBounds = getBounds($source);
          decidePosition = function() {
            switch (placement) {
              case 'inside':
                return {
                  top: sourceBounds.top,
                  left: sourceBounds.left
                };
              case 'left':
                return {
                  top: sourceBounds.top + sourceBounds.height / 2 - popBounds.height / 2,
                  left: sourceBounds.left - popBounds.width - margin
                };
              case 'top':
                return {
                  top: sourceBounds.top - popBounds.height - margin,
                  left: sourceBounds.left + sourceBounds.width / 2 - popBounds.width / 2
                };
              case 'right':
                return {
                  top: sourceBounds.top + sourceBounds.height / 2 - popBounds.height / 2,
                  left: sourceBounds.left + sourceBounds.width + margin
                };
              case 'bottom':
                return {
                  top: sourceBounds.top + sourceBounds.height + margin,
                  left: sourceBounds.left + sourceBounds.width / 2 - popBounds.width / 2
                };
            }
          };
          $this.css(decidePosition()).fadeIn(250);
          return currentSource = $source;
        };
        hidePopover = function() {
          $this.fadeOut(250);
          return currentSource = null;
        };
        togglePopover = function(options) {
          if ($this.css('display') === 'none') {
            return showPopover(options);
          } else {
            return hidePopover();
          }
        };
        return $this.bind('popoverShow', function(evt, eventOptions) {
          return showPopover($.extend(defaults, directiveOptions, eventOptions));
        }).bind('popoverHide', function() {
          return hidePopover();
        }).bind('popoverToggle', function(evt, eventOptions) {
          return togglePopover($.extend(defaults, directiveOptions, eventOptions));
        });
      };
      return {
        restrict: 'E',
        scope: {
          title: '='
        },
        link: linkFn,
        transclude: true,
        template: "<div class=\"arrow\"></div>\n<div class=\"popover-inner\">\n	<h3 class=\"popover-title\">{{title}}</h3>\n	<div class=\"popover-content\" ng-transclude></div>\n</div>"
      };
    }
  ]).directive('popTarget', [
    function() {
      var $, linkFn;
      $ = jQuery;
      linkFn = function(scope, elm, attrs) {
        var $popover, $this, bindPopoverEvent, setPopoverOpenCloseEvents;
        $popover = $(attrs.popTarget);
        $this = $(elm);
        bindPopoverEvent = function(sourceEventType, popoverEventType, callback) {
          return $this.bind(sourceEventType, function() {
            if (typeof callback === "function") callback();
            return $popover.trigger(popoverEventType, [
              {
                $source: $this,
                placement: attrs.popPlacement,
                eventType: attrs.popEvent,
                margin: parseInt(attrs.popMargin || '0')
              }
            ]);
          });
        };
        setPopoverOpenCloseEvents = {
          hover: function() {
            return bindPopoverEvent('mouseover', 'popoverShow', function() {
              var mouseInCount, onMouseout, onMouseover;
              mouseInCount = 1;
              onMouseover = function() {
                return mouseInCount++;
              };
              onMouseout = function() {
                mouseInCount--;
                return setTimeout(function() {
                  if (mouseInCount === 0) {
                    $popover.trigger('popoverHide');
                    $this.unbind('mouseover', onMouseover).unbind('mouseout', onMouseout);
                    return $popover.unbind('mouseover', onMouseover).unbind('mouseout', onMouseout);
                  }
                }, 150);
              };
              $this.bind('mouseover', onMouseover).bind('mouseout', onMouseout);
              return $popover.bind('mouseover', onMouseover).bind('mouseout', onMouseout);
            });
          },
          focus: function() {
            bindPopoverEvent('focus', 'popoverShow');
            return bindPopoverEvent('blur', 'popoverHide');
          },
          click: function() {
            return bindPopoverEvent('click', 'popoverToggle');
          }
        };
        if (attrs.popEvent != null) {
          return setPopoverOpenCloseEvents[attrs.popEvent]();
        }
      };
      return {
        restrict: 'A',
        link: linkFn
      };
    }
  ]);

}).call(this);

/*
modal. Restrict class. Options:
	ng-model (scope-variable, optional, default=none)
	  If ng-model is NOT set, this will behave like a normal
	  bootstrap modal, except backdrop/keyboard options will be used
	  If ng-model IS set, the value will be set to true whenever the
	  modal is open, and false when it is closed.
	  Additionally, you may set it to true to open the
	  modal and set it to false to close it.
	backdrop: (boolean, optional, default=true)
	  Decides whether the modal has a backdrop when opening
	keyboard: (boolean, optional, default=true)
	  Decides whether the modal can be closed with escape key	

Example usage, showing both ways of opening/closing the modal:
<div id="myModal" class="modal hide" ng-model="modalVariable">
	<button ng-click="modalVariable = false">Close Modal</button>
</div>
<a href="#myModal" data-toggle="modal">Open Modal</a>
*/

(function() {

  angular.module('angularBootstrap.modal', []).directive('modal', [
    '$timeout', function($timeout) {
      var $;
      $ = jQuery;
      return {
        restrict: 'C',
        require: '?ngModel',
        scope: true,
        link: function(scope, elm, attrs, model) {
          $(elm).modal({
            backdrop: scope.backdrop,
            keyboard: scope.keyboard,
            show: false
          });
          if (model == null) return;
          scope.$watch(attrs.ngModel, function(value) {
            if (value === true) {
              return $(elm).modal('show');
            } else {
              return $(elm).modal('hide');
            }
          });
          $(elm).bind('shown', function() {
            return $timeout(function() {
              return scope.ngModel(true);
            });
          });
          return $(elm).bind('hidden', function() {
            return $timeout(function() {
              return scope.ngModel(false);
            });
          });
        }
      };
    }
  ]);

}).call(this);

/*
strap-tabs
Example usage:
<strap-tabs>
	<strap-tab title="Hello">Content</strap-tab>
	<strap-tab title="getTitle()"><h1>I love things!</h1></strap-tab>
	<div ng-repeat="stuff in things">
		<strap-tab title="{{stuff}}">{{stuff.things}}</strap-tab>
	</div>
</strap-tabs>
*/

(function() {

  angular.module('angularBootstrap.tabs', []).directive('strapTabs', [
    '$timeout', function($timeout) {
      var controllerFn;
      controllerFn = function($scope, $element, $attrs) {
        $scope.tabs = [];
        $scope.$watch('tabs.length', function(tabsL, oldL) {
          if (tabsL > 0 && tabsL < oldL) {
            if ($scope.tabs.indexOf($scope.selectedTab === -1)) {
              return $scope.selectTab($scope.tabs[Math.max($scope.selectedIdx - 1, 0)]);
            }
          }
        });
        $scope.selectTab = function(tab) {
          var _i, _len, _ref, _tab;
          _ref = $scope.tabs;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            _tab = _ref[_i];
            _tab.selected(false);
          }
          tab.selected(true);
          $scope.selectedTab = tab;
          return $scope.selectedIdx = $scope.tabs.indexOf(tab);
        };
        this.addTab = function(tab, index) {
          $scope.tabs.push(tab);
          if ($scope.tabs.length === 1) return $scope.selectTab(tab);
        };
        return this.removeTab = function(tab) {
          return $timeout(function() {
            return $scope.tabs.splice($scope.tabs.indexOf(tab, 1));
          });
        };
      };
      return {
        restrict: 'E',
        transclude: true,
        controller: controllerFn,
        template: "<div class=\"tabbable\">\n	<ul class=\"nav nav-tabs\">\n		<li ng-repeat=\"tab in tabs\" ng-class=\"{active: tab.selected()}\">\n			<a href=\"\" ng-click=\"selectTab(tab)\">{{tab.title}}</a>\n		</li>\n	</ul>\n	<div class=\"tab-content\" ng-transclude>\n	</div>\n</div>"
      };
    }
  ]).directive('strapTab', [
    function() {
      var linkFn, nextTab;
      nextTab = 0;
      linkFn = function(scope, elm, attrs, container) {
        var tab;
        tab = {
          title: scope.title,
          selected: function(newVal) {
            if (newVal == null) return scope.selected;
            return scope.selected = newVal;
          }
        };
        container.addTab(tab);
        return scope.$on('$destroy', function() {
          return container.removeTab(tab);
        });
      };
      return {
        restrict: 'E',
        transclude: true,
        require: '^strapTabs',
        link: linkFn,
        scope: {
          title: '='
        },
        template: "<div class=\"tab-pane\" ng-class=\"{active:selected}\" ng-show=\"selected\" ng-transclude></div>"
      };
    }
  ]);

}).call(this);