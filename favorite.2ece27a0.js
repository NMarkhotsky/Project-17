!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},i=e.parcelRequired7c6;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in o){var i=o[e];delete o[e];var n={id:e,exports:{}};return r[e]=n,i.call(n.exports,n,n.exports),n.exports}var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,r){o[e]=r},e.parcelRequired7c6=i),i("6ShQF"),i("iOi8o");var n=i("iOi8o"),t={cardListFavorite:document.querySelector(".cards__list-favorite")},a=(0,n.getFavorite)(),d=Object.values(a).map((function(e){var r=Boolean(null==a?void 0:a.hasOwnProperty(e.id));return(0,n.createMarkupForCard)(e,r,!0)})).join("");t.cardListFavorite.innerHTML=d,i("ibL0t")}();
//# sourceMappingURL=favorite.2ece27a0.js.map
