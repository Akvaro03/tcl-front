export default class classToastList {
    static timeRemove = 2500


    static addToast(fun, text) {
        const newToast = { id: Date.now(), text };
        fun(prev => [...prev, newToast])

        setTimeout(() => {
            fun((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
        }, this.timeRemove);
    }
} 