import fs from 'fs';
import { OpenAI } from 'openai';
import { HttpsProxyAgent } from 'https-proxy-agent';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const openai = new OpenAI({
      apiKey: config.OPENAI_KEY,
      httpAgent: new HttpsProxyAgent('http://127.0.0.1:3128')
    });

    // получаем транскрипцию посещения ТТ торговым агентом
    const dialogTranscription = await openai.audio.transcriptions.create({
      file: fs.createReadStream('public/dialog.mp3'),
      model: 'whisper-1',
      response_format: 'text'
    });

    // системное сообщение для openAI запроса к openAI
    const systemMessage =
      'Вы являетесь полезным помощником. На основе следующего текста определите, был ли торговый представитель вежлив, рассказал ли он про акционный товар, напомнил ли он о задолженности, презентовал ли новый товар и рассказал ли о POSM (торговое оборудование в торговой точке). Верните результат в виде объекта с полями: IsAgentPolite, isPromoPresented, isDebtReminded, isNewItemsPresented, isPosmPresented, где каждое значение является true или false на основании анализа текста.';

    // получаем анализ транскрипции по необходимым параметрам
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: dialogTranscription }
      ]
    });

    const dialogAnalysis = (completion.choices[0]?.message?.content)
      .replace(/`/g, '')
      .replace(/json/g, '');

    return { dialogTranscription, dialogAnalysis };
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
});
