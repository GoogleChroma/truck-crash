(function () {
    'use strict';

    const LEFT_IMAGE_URL = 'https://media.gettyimages.com/id/2102523384/photo/long-haul-semi-truck-on-a-western-usa-interstate-highway.jpg?s=612x612&w=gi&k=20&c=Mv5uCmC6NdJWYSadCxM_KEhkAAaSDmqI1JgT5C5pPAE=';
    const RIGHT_IMAGE_URL = 'https://cdn.britannica.com/17/126517-050-9CDCBDDF/semi-semitrailer-truck-tractor-highway.jpg';
    const BACKGROUND_IMAGE_URL = 'https://t3.ftcdn.net/jpg/07/94/53/94/360_F_794539452_1W9RpBac8VN4ic7aRKma3QWmEVoLZvCv.jpg';

    const WAIT_TIME = 1000;
    const MOVE_TIME = 2000;
    const COMPRESS_TIME = 500;


    const overlay = document.createElement('div');

    overlay.id = 'image-meet-overlay';

    Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        width: '100vw',
        height: '100vh',
        background: '#fff',
        zIndex: '2147483647',
        display: 'none',
        overflow: 'hidden',
        margin: '0',
        padding: '0',
    });

    document.body.appendChild(overlay);

    const backgroundImage = document.createElement('img');

    backgroundImage.src = BACKGROUND_IMAGE_URL;

    Object.assign(backgroundImage.style, {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: '0',
        transition: 'opacity 0.25s ease',
        zIndex: '1',
        pointerEvents: 'none',
    });

    overlay.appendChild(backgroundImage);

    const leftImage = document.createElement('img');

    leftImage.src = LEFT_IMAGE_URL;

    Object.assign(leftImage.style, {
        position: 'absolute',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        maxWidth: '40vw',
        maxHeight: '70vh',
        objectFit: 'contain',
        zIndex: '2',
        pointerEvents: 'none',
        transformOrigin: 'center center',
    });

    overlay.appendChild(leftImage);

    const rightImage = document.createElement('img');

    rightImage.src = RIGHT_IMAGE_URL;

    Object.assign(rightImage.style, {
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        maxWidth: '40vw',
        maxHeight: '70vh',
        objectFit: 'contain',
        zIndex: '2',
        pointerEvents: 'none',
        transformOrigin: 'center center',
    });

    overlay.appendChild(rightImage);

    let animationRunning = false;

    function activateAnimation() {
        if (animationRunning) return;

        animationRunning = true;

        overlay.style.display = 'block';

        backgroundImage.style.opacity = '0';

        leftImage.style.transition = 'none';
        rightImage.style.transition = 'none';

        leftImage.style.left = '0';
        rightImage.style.right = '0';

        leftImage.style.transform = 'translateY(-50%) scaleX(1)';
        rightImage.style.transform = 'translateY(-50%) scaleX(1)';

        void overlay.offsetWidth;

        setTimeout(() => {

            leftImage.style.transition =
                `left ${MOVE_TIME}ms cubic-bezier(0.4, 0, 0.2, 1)`;

            rightImage.style.transition =
                `right ${MOVE_TIME}ms cubic-bezier(0.4, 0, 0.2, 1)`;

            leftImage.style.left = '50%';
            rightImage.style.right = '50%';

            setTimeout(() => {

                backgroundImage.style.opacity = '1';

                leftImage.style.transition =
                    `transform ${COMPRESS_TIME}ms ease-in`;

                rightImage.style.transition =
                    `transform ${COMPRESS_TIME}ms ease-in`;

                leftImage.style.transform =
                    'translateY(-50%) translateX(-50%) scaleX(0.05)';

                rightImage.style.transform =
                    'translateY(-50%) translateX(50%) scaleX(0.05)';

                setTimeout(() => {
                    animationRunning = false;
                }, COMPRESS_TIME);

            }, MOVE_TIME);

        }, WAIT_TIME);
    }

    function resetAnimation() {
        animationRunning = false;

        overlay.style.display = 'none';

        backgroundImage.style.opacity = '0';

        leftImage.style.transition = 'none';
        rightImage.style.transition = 'none';

        leftImage.style.left = '0';
        rightImage.style.right = '0';

        leftImage.style.transform = 'translateY(-50%) scaleX(1)';
        rightImage.style.transform = 'translateY(-50%) scaleX(1)';
    }

    document.addEventListener('keydown', function (event) {


        if (event.key === 'q') {

            if (overlay.style.display === 'none') {
                activateAnimation();
            } else {
                resetAnimation();
            }

        }

    });

})();

