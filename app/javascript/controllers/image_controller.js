import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "preview"]

  preview() {
    const file = this.inputTarget.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.previewTarget.innerHTML = `<img src="${e.target.result}">`
      }
      reader.readAsDataURL(file)
    }
  }

  validateSize() {
    const file = this.inputTarget.files[0]
    if (file && file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter menos que 10MB")
      this.inputTarget.value = ""
      this.previewTarget.innerHTML = ""
    }
  }
}

