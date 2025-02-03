export default ({ app }) => {
  app.directive('lowercase', {
    mounted(el) {
      el.addEventListener('input', (event) => {
        const lowercasedValue = event.target.value.toLowerCase()

        if (event.target.value !== lowercasedValue) {
          event.target.value = lowercasedValue

          if (event.target.type !== 'email') {
            const start = event.target.selectionStart
            const end = event.target.selectionEnd
            event.target.setSelectionRange(start, end)
          }

          const inputEvent = new Event('input', { bubbles: true })
          event.target.dispatchEvent(inputEvent)
        }
      })
    }
  })
}
