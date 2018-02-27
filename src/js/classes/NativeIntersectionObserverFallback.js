export default class NativeIntersectionObserverFallback {
    /**
     * Setup the fallback instance
     * @param callback
     */
    constructor(callback) {
        /**
         * @type {Function}
         */
        this.callback = callback;

        /**
         * All observed elements
         * @type {Set<Element>}
         */
        this.elements = new Set();

        /**
         * Debounce the callback call
         * @type {null}
         * @private
         */
        this._debounceTimeout = null;
    }

    /**
     * Add a new element to the observe list
     * @param element
     */
    observe(element) {
        this.elements.add(element);
        this._callCallback();
    }

    /**
     * Remove an element from the observation list
     * @param element
     */
    unobserve(element) {
        this.elements.delete(element);
    }

    /**
     * Call the callback (debounced)
     * @private
     */
    _callCallback() {
        clearTimeout(this._debounceTimeout);

        this._debounceTimeout = setTimeout(() => {
            // Create fake IntersectionObserverEntries
            const entries = [...this.elements].map((element) => ({
                isIntersecting: true,
                target        : element,
            }));

            // Execute the callback
            this.callback(entries, this);
        }, 50);
    }
};
