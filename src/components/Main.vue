<template>
  <v-container fill-height class="pa-0">
    <v-layout wrap text-xs-center>
      <v-flex>
        <v-tabs
          slot="extension"
          v-model="tab"
          fixed-tabs
          color="transparent"
          class="mb-2"
          slider-color="primary"
        >
          <!-- <v-tabs-slider color="primary"></v-tabs-slider> -->

          <v-tab href="#tab1" class="subheading font-weight-medium tab">1. 参加者を入力</v-tab>
          <v-tab href="#tab2" class="subheading font-weight-medium tab">2. 料金の計算</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pt-3 px-3">
          <v-tab-item value="tab1" class="py-2 tab-content">
            <h3 class="font-weight-regular">参加したメンバーを入力してから「2.計算」タブに移動して下さい</h3>

            <div class="counter mt-4">
              <h4>参加人数</h4>
              <div class="counter-content">
                <v-btn fab light @click="removePerson()" class="headline font-weight-bold">ー</v-btn>
                <span class="mx-2">
                  <span class="display-1">{{member.length}}</span>
                  <span>人</span>
                </span>
                <v-btn fab light @click="addPerson()" class="headline font-weight-bold">＋</v-btn>
              </div>
            </div>
            <div class="member-list mt-4">
              <v-card
                light
                v-for="(person, idx) in member"
                :key="person.id"
                class="person mb-2 mx-auto pa-2"
              >
                <v-icon style="font-size:32px;">person</v-icon>
                <div class="mr-2">
                  <v-text-field
                    v-model="person.name"
                    flat
                    label="名前"
                    hide-details
                    class="text-input ml-2"
                  />
                </div>
                <!-- <v-spacer/> -->
                <div class="ml-auto">
                  <v-select
                    v-model="person.level"
                    :items="levels"
                    item-text="label"
                    item-value="level"
                    label="傾斜レベル"
                    light
                    hide-details
                    outline
                    class="selecter"
                    @change="updateLevel($event, idx)"
                  />
                </div>
                <v-icon @click="removePerson(idx)" class="ma-2">delete</v-icon>
              </v-card>
            </div>
            <Footer/>
          </v-tab-item>

          <v-tab-item value="tab2" class="tab-content tab2-content pt-2">
            <h3 class="font-weight-regular param-inputs-label">金額を入力して下さい</h3>
            <div class="price-input-wrap mt-2 pa-3 pb-4 mx-auto">
              <div>
                <h2 class="subheading font-weight-bold charge-input-label">お店に支払った金額</h2>
                <money
                  v-model="params.charge"
                  v-bind="{
                    thousands: ',',
                    suffix: ' 円',
                    precision: 0,
                    masked: false
                  }"
                  class="headline font-weight-medium ma-1 pa-1 money-input charge-input"
                  style="width: 160px;"
                ></money>
              </div>
              <div class="mt-2">
                <h4 class="minunit-input-label">分割金額の最小単位</h4>
                <money
                  v-model="params.minUnit"
                  v-bind="{
                    thousands: ',',
                    suffix: ' 円',
                    precision: 0,
                    masked: false,
                  }"
                  class="title font-weight-regular money-input minunit-input"
                  style="width: 120px;"
                ></money>
              </div>
            </div>
            <div class="mode-selector mt-4">
              <h4 class="calc-mode-label">計算モード</h4>
              <v-radio-group
                v-model="calcMode"
                row
                hide-details
                class="mt-0 mx-auto"
                style="width:fit-content;"
                @change="changeCalcMode"
              >
                <v-radio
                  v-for="mode in calcModes"
                  :key="mode"
                  :label="mode"
                  :value="mode"
                  color="primary"
                  class="ma-2"
                >{{mode}}</v-radio>
              </v-radio-group>
            </div>

            <div class="my-4">
              <v-btn large color="primary" class="calc-btn" @click="calcBill()">計算</v-btn>
            </div>

            <div class="collect-summary mt-2 pa-1">
              <div class="collect-summary-item px-3 mx-auto">
                <span>集金額：</span>
                <money
                  v-model="summary.sum"
                  v-bind="{
                    thousands: ',',
                    suffix: ' 円',
                    precision: 0,
                    masked: false,
                  }"
                  disabled
                  style="width:160px;"
                  class="title font-weight-regular money-input summary-input summary-sum-input"
                />
              </div>
              <div class="collect-summary-item px-3 mx-auto">
                <!-- eslint-disable-next-line -->
                <span>余り ：</span>
                <money
                  v-model="summary.rem"
                  v-bind="{
                    thousands: ',',
                    suffix: ' 円',
                    precision: 0,
                    masked: false,
                  }"
                  disabled
                  style="width:160px;"
                  class="title font-weight-regular money-input summary-input summary-rem-input"
                />
              </div>
            </div>

            <v-data-table
              :items="member"
              class="elevation-1 mt-4"
              :headers="headerOption"
              hide-actions
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="pa-0">
                  <v-text-field
                    v-model="props.item.rate"
                    flat
                    label="比率"
                    type="number"
                    hide-details
                    single-line
                    :disabled="props.item.fixed"
                    class="text-input mt-0 pt-0 text-xs-right"
                    style="width:32px;"
                  />
                </td>
                <td class="pa-1">
                  <v-edit-dialog
                    v-if="!props.item.fixed"
                    :return-value.sync="props.item.price"
                    lazy
                    large
                    class="mx-auto"
                    style="width:fit-content;"
                  >
                    <money
                      :value="props.item.price"
                      v-bind="{
                        thousands: ',',
                        suffix: ' 円',
                        precision: 0,
                        masked: false,
                      }"
                      :disabled="props.item.fixed"
                      style="width:88px;"
                      class="money-input subheading"
                    />
                    <money
                      slot="input"
                      v-model="props.item.price"
                      v-bind="{
                        thousands: ',',
                        suffix: ' 円',
                        precision: 0,
                        masked: false,
                      }"
                      :disabled="props.item.fixed"
                      style="width:88px;"
                      class="money-input subheading"
                    />
                  </v-edit-dialog>
                  <money
                    v-else
                    v-model="props.item.price"
                    v-bind="{
                      thousands: ',',
                      suffix: ' 円',
                      precision: 0,
                      masked: false,
                    }"
                    :disabled="props.item.fixed"
                    style="width:88px;"
                    class="money-input subheading"
                  />
                </td>
                <td class="pa-0">
                  <v-checkbox
                    v-model="props.item.fixed"
                    hide-details
                    color="primary"
                    style="justify-content: center;"
                  ></v-checkbox>
                </td>
              </template>
            </v-data-table>
            <v-layout class="act-btns mt-2 pa-1m mb-1 mx-auto">
              <v-flex class="pr-1">
                <v-btn color="secondary" class="ma-0 act-btn" @click="copy">結果をコピー</v-btn>
              </v-flex>
              <v-flex class="pl-1">
                <v-btn color="secondary" class="ma-0 act-btn" @click="share">
                  <v-icon>share</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <Footer/>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="snackbar.show" bottom>
      {{snackbar.message}}
      <v-btn color="pink" flat @click="snackbar.show = false">close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import Footer from "../components/Footer";
import { levels, getPerson } from "../utils/member";
import { getAveragePrice } from "../utils/price";
import { Money } from "v-money";
import copy2clipboard from "copy-to-clipboard";

export default {
  components: {
    Footer,
    Money
  },
  data: () => ({
    tab: null,
    levels,

    // tab1
    member: [getPerson("member1", "参加者1"), getPerson("member2", "参加者2")],
    personCounter: 2,

    // tab2
    headerOption: [
      {
        text: "名前",
        value: "name",
        sortable: false,
        align: "center"
      },
      {
        text: "傾斜",
        value: "rate",
        sortable: false,
        width: "1%",
        align: "center"
      },
      { text: "金額", value: "price", sortable: true, align: "center" },
      {
        text: "固定",
        value: "fixed",
        sortable: false,
        width: "1%",
        align: "center"
      }
    ],
    params: {
      charge: 0,
      minUnit: 100
    },
    calcModes: ["傾斜", "きっちり割り勘", "男気", "運試し"],
    calcMode: "傾斜",
    summary: {
      sum: 0,
      rem: 0
    },
    snackbar: {
      show: false,
      message: ""
    }
  }),
  methods: {
    // tab1
    addPerson() {
      this.personCounter += 1;
      this.member.push(
        getPerson("person" + this.personCounter, "参加者" + this.personCounter)
      );
    },
    removePerson(idx = this.member.length - 1) {
      this.member.splice(idx, 1);
    },
    updateLevel(level, idx) {
      // console.log('idx:', idx)
      // console.log('level:', level)
      this.member[idx].rate = levels[level - 1].rate;
    },

    // tab2
    changeCalcMode() {
      // switch
      // 傾斜
      if (this.calcMode === this.calcModes[0]) {
        for (let i in this.member) {
          this.member[i].rate = this.levels[this.member[i].level - 1].rate;
        }
        // eslint-disable-next-line
      }
      // きっちり割り勘
      else if (this.calcMode === this.calcModes[1]) {
        // set same rate
        for (let person of this.member) {
          person.rate = 1;
        }
        // eslint-disable-next-line
      }
      // 男気
      else if (this.calcMode === this.calcModes[2]) {
        const otokogiRate = 3;

        for (let i in this.member) {
          // this.member[i].rate = Number((this.levels[this.member[i].level - 1].rate ** this.levels[this.member[i].level - 1].rate ).toFixed(2))
          this.member[i].rate = Number(
            (
              this.levels[this.member[i].level - 1].rate ** otokogiRate
            ).toFixed()
          );
        }
        // eslint-disable-next-line
      }
      // 運試し
      // else if (this.calcMode === this.calcModes[3]) {
      //   // set random rate
      //   for (let person of this.member) {
      //     person.rate = Number(Math.random().toFixed(2));
      //   }
      // }
    },
    calcBill() {
      // 運試し
      if (this.calcMode === this.calcModes[3]) {
        const minRate = 0.15;
        // set random rate
        for (let person of this.member) {
          person.rate = Number(
            (Math.random() * (1 - minRate) + minRate).toFixed(2)
          );
        }
      }

      if (this.member && this.member.length !== 0) {
        let average = getAveragePrice(this.params.charge, this.member);
        for (let person of this.member) {
          // update rate
          if (!person.fixed) {
            person.price =
              Math.ceil((average * person.rate) / this.params.minUnit) *
              this.params.minUnit;
          }
        }
      }

      this.calcSummary();

      // scroll
      this.$vuetify.goTo(".collect-summary");
    },
    calcSummary() {
      // calc summary
      let collectSum = 0;
      for (let person of this.member) {
        collectSum += person.price;
      }
      this.summary.sum = collectSum;
      this.summary.rem = collectSum - this.params.charge;
    },

    getResult() {
      const header =
        this.headerOption
          .filter((item, idx) => idx < 3)
          .map(item => item.text)
          .join("\t") + "\n";
      const content = this.member
        .map(item => [item.name, item.rate, item.price].join("\t"))
        .join("\n");
      return header + content;
    },
    copy() {
      try {
        copy2clipboard(this.getResult());
        this.snackbar.message = "コピーしました";
      } catch (e) {
        this.snackbar.message = "コピーに失敗しました";
      }
      this.snackbar.show = true;
    },
    share() {
      if (window.navigator.share) {
        window.navigator.share({
          url: "https://warikan.tool.icchi.me",
          title: "割り勘計算ツール",
          text: this.getResult()
        });
      } else {
        this.snackbar.message = "ご利用の環境ではShare APIが利用できません";
        this.snackbar.show = true;
      }
    }
  }
};
</script>

<style>
.money-input {
  -webkit-text-fill-color: inherit;
  opacity: 1;
  box-shadow: 0 0 6px 0 rgba(233, 30, 99, 0.9);
}
.money-input:focus {
  outline: 0;
  border: solid 1px rgba(233, 30, 99, 0.8);
  box-shadow: 0 0 12px 0 rgba(233, 30, 99, 0.9);
}
.money-input:disabled {
  box-shadow: 0 0 2px 0 rgba(233, 30, 99, 0);
}

.tab {
  width: 50%;
  font-size: 18px;
}

.tab-content {
  height: calc(100vh - (56px + 48px + 32px));
  overflow-y: auto;
}

/* tab1 */
.counter-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected-list {
  max-width: 600px;
  border-radius: 4px;
}

/* .member-list { */
/* height: calc(100vh - (56px + 48px + 280px));
  overflow-y: auto; */
/* } */

.person {
  display: flex;
  max-width: 600px;
}

.text-input {
  /* width: 96px; */
  display: inline-block;
}
.selecter {
  width: 128px;
  display: inline-block;
}

/* tab2 */
.tab2-content {
  flex: 1;
}

.price-input-wrap {
  border: solid 2px #f5f5f5;
  border-radius: 4px;
  max-width: 560px;
}

.money-input {
  text-align: right;
  padding: 4px;
  max-width: 100%;
}

.calc-btn {
  font-weight: bold;
  width: 100%;
  max-width: 560px;
  margin: 0;
}

.collect-summary-item {
  width: fit-content;
  border-bottom: solid 2px #f5f5f5;
}

.act-btns {
  width: 100%;
  max-width: 560px;
}
.act-btn {
  width: 100%;
  margin: 0;
}
</style>
