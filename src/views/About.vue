<template>
  <div>
    <v-container class="about">
      <v-layout wrap>
        <v-flex xs12>
          <v-img
            :src="require('../../public/icon.svg')"
            class="my-3"
            contain
            height="120"
          ></v-img>
          <h1>割り勘計算ツールについて</h1>
          <h2 class="mt-4 mb-3 pa-2">目的</h2>
          <p>傾斜をつけた割り勘の計算ができるWebアプリです。</p>
          <p>傾斜は5段階の中から選択、または手動で調節することも可能です。通常の傾斜だけでなく、男気や運試しモードなどの計算方法も実装してあります。</p>
          <p>飲み会等でご利用ください。</p>

          <h2 class="mt-4 mb-2 pa-2">使い方</h2>
          <ol>
            <li>「1.参加者を入力」タブ画面で、参加人数をボタンを押して入力</li>
            <li>必要に応じて、各参加者の名前や傾斜レベルを入力</li>
            <li>画面上部にある「2.料金の計算」タブをタップして画面を移動</li>
            <li>枠内の料金フォームをタップして支払った総額料金を入力</li>
            <li>必要に応じて、計算モードや参加者の傾斜指数を設定</li>
            <!-- <li>※特定参加者の支払料金が固定の場合はテーブル内の金額フォームを入力した後、固定チェックボックスをタップ</li> -->
          </ol>

          <h3 class="mt-3 mb-2">状態のリセット</h3>
          <p>画面左上の電卓アイコンをタップすることで、リセット(再読込)が可能です。</p>
          <h3 class="mt-3 mb-2">スマホアプリとして利用する</h3>
          <p>本アプリはPWAに対応しているため、スマホのホーム画面に追加することで、ネイティブアプリのように利用することができます。</p>
          <a href="https://magnets.jp/web_design/9341/" target="_blank">PWAでウェブアプリとしてスマホのホーム画面に追加しよう</a>

          <h2 class="mt-4 mb-2 pa-2">ご意見、ご要望</h2>
          <p class="my-1">ご要望や不具合などのご連絡は、お手数ですが以下の方法でご連絡をお願いいたします。</p>
          <ul class="mt-2 mx-auto" style="width:fit-content;">
            <li style="width:fit-content;">
              ハッシュタグ<a>#warikantool</a>とメンション<a>@icchi_h</a>をつけて<a href="https://twitter.com/intent/tweet?hashtags=warikantool&via=icchi_h" target="popup">ツイート</a>
            </li>
            <li style="width:fit-content;"><a href="https://twitter.com/icchi_h" target="_blank">@icchi_h</a> へダイレクトメッセージ</li>
          </ul>
        </v-flex>
      </v-layout>
      <Footer/>
    </v-container>
  </div>
</template>

<script>
import Footer from '../components/Footer'
export default {
  components: {
    Footer
  }
}
</script>

<style scoped>
.about {
  font-size: 16px;
}

h2 {
  border-left: solid 2px #f5f5f5;
}
h3 {
  border-bottom: solid 2px #f5f5f5;
}

p {
  margin: 8px 0;
}
</style>
