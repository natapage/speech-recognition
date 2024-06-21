<template>
  <div class="container">
    <header class="header">
      <div class="left-info">
        <h1 class="title">Дата посещения: 21.06.2024</h1>
        <h1 class="title">Название торговой точки: "Десяточка"</h1>
      </div>
      <div class="right-info">
        <h1 class="title">Агент: Воронина А.П.</h1>
      </div>
    </header>

    <section class="audio-section">
      <audio
        controls
        src="https://github.com/natapage/hackathon/raw/main/dialog.mp3"
      ></audio>
    </section>

    <section class="text-section">
      <p>{{ text }}</p>
    </section>

    <section class="table-section">
      <n-table :single-line="false">
        <thead>
          <tr>
            <th>Маркер</th>
            <th>Результат</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Рассказ о новых акциях</td>
            <td>
              <icon :isArswerReceived="analisys.isPromoPresented" />
            </td>
          </tr>
          <tr>
            <td>Напоминание о дебиторской задолженности</td>
            <td>
              <icon :isArswerReceived="analisys.isDebtReminded" />
            </td>
          </tr>
          <tr>
            <td>Презентация нового товара</td>
            <td>
              <icon :isArswerReceived="analisys.isNewItemsPresented" />
            </td>
          </tr>
          <tr>
            <td>Размещение POSM</td>
            <td>
              <icon :isArswerReceived="analisys.isPosmPresented" />
            </td>
          </tr>
          <tr>
            <td>Вежливость агента в ТТ</td>
            <td>
              <icon :isArswerReceived="analisys.IsAgentPolite" />
            </td>
          </tr>
        </tbody>
      </n-table>
    </section>
    <div class="percent">
      Процент выполнения: <b>{{ percent }}%</b>
    </div>
  </div>
</template>

<script setup>
import { AVCircle } from 'vue-audio-visual';
import { NTable } from 'naive-ui';
import Icon from './components/icon.vue';
const { data } = await useFetch('/api/transcription');
const text = data.value.dialogTranscription;
const analisys = JSON.parse(data.value.dialogAnalysis);

let trueCount = 0;
for (const key in analisys) {
  if (analisys[key] === true) {
    trueCount++;
  }
}

const percent = (trueCount / Object.keys(analisys).length) * 100;
</script>

<style scoped>
.container {
  font-family: 'Exo 2', sans-serif;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background-color: #7c4cab;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: top;
  border-radius: 5px;
}

.title {
  color: white;
  margin: 0;
  font-size: 20px;
}

.percent {
  font-size: 28px;
}

.left-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.right-info {
  text-align: right;
}

.audio-section {
  display: flex;
  align-items: center;
  margin: 20px 0;
  background-color: #f1e6fc;
  padding: 10px;
  border-radius: 5px;
}

.text-section {
  margin: 20px 0;
  background-color: #c8b3dd;
  padding: 10px;
  border-radius: 5px;
}

.table-section {
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background-color: #623c88;
  color: white;
  padding: 10px;
}

tbody td {
  border: 1px solid #c8b3dd;
  padding: 10px;
}
</style>
