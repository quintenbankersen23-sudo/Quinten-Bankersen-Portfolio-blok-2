(function () {
  var rail = document.getElementById('rail');
  var btn = document.getElementById('menu-btn');

  function setMenu(open) {
    if (!rail || !btn) return;
    rail.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Sluiten' : 'Menu';
  }
  if (btn) btn.addEventListener('click', function () { setMenu(!rail.classList.contains('is-open')); });
  if (rail) rail.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  /* Afbeeldingen vergroten */
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightbox-img');
  var boxCap = document.getElementById('lightbox-cap');
  var boxZoom = document.getElementById('lightbox-zoom');
  var boxClose = document.getElementById('lightbox-close');
  var lastFocus = null;

  function openBox(src, alt) {
    lastFocus = document.activeElement;
    boxImg.src = src; boxImg.alt = alt || '';
    boxImg.className = 'fit';
    boxZoom.textContent = 'Ware grootte';
    boxCap.textContent = alt || '';
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    boxClose.focus();
  }
  function closeBox() {
    if (!box || box.hidden) return;
    box.hidden = true; boxImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMenu(false); closeBox(); } });
  document.addEventListener('click', function (e) {
    var s = e.target.closest('.shot');
    if (s && box) { e.preventDefault(); var img = s.querySelector('img'); openBox(img.currentSrc || img.src, img.alt); }
  });
  if (box) {
    boxClose.addEventListener('click', closeBox);
    boxZoom.addEventListener('click', function () {
      var fit = boxImg.classList.toggle('fit');
      boxZoom.textContent = fit ? 'Ware grootte' : 'Passend maken';
    });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('lightbox__stage')) closeBox(); });
  }
})();
