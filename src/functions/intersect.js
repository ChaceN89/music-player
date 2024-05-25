// intersect.js
export default {
    mounted(el, binding) {
      const options = {
        root: null,
        threshold: 0.1,
      };
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            binding.value(entry, observer);
          }
        });
      }, options);
  
      observer.observe(el);
    },
    unmounted(el) {
      if (el._observer) {
        el._observer.disconnect();
      }
    }
  };
  