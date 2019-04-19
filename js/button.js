{
    setTimeout(() => document.body.classList.add('render'), 60);
    const navbuttons = Array.from(document.querySelectorAll('nav.buttons > .button'));
    const total = navbuttons.length;
    const current = navbuttons.findIndex(el => el.classList.contains('button--current'));
    const navigate = (linkEl) => {
        document.body.classList.remove('render');
        document.body.addEventListener('transitionend', () => window.location = linkEl.href);
    };
    navbuttons.forEach(link => link.addEventListener('click', (ev) => {
        ev.preventDefault();
        navigate(ev.target);
    }));
    document.addEventListener('keydown', (ev) => {
        const keyCode = ev.keyCode || ev.which;
        let linkEl;
        if ( keyCode === 37 ) {
            linkEl = current > 0 ? navbuttons[current-1] : navbuttons[total-1];
        }
        else if ( keyCode === 39 ) {
            linkEl = current < total-1 ? navbuttons[current+1] : navbuttons[0];
        }
        else {
            return false;
        }
        navigate(linkEl);
    });
    imagesLoaded('.glitch__img', { background: true }, () => {
        document.body.classList.remove('loading');
        document.body.classList.add('imgloaded');
    });
}
