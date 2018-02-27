import NativeIntersectionObserverFallback from './NativeIntersectionObserverFallback';

const NativeIntersectionObserver = window.IntersectionObserver || NativeIntersectionObserverFallback;

export default class IntersectionObserver {
    constructor(element) {
        /**
         * The Observer
         *
         * @type {IntersectionObserver | NativeIntersectionObserverFallback}
         * @private
         */
        this._observer = new NativeIntersectionObserver((...args) => this._callback(...args), {
            root: element,
        });

        /**
         * A map to store element-callback-pairs
         * @type {WeakMap<Element, Function>}
         * @private
         */
        this._observerCallbacks = new WeakMap();
    }

    /**
     * The callback for the native intersection observer
     *
     * @param {Array<IntersectionObserverEntry>} entries
     * @private
     */
    _callback(entries) {
        entries.forEach((observerEntry) => {
            const element = observerEntry.target;

            if(this._observerCallbacks.has(element)) {
                this._observerCallbacks.get(element)(observerEntry);
            }
        })
    }

    /**
     * Observe a new element and store a custom callback
     * @param {Element} element
     * @param {Function} callback
     */
    observe(element, callback) {
        this._observerCallbacks.set(element, callback);
        this._observer.observe(element);
    }

    /**
     * Remove an element from observation
     * @param {Element} element
     */
    unobserve(element) {
        this._observerCallbacks.delete(element);
        this._observer.unobserve(element);
    }
}

