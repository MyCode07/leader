import { fromEvent, lastValueFrom } from 'rxjs';
import { debounceTime, first, mapTo } from 'rxjs/operators';

/**
 * This function allows to get a callback for the scrolling end
 */
export const scrollToElementRef = (parentEle, childEle, options) => {
    if (parentEle.scrollTop === 0) return Promise.resolve(1);
    childEle.scrollIntoView(options);
    return lastValueFrom(
        fromEvent(parentEle, 'scroll').pipe(
            debounceTime(100),
            first(),
            mapTo(true)
        )
    );
};