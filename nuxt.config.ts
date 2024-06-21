export default defineNuxtConfig({
  runtimeConfig: {
    OPENAI_KEY: process.env.OPENAI_KEY,
    public: {
      XRAPID_KEY: process.env.XRAPID_KEY
    }
  },
  alias: {
    'public': '/<srcDir>/public'
  },
	app: {
    head: {
			link: [
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap' }
			]
		}
	},
})