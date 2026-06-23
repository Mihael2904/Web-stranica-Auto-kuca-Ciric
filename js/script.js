const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });
}

const form = document.getElementById('kontakt-form');
const feedback = document.getElementById('form-feedback');

if (form) {
  const ime = document.getElementById('ime');
  const email = document.getElementById('email');
  const telefon = document.getElementById('telefon');
  const marka = document.getElementById('marka');
  const poruka = document.getElementById('poruka');

  function postaviGresku(id, porukaTekst) {
    document.getElementById(id).textContent = porukaTekst;
  }

  function ocistiGreske() {
    postaviGresku('ime-error', '');
    postaviGresku('email-error', '');
    postaviGresku('telefon-error', '');
    postaviGresku('marka-error', '');
    postaviGresku('poruka-error', '');
    feedback.className = 'form-feedback';
    feedback.textContent = '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    ocistiGreske();

    let validno = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (ime.value.trim().length < 5) {
      postaviGresku('ime-error', 'Unesite ime i prezime.');
      validno = false;
    }

    if (!emailRegex.test(email.value.trim())) {
      postaviGresku('email-error', 'Unesite ispravnu e-mail adresu.');
      validno = false;
    }

    if (telefon.value.trim().length < 8) {
      postaviGresku('telefon-error', 'Unesite ispravan broj telefona.');
      validno = false;
    }

    if (marka.value === '') {
      postaviGresku('marka-error', 'Odaberite marku vozila.');
      validno = false;
    }

    if (poruka.value.trim().length < 10) {
      postaviGresku('poruka-error', 'Poruka mora imati najmanje 10 znakova.');
      validno = false;
    }

    if (!validno) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Obrazac nije ispravno ispunjen. Provjerite označena polja.';
      return;
    }

    const kontaktPodaci = {
      ime: ime.value.trim(),
      email: email.value.trim(),
      telefon: telefon.value.trim(),
      marka: marka.value,
      poruka: poruka.value.trim(),
      vrijeme: new Date().toLocaleString('hr-HR')
    };

    localStorage.setItem('kontakt-upit-ciric', JSON.stringify(kontaktPodaci));

    feedback.className = 'form-feedback success';
    feedback.textContent = 'Upit je uspješno spremljen u lokalnu memoriju preglednika.';
    form.reset();
  });

  document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (!navToggle || !mainNav) return;

  navToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 900) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
}