!function(){function e(e){return e&&e.__esModule?e.default:e}function t(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},a={},o=n.parcelRequired7c6;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in a){var t=a[e];delete a[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){a[e]=t},n.parcelRequired7c6=o),o.register("iKITy",(function(n,r){t(n.exports,"getFavorite",(function(){return _})),t(n.exports,"createMarkupForCardOnSearch",(function(){return f}));var a=o("hKHmD"),i=o("dDDEV"),c=o("cFA0N"),s=o("6ShQF"),d={form:document.querySelector(".form"),input:document.querySelector(".form__input"),list:document.querySelector(".cards__list--home"),iconSvg:new URL(o("eWqKT")),cardListFavorite:document.querySelector(".cards__list-favorite")};d.form.addEventListener("submit",(function(e){if(e.preventDefault(),""===d.input.value.trim())return;var t=new(0,c.default);t.searchQuery=d.input.value,t.fetchOnSearchQuery().then((function(e){var t=e.docs;d.list.innerHTML="";var n=_();if(0===t.length){var r=new URL(o("1FLXB")),a='<img src="'.concat(r,'" alt="We haven\'t found news at your request">');d.list.innerHTML=a}else{var i=t.map((function(e){return f(e,Boolean(null==n?void 0:n.hasOwnProperty(e._id)))})).join("");d.list.innerHTML=i}}))}));var u="Add to favorite ".concat(v("icon-heart")),l="Remove from favorite ".concat(v("icon-heart-full"));function f(t,n){var r,c=arguments.length>2&&void 0!==arguments[2]&&arguments[2],d=t.abstract,f=t.pub_date,v=t.multimedia,m=t.section_name,p=t.headline,g=t.web_url,b=t._id,h=b.replace(/[^+\d]/g,""),y=f,S=m,L=p.main,w=g,H=function(){var e=document.querySelector(".button__add-favorite--".concat(h));e.classList.toggle("button__add-favorite--active"),e.classList.contains("button__add-favorite--active")?e.innerHTML=l:e.innerHTML=u},O=null;O=v[0]?new URL("https://www.nytimes.com/".concat(null===(r=v[0])||void 0===r?void 0:r.url),"file:///src/scripts/search-area.js"):new URL(o("1FLXB")),setTimeout((function(){n&&H(),document.querySelector(".button__add-favorite--".concat(h)).onclick=B(h,t)}),0);var B=function(t,n){return function(){H();var r=_(),o=r;if(r.hasOwnProperty(t)){if(delete o[t],c)document.querySelector(".card_item-".concat(t)).remove()}else{var s=e(a)({},t,n);o=e(i)({},r,s)}localStorage.setItem("favoriteBySearch",JSON.stringify(o))}};return'\n  <div class="card_item card_item-'.concat(h,'">\n    <div class="card_item-header">\n      <img class="card_item-image" src="').concat(O,'" alt="',"imageCaption",'" loading="lazy" />\n      <span class="card_item-section">').concat(S,'</span>\n      <button class="button__add-favorite ').concat("button__add-favorite--".concat(h),'" data-id="').concat(h,'">\n        ').concat(u,'\n      </button>\n    </div>\n    <div class="cart_item-content">\n      <div class="card_item-text">\n        <h1 class="card_item-title">').concat(L,'</h1>\n        <p class="card_item-description">').concat(d,'</p>\n      </div>\n      <div class="card_item-info">\n        <span class="card_item-date">').concat((0,s.default)(y),'</span>\n        <a class="card__link-btn" href="').concat(w,'" data-title="').concat(L,'">\n          <button class="button__read-more">\n            Read more\n          </button>\n        </a>\n      </div>\n    </div>\n  </div>\n  ')}function v(e){return'\n    <svg class="button__icon-svg">\n      <use href="'.concat(d.iconSvg,"#").concat(e,'"></use>\n    </svg>\n  ')}function _(){return JSON.parse(localStorage.getItem("favoriteBySearch"))||{}}})),o.register("eWqKT",(function(e,t){e.exports=o("aNJCr").getBundleURL("1sXBe")+o("iE7OH").resolve("4BzQQ")})),o.register("1FLXB",(function(e,t){e.exports=o("aNJCr").getBundleURL("1sXBe")+o("iE7OH").resolve("8yCin")})),o("iE7OH").register(JSON.parse('{"1sXBe":"index.7a72a146.js","4BzQQ":"symbol-defs.0d828f66.svg","8yCin":"not-found-desktop.a4722253.png"}'))}();
//# sourceMappingURL=index.7a72a146.js.map