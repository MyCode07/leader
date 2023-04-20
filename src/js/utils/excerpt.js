export function excerpt(text, words) {
    let exc = text.split(' ');

    if (exc.length <= words) {
        return
    }

    exc = exc.splice(0, words)

    exc = exc.join(' ') + ' ...'
    
    return exc;
}