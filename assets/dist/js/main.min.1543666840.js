window.main = window.main || {};
var sitename = "Onkruid",
    ww = $(window).width(),
    wh = $(window).height(),
    $htmlbody = $("html,body"),
    $body = $("body"),
    $listItem = $(".js-listitem"),
    $btnToggleListitem = $(".js-toggle-listitem"),
    $header = $(".js-header"),
    headerHeight = $header.outerHeight(),
    halfHeaderHeight = headerHeight / 2,
    animationSpeed = 440,
    didScroll = !1,
    lastScrollPos = 0,
    scrollDownLastPosition = 0,
    scrollUpLastPosition = 0,
    scrollLastPosition = 0,
    scrollvalue, percentage, isHomepage = !1,
    isTouchdevice = !1;
main.init = function() {
    main.initIntro(), main.initPjax(), main.checkOnScroll($(document).scrollTop()), main.initEvents(), main.setLayout(), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (isTouchdevice = !0, $body.addClass("is-touch"), $body.addClass("is-mobile-device")), $(window).on("resize", function() {
        main.setLayout()
    })
}, main.initPjax = function() {
    var i = Barba.BaseView.extend({
            namespace: "default",
            onEnter: function() {
                main.initEvents()
            }
        }),
        t = Barba.BaseView.extend({
            namespace: "projects",
            onEnter: function() {
                main.initEvents(), main.initList()
            }
        }),
        n = Barba.BaseView.extend({
            namespace: "project",
            onEnter: function() {
                main.initEvents(), main.initSlider(".js-slider")
            },
            onLeaveCompleted: function() {
                main.destroySlider(".js-slider")
            }
        });
    i.init(), t.init(), n.init(), Barba.Pjax.start();
    var e = Barba.BaseTransition.extend({
        start: function() {
            Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this))
        },
        fadeOut: function() {
            return $(this.oldContainer).toggleClass("fade-out"), new Promise(function(i, t) {
                window.setTimeout(function() {
                    i()
                }, animationSpeed)
            })
        },
        fadeIn: function() {
            var i = $(this.newContainer);
            $(this.newContainer).toggleClass("fade-in"), console.log("New page name is = " + i.data("page")), main.updateNavigation(i.data("page")), main.scrollToTop(), this.done()
        }
    });
    Barba.Pjax.getTransition = function() {
        return e
    }
}, main.updateNavigation = function(i) {
    $(".c-navigation-list-item").removeClass("is-active"), $(".c-navigation-list-item[data-page=" + i + "]").addClass("is-active")
}, main.initIntro = function() {
    $body.scrollTop(0), $body.removeClass("preload"), $body.on("click touch", function() {
        $body.addClass("is-loaded"), $body.removeClass("no-scroll")
    }), setTimeout(function() {
        $body.addClass("is-loaded"), $body.removeClass("no-scroll")
    }, 880)
}, main.initEvents = function() {
    $listItem = $(".js-listitem"), $btnToggleListitem = $(".js-toggle-listitem"), $btnToggleProject = $(".js-toggle-project"), $btnToggleListitem.off().on("click", function(i) {
        i.preventDefault();
        var t = $(this).attr("data-page");
        main.toggleListItem(t)
    }), $btnToggleProject.off().on("click", function(i) {
        i.preventDefault();
        var t = $(this).attr("data-page"),
            n = $(this).attr("data-href"),
            e = $(this).attr("data-title");
        main.toggleProject(t, n, e)
    })
}, main.initList = function() {
    var i = {
        valueNames: ["name", "location", "status", "client", "year", "type"]
    };
    new List("projects-list", i)
}, main.destroySlider = function(i) {
    $(i).length > 0 && $(i).flickity("destroy")
}, main.initSlider = function(i) {
    if ($(i).length > 0) {
        $(i).removeClass("is-hidden"), $(i)[0].offsetHeight, $(i).flickity({
            cellSelector: ".js-slider__cell",
            cellAlign: "left",
            wrapAround: !0,
            autoPlay: !0,
            contain: !1,
            setGallerySize: !0,
            prevNextButtons: !1,
            pageDots: !0
        });
        $(i).data("flickity");
        $(".js-slider__btn--previous").on("click", function() {
            $(i).flickity("previous")
        }), $(".js-slider__btn--next").on("click", function() {
            $(i).flickity("next")
        })
    }
}, main.showContentBlock = function(i) {
    if ($(i).toggleClass("is-active"), $(i).hasClass("is-active")) {
        $(i).find(".o-list-item__head").css({
            top: $header.outerHeight() - 1
        });
        var t = $(i).find(".js-slider");
        main.initSlider(t), setTimeout(function() {
            main.scrollTo(i)
        }, 50)
    } else $(".o-list-item__head").css({
        top: 0
    })
}, main.updatePage = function(i, t, n) {
    //window.history.pushState(sitename, n, "/" + t)
}, main.toggleProject = function(i, t, n) {
    var e = '.js-listitem[data-page="' + i + '"]';
    main.showContentBlock(e), main.updatePage(i, t, n)
}, main.toggleListItem = function(i) {
    var t = '.js-listitem[data-page="' + i + '"]';
    main.showContentBlock(t)
}, main.scrollTo = function(i) {
    $("html:not(:animated), body:not(:animated)").animate({
        scrollTop: $(i).offset().top - ($header.outerHeight() - 1)
    }, animationSpeed)
}, main.scrollToTop = function() {
    $("html:not(:animated), body:not(:animated)").animate({
        scrollTop: 0
    }, animationSpeed)
}, main.setLayout = function() {
    ww = $(window).width(), wh = $(window).height();
    var i = $(".c-logo-container--main").outerHeight();
    $(".wrapper").css({
        "margin-top": i
    })
}, main.checkOnScroll = function(i) {}, $(window).on("scroll", function(i) {
    didScroll = !0, main.checkOnScroll($(this).scrollTop())
}), setInterval(function() {
    didScroll && (didScroll = !1)
}, 200), $(main.init);
//# sourceMappingURL=main.min.js.map