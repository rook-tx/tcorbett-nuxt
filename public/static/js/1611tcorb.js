var Index,Main;Main=function(){var e;return e=function(){var e,t;return $(function(){return $c(document).trigger("Main.ready")}),$c(document).on("Main.ready",function(){return $c(document).trigger("Main.update")}),$c(document).on("Main.update",function(){}),$c(document).on("click",'[data-nohref="true"]',function(e){return e.preventDefault()}),$(document).ready(function(){var e,t,n,r,o,i,a,s,d;$("body").removeClass("loading"),e=$("body").outerHeight(),d=$(window).outerHeight(),t=e-d,i=void 0,o=void 0,r=$(".js-hline"),s=$(".js-hlspan"),n=$(".js-header"),a=$(".snav").length,$c(window).scroll(function(){e=$("body").outerHeight(),t=e-d,i=$(window).scrollTop(),o=-(100-i/t*100),r.css({transform:"translate3d("+o+"%,0,0)"}),s.text(Math.round(o)),r.attr("title",r.text()),a>0&&(i>d&&(n.hasClass("snav-open")||n.addClass("snav-open")),i<d&&n.hasClass("snav-open")&&n.removeClass("snav-open"),100===o&&n.hasClass("snav-open")&&n.removeClass("snav-open"))})}),e=function(){var e,t;t=document.createElement("link"),t.rel="stylesheet",t.href="//fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic|Merriweather:300,300italic,400,700",e=document.getElementsByTagName("head")[0],e.parentNode.insertBefore(t,e)},t=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame||msRequestAnimationFrame,t?t(e):window.addEventListener("load",e)},{init:e}}(),Index=function(){var e;return e=function(){return $c(document).on("click",".tldr-switch",function(e){var t;return e.preventDefault(),t=$c(document).find(".tldr-content").clone(),$c(document).find(".tldr").addClass("tldr-open").prepend(t)}),$c(document).on("click",".tldr-close",function(e){return e.preventDefault(),$c(document).find(".tldr").removeClass("tldr-open"),$c(document).find(".tldr-switch-wrap").addClass("tldr-hidden")}),$(document).ready(function(){var e,t,n,r,o,i,a,s,d;d=$(window).outerHeight(),e=$(".intro-frame"),t=$(".intro-img"),n=void 0,a=$(".intro-trigger"),s=void 0,o=void 0,i=void 0,r="cushions.jpg",$c(window).outerWidth()<680?$c(".one-col").css("padding-top",.45*d).css("padding-bottom",d/4):$c(".one-col").css("padding-top","2.5em").css("padding-bottom",d/2),$c(window).resize(function(){d=$(window).outerHeight(),$c(window).outerWidth()<680?$c(".one-col").css("padding-top",.45*d).css("padding-bottom",d/4):$c(".one-col").css("padding-top","2.5em").css("padding-bottom",d/2)}),$(window).scroll(function(){var c,l,u;o=$(window).scrollTop(),n=t.filter(function(e,t){return o+d/2>$(this).offset().top}).last(),i=n.attr("src"),u=n.attr("alt"),c=n.data("credit"),l=n.data("credit-url"),s=n.next().find(a),o>1.618*d&&$c(document).find(".tldr-switch-wrap").removeClass("tldr-hidden"),i?($(e).css("background-image","url("+i+")"),$(e).attr("title",u),c?$(e).find(".frame-credit").html('<span>Image : <a href="'+l+'" target="_blank" rel="noopener" title="More by '+c+'">'+c+"</a></span>"):$(e).find(".frame-credit").empty(),$(t).removeClass("intro-img-selected"),$(n).addClass("intro-img-selected"),$(a).removeClass("intro-trigger-selected"),$(s).addClass("intro-trigger-selected")):o>20&&$(e).css("background-image","url(/static/images/index/"+r+")")})})},{init:e}}();var JCache;JCache=function(){var e,t,n;return e=[],t=function(t,n){return(null==e[t]||n)&&(e[t]=$(t)),e[t]},n=function(){return e=[]},{cache:t,clear:n}}(),window.$c=JCache.cache;var Validator;Validator=function(){var e,t,n,r,o;return o=function(o){var i;if(i=!0,$(".show-error").removeClass("show-error"),$(".form-validate",o).each(function(){var o,a;switch(o=$(this),a=o.val(),o.attr("data-validation-type")){case"name":if(o.prop("required")){if(a.length<3)return i=!1,r(o)}else if(a.length&&a.length<3)return i=!1,r(o);break;case"phone":if(o.prop("required")){if(!(a.length>1))return i=!1,r(o);if(!t(a))return i=!1,r(o)}else if(a.length>1&&!t(a))return i=!1,r(o);break;case"email":if(o.prop("required")){if(!e(a))return r(o)}else if(a.length&&!e(a))return r(o);break;case"postCode":if(o.prop("required")){if(!n(a))return r(o)}else if(a.length&&!n(a))return r(o)}}),i)return o.submit()},t=function(e){var t;return t=new RegExp(/(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/),t.test(e)},e=function(e){var t;return t=new RegExp(/^\S+@\S+\.\S+$/),t.test(e)},n=function(e){var t;return t=new RegExp(/^([a-zA-Z]\d[a-zA-z]( )?\d[a-zA-Z]\d)$/),t.test(e)},r=function(e){return e.parent().addClass("show-error")},{validateForm:o}}();