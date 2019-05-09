/* eslint-disable no-console */

import {
  register
} from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
      alert("新しいバージョンが見つかりました。\n 更新を開始します。")
    },
    updated() {
      console.log('New content is available; please refresh.')
      if (window.location) {
        if (confirm("更新が終了しました。\n適用するためにリロードしますか?")) {
          console.log('Start to refresh.');
          window.location.reload(true);
        }
      } else {
        console.error('Error: Failed to refresh.');
      }
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
