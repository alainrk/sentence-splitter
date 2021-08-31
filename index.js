const language = require('@google-cloud/language')
const config = require('./service-account-key-text-analysis.json')

const client = new language.LanguageServiceClient({
  credentials: config 
})

async function main () {
  if (process.argv.length !== 3) {
    console.log(`Usage:\n\t${process.argv[0]} "phrase"`)
    process.exit(1)
  }
  const text = process.argv[2] // 'i eat a pizza but i also want a drink'

  const document = {
    content: text,
    type: 'PLAIN_TEXT'
  }

  const encodingType = 'UTF8'

  const [syntax] = await client.analyzeSyntax({ document, encodingType })
  // console.log(JSON.stringify(syntax.sentences, ' ', 2))
  console.log(JSON.stringify(syntax, ' ', 2))

  console.log('Tokens:')
  const sentences = []
  let currentSentence = ''
  for (const part of syntax.tokens) {
    if (part.partOfSpeech.tag === 'PUNCT') continue
    if (part.partOfSpeech.tag === 'CONJ') {
      if (currentSentence) {
        sentences.push(currentSentence.trim())
      }
      currentSentence = ''
      continue
    }
    currentSentence += ` ${part.text.content}`
    // console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
    // console.log('Morphology:', part.partOfSpeech);
  }
  if (currentSentence) {
    sentences.push(currentSentence.trim())
  }

  console.log(sentences)
}

main()
