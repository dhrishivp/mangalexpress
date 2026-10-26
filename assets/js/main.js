(function () {
  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function setNav(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', function () {
    setNav(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setNav(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });

  // Opening hours, in minutes from midnight (UK time). Keyed by getDay(): 0 = Sunday.
  var HOURS = {
    0: [12 * 60, 21 * 60],
    1: null,
    2: [12 * 60, 22 * 60 + 30],
    3: [12 * 60, 22 * 60 + 30],
    4: [12 * 60, 22 * 60 + 30],
    5: [12 * 60, 22 * 60 + 30],
    6: [12 * 60, 22 * 60 + 30]
  };
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function ukNow() {
    // Read the current day and time in the restaurant's time zone, wherever the visitor is.
    var parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    var get = function (type) {
      for (var i = 0; i < parts.length; i++) if (parts[i].type === type) return parts[i].value;
    };
    return { day: DAYS.indexOf(get('weekday')), minutes: +get('hour') * 60 + +get('minute') };
  }

  function fmt(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    var suffix = h >= 12 ? 'pm' : 'am';
    h = h % 12 || 12;
    return h + (m ? ':' + String(m).padStart(2, '0') : '') + suffix;
  }

  function nextOpening(day) {
    for (var i = 1; i <= 7; i++) {
      var d = (day + i) % 7;
      if (HOURS[d]) return { label: i === 1 ? 'tomorrow' : DAYS[d], opens: HOURS[d][0] };
    }
  }

  try {
    var now = ukNow();
    var today = HOURS[now.day];

    var row = document.querySelector('.hours tr[data-day="' + now.day + '"]');
    if (row) row.classList.add('is-today');

    var status = document.querySelector('[data-open-status]');
    if (status) {
      if (today && now.minutes >= today[0] && now.minutes < today[1]) {
        status.textContent = 'Open now, until ' + fmt(today[1]);
        status.classList.add('is-open');
      } else if (today && now.minutes < today[0]) {
        status.textContent = 'Closed now, opens today at ' + fmt(today[0]);
      } else {
        var next = nextOpening(now.day);
        status.textContent = 'Closed now, opens ' + next.label + ' at ' + fmt(next.opens);
      }
    }
  } catch (e) {
    // Older browsers without Intl time zone support simply skip the status line.
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
