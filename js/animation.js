async function bouncing(particle, left, top,container) {
    if(!$(particle).is(':visible')){
        return;
    }
    container = container || document.body;

    const containerHeight = $(container).height() - $(particle).height();
    const containerWidth = +$(container).width() - $(particle).width();

    let vLeft = +left.replace('px', '');
    let vTop = +top.replace('px', '');

    const currentTop = +$(particle).css('top').trim().replace('px', '');
    const currentLeft = +$(particle).css('left').trim().replace('px', '');

    let destinationTop = currentTop + vTop;
    let destinationLeft = currentLeft + vLeft;

    let nextVTop = (destinationTop >= containerHeight || destinationTop <= 0) ? `${-vTop}px` : `${vTop}px`;
    let nextVLeft = (destinationLeft >= containerWidth || destinationLeft <= 0) ? `${-vLeft}px` : `${vLeft}px`;

    if(destinationTop > containerHeight){
        destinationTop = containerHeight;
    }else if(destinationTop < 0){
        destinationTop = 0;
    }

    if(destinationLeft > containerWidth){
        destinationLeft = containerWidth;
    }else if(destinationLeft < 0){
        destinationLeft = 0;
    }


    $(particle).animate({
        top: `${destinationTop}px`,
        left: `${destinationLeft}px`
    }, 100, async () => bouncing(particle, nextVLeft, nextVTop, container))
}

const vectors = [
    { left: '4px', top: '6px' },
    { left: '-5px', top: '4px' },
    { left: '3px', top: '-4px' },
    { left: '-3px', top: '-5px' },
    { left: '5px', top: '3px' },
    { left: '-4px', top: '5px' },
    { left: '6px', top: '-4px' },
    { left: '-6px', top: '-3px' },
    { left: '3px', top: '5px' },
    { left: '-3px', top: '4px' },
    { left: '5px', top: '-6px' },
    { left: '-4px', top: '-5px' },
    { left: '4px', top: '3px' },
    { left: '-5px', top: '6px' },
    { left: '6px', top: '-5px' },
    { left: '-3px', top: '-4px' },
    { left: '3px', top: '5px' },
    { left: '-5px', top: '-4px' }
];

$(document).ready(function () {
    $('.particles').each((i, p) => {
        const {top, left} = vectors[i]
        bouncing(p, left, top);
        $(p).on('click', function (){
            $(p).on('animationend', ()=> $(p).css({display: 'none'}))
            $(p).css({animation: 'popping 1s'})
        })
    })
})