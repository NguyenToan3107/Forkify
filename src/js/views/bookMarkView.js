import View from './View.js'
import previewView from './previewView.js'
import icons from 'url:../../img/icons.svg'

class bookMarkView extends View {
    _parentElement = document.querySelector('.bookmarks__list')
    _messageError = 'No recipes found for your query! Please try again.'
    _message = ''

    addHandlerRender(handler) {
        window.addEventListener('load', handler)
    }

    _generateMakeup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
    }

}

export default new bookMarkView()