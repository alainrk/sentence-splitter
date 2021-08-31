const language = require('@google-cloud/language')
const config = require('./config/key.json')

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
  console.log(JSON.stringify(syntax, ' ', 2))

  const sentences = []

  let tokens = []
  let lastVerbIdx = Infinity

  for (const part of syntax.tokens) {
    if (part.partOfSpeech.tag === 'PUNCT') continue
    
    if (part.partOfSpeech.tag === 'VERB') {
      lastVerbIdx = tokens.length
    }

    if (part.partOfSpeech.tag === 'CONJ') {
      if (tokens.length > lastVerbIdx) {
        sentences.push(tokens.join(' '))
        tokens = []
        lastVerbIdx = Infinity
      } else {
        if (sentences.length) {
          sentences[sentences.length - 1] += ' ' + tokens.join(' ')
          tokens = []
        }
      }
    }

    tokens.push(part.text.content)
  }
  
  if (tokens.length) {
    sentences.push(tokens.join(' '))
  }

  console.log(sentences)
}

main()
