// ==UserScript==
// @name         Mod/Hack Wuxia Rising Star
// @namespace    http://tampermonkey.net/
// @version      2025-07-26
// @description  chèn script mod
// @author       1HitMod
// @match        https://minihero.risingstartth.vn/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const customScriptURL = 'https://1hitmod.win/xyz/WuxiaRisingStar_main_enc.js';
    const loadingHtml = `<div style="height:100vh;display:flex;align-items:center;justify-content:center;font-size:22px;background:#232830;color:#000">Đang tải script mod...</div>`;

    // Show loading
    document.open();
    document.write(loadingHtml);
    document.close();

    // Fetch original HTML
    fetch(location.origin + location.pathname)
        .then(r => r.text())
        .then(html => {

            const match = html.match(/<script\s+src="(yxzl\/puerts_browser_js_resources[^"]+\.js)"\s*><\/script>/i);
            let originalScript = match ? match[1] : null;

            const injectOriginal = originalScript
                ? `<script>window.__original_puerts_url__ = "${originalScript}";</script>`
                : '';

            const replaced = html.replace(
                /<script\s+src="yxzl\/puerts_browser_js_resources[^"]+\.js"\s*><\/script>/gi,
                injectOriginal + `<script src="${customScriptURL}"></script>`
            );

            // Reload page with modified HTML
            document.open();
            document.write(replaced);
            document.close();
        })
        .catch(e => {
            document.body.innerHTML = '<h2 style="color:red;padding:2em;">Không thể tải index.html hoặc mod!</h2>';
            console.error("Mod load error:", e);
        });
})();
