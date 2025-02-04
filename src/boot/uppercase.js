export default ({ app }) => {
  app.directive('uppercase', {
    mounted(el) {
      el.addEventListener("input", (event) => {
        const uppercasedValue = event.target.value.toUpperCase();

        if (event.target.value !== uppercasedValue) {
          event.target.value = uppercasedValue;

          const inputEvent = new Event("input", { bubbles: true });
          event.target.dispatchEvent(inputEvent);
        }
      })
    }
  })
}
