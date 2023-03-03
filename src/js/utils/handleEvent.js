handleEvent(e) {
    const handleKeyDown = e => {
        switch (e.keyCode) {
            case 33:
            case 38:
                this._goto(this.active - 1);
                break;
            case 32:
            case 34:
            case 40:
                this._goto(this.active + 1);
                break;
            case 36:
                this._goto(1);
                break;
            case 35:
                this._goto(this.pageTotal);
                break;
        }
    };
    const handleMouseWheel = e => {
        const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
        if (delta < 0) {
            this._goto(this.active + 1);
        } else {
            this._goto(this.active - 1);
        }
    };
    const handleTouchStart = e => {
        const touches = e.touches;
        if (touches && touches.length) {
            this._touchStartY = touches[0].pageY;
            document.addEventListener('touchmove', this);
        }
    };
    const handleTouchMove = e => {
        const touches = e.touches;
        if (touches && touches.length) {
            e.preventDefault();
            const deltaY = this._touchStartY - touches[0].pageY;
            if (deltaY >= 50) {
                this._goto(this.active + 1);
            }
            if (deltaY <= -50) {
                this._goto(this.active - 1);
            }
            if (Math.abs(deltaY) >= 50) {
                document.removeEventListener('touchmove', this);
            }
        }
    };
    switch (e.type) {
        case 'keydown':
            handleKeyDown(e);
            break;
        case 'mousewheel':
        case 'DOMMouseScroll':
            handleMouseWheel(e);
            break;
        case 'touchstart':
            handleTouchStart(e);
            break;
        case 'touchmove':
            handleTouchMove(e);
    }
}