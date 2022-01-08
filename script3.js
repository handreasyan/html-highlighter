// anchor u focus nodery jisht geta anum , sxala replace anum


const root = document.getElementById('root')
const modal = document.getElementById('modal')

const spanClosingTagLength = '</span>'.length

let timeoutId

let changeableId1
let changeableId2

let innerNode1
let innerNode2

const getStartedSpanLength = (node) => {
  return node.outerHTML.length - node.innerText.length - spanClosingTagLength
}

const findId = (node) => {
  if (node.id) {
    return node.id
  }
  return findId(node.parentElement)
}

const changeData = (selectedColor) => {
  if (changeableId1 && innerNode1) {
    const item1 = document.getElementById(changeableId1)
    item1.innerHTML = innerNode1.replaceAll('mediumaquamarine', selectedColor)
  }

  if (changeableId2 && innerNode2) {
    const item2 = document.getElementById(changeableId2)
    item2.innerHTML = innerNode2.replaceAll('mediumaquamarine', selectedColor)
  }


  innerNode1 = undefined
  changeableId1 = undefined
  innerNode2 = undefined
  changeableId2 = undefined

  modal.style.display = 'none'

  /*
     const arrr = Array.from(document.querySelectorAll('[data-type="highlight"]'))
   arrr.forEach((span) => {
      if (span.nextElementSibling) {
        if (span.nextElementSibling.dataset.type === 'highlight') {
          if (span.nextElementSibling.dataset.color === span.dataset.color) {
            const allHTML = root.innerHTML
            console.log(allHTML)
            const currentSpanStartIndex = allHTML.indexOf(span.outerHTML)
            const nextSpanStartIndex = allHTML.indexOf(span.nextElementSibling.outerHTML)

            const firstPart = allHTML.substring(0, currentSpanStartIndex + (span.outerHTML.length - spanClosingTagLength))


            const lastPart = allHTML.substring(
              currentSpanStartIndex + (span.outerHTML.length - spanClosingTagLength)
              + span.nextElementSibling.outerHTML.length - span.nextElementSibling.innerText.length
            )


            root.innerHTML = firstPart + lastPart

          }
        }
      }
    })
      console.log(arrr)

    */
}


const onSelectionchange = (e) => {
  clearTimeout(timeoutId)

  const selection = document.getSelection()
  console.log(selection)

  if (!selection.toString()?.trim()) return;

  if (selection.anchorNode.data === selection.focusNode.data) {

    const anchorNode = selection.anchorNode?.data?.substring(selection.anchorOffset, selection.focusOffset)
    const id1 = findId(selection.anchorNode)
    const item1 = document.getElementById(id1)
    changeableId1 = id1

    innerNode1 = item1.innerHTML
      .replace(anchorNode, `<span data-type='highlight' id='node-${root.innerHTML.length}' 
        data-color='mediumaquamarine' style='background-color: mediumaquamarine;'>${anchorNode}</span>`)


    /*
    *  const newHTML = item1.innerHTML.substring(0, selection.anchorOffset) + `<span data-type='highlight' id='node-${root.innerHTML.length}'
        data-color='mediumaquamarine' style='background-color: mediumaquamarine;'>${anchorNode}</span>` + item1.innerHTML.substring(selection.focusOffset, item1.innerHTML.length)
    * */

    /*
        timeoutId = setTimeout(() => {
          const item1 = document.getElementById(id1)
          item1.innerHTML = item1.innerHTML.replace(anchorNode, `<span id='node-${root.innerHTML.length}' style='background-color: yellowgreen;'>${anchorNode}</span>`)
        }, 300)*/

  } else {
    let anchorNode, focusNode, id1, id2

    if (selection.toString().length - (selection.anchorNode.length - selection.anchorOffset) < 0) {
      anchorNode = selection.focusNode.data?.substring(selection.focusOffset)

      id1 = findId(selection.focusNode)
      id2 = findId(selection.anchorNode)

      focusNode = selection.anchorNode.data?.substring(0, selection.focusOffset)?.trim()
    } else {
      anchorNode = selection.anchorNode.data?.substring(selection.anchorOffset)

      id1 = findId(selection.anchorNode)
      id2 = findId(selection.focusNode)

      focusNode = selection.focusNode.data?.substring(0, selection.focusOffset)?.trim()
    }


    console.log(anchorNode)
    console.log(focusNode)


    const item1 = document.getElementById(id1)
    const item2 = document.getElementById(id2)

    changeableId1 = id1
    changeableId2 = id2

    innerNode1 = item1.innerHTML
      .replace(anchorNode, `<span data-type='highlight' data-color='mediumaquamarine' 
        id='node-${root.innerHTML.length}' style='background-color: mediumaquamarine;'>${anchorNode}</span>`)

    innerNode2 = item2.innerHTML
      .replace(focusNode, `<span data-type='highlight' data-color='mediumaquamarine' 
        id='node-${root.innerHTML.length + 1}' style='background-color: mediumaquamarine;'>${focusNode}</span>`)
    /* .replace(anchorNode, `<span data-type='highlight' data-color='mediumaquamarine'
       id='node-${root.innerHTML.length}' style='background-color: mediumaquamarine;'>${anchorNode}</span>`)*/

    /*
        timeoutId = setTimeout(() => {
          const item1 = document.getElementById(id1)
          const item2 = document.getElementById(id2)

          item1.innerHTML = item1.innerHTML.replace(anchorNode, `<span  id='node-${root.innerHTML.length}' style='background-color: yellowgreen;'>${anchorNode}</span>`)
          item2.innerHTML = item2.innerHTML.replace(focusNode, `<span  id='node-${root.innerHTML.length + 1}' style='background-color: yellowgreen;'>${focusNode}</span>`)
        }, 1000)*/

  }

  modal.style.display = 'flex'
  modal.style.left = e.pageX + 'px'
  modal.style.top = e.pageY + 'px'
}

const text = `<div id=\\"node-0-0\\">\\n<div id=\\"bannerR\\"></div>\\n<div id=\\"Panes\\">\\n<div>\\n<h2>What is Lorem Ipsum?</h2>\\n<p><strong>Lorem Ipsum</strong> is <strong>simply</strong> <strong>dummy</strong> text of the printing and typesetting industry. Lorem Ipsum has been the</p>\\n<ol>\\n<li>industry's standard</li>\\n<li>dummy text ever since the</li>\\n<li><span style=\\"text-decoration: underline;\\">1500s, when an unknown </span></li>\\n<li><strong>printer took a galley of </strong></li>\\n<li>type and scrambled it to make a type specimen book.</li>\\n</ol>\\n<p>&nbsp;</p>\\n<p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\\n<div>\\n<div>\\n<h2>&nbsp;</h2>\\n<table style=\\"border-collapse: collapse; width: 100.041%;\\" border=\\"1\\">\\n<tbody>\\n<tr>\\n<td style=\\"width: 17.086%;\\">sadas dasd as</td>\\n<td style=\\"width: 17.086%;\\">as asdas dasd as</td>\\n<td style=\\"width: 17.086%;\\">qw eqe</td>\\n<td style=\\"width: 17.086%;\\">123 123 1</td>\\n<td style=\\"width: 17.0968%;\\">2ewd</td>\\n</tr>\\n<tr>\\n<td style=\\"width: 17.086%;\\">d asd asdas</td>\\n<td style=\\"width: 17.086%;\\">eqe</td>\\n<td style=\\"width: 17.086%;\\">&nbsp;asqeqwe q</td>\\n<td style=\\"width: 17.086%;\\">dsad as</td>\\n<td style=\\"width: 17.0968%;\\">asd as</td>\\n</tr>\\n<tr>\\n<td style=\\"width: 17.086%;\\">d as dsa</td>\\n<td style=\\"width: 17.086%;\\">d asd asd</td>\\n<td style=\\"width: 17.086%;\\">d as d</td>\\n<td style=\\"width: 17.086%;\\">as dasd&nbsp;</td>\\n<td style=\\"width: 17.0968%;\\">asd as&nbsp;</td>\\n</tr>\\n</tbody>\\n</table>\\n<p>&nbsp;😁😘🧐😌&nbsp;</p>\\n<p>₨&trade;₢&weierp;₩₺</p>\\n</div>\\n</div>\\n</div>\\n<div>\\n<h2>Why do we use it?</h2>\\n<p>It is a long established fact that a reader will be distracted by the readab<span style=\\"background-color: #843fa1;\\">le content of a p</span>age wh<span style=\\"background-color: #b96ad9;\\">en looking at its layout. T</span>he point of using Lorem Ipsum is that it has a more-or-less normal distribution of lett<span style=\\"color: #843fa1;\\">ers, as opposed to using '</span>Content here, content here', making it look like readable English. M<em><span style=\\"text-decoration: underline;\\">any desktop publishing package</span></em>s and web pag<span style=\\"text-decoration: underline;\\"><em><strong>e editors now use Lorem Ipsum as their default model text, and a search for&nbsp;</strong></em></span></p>\\n<p>&nbsp;</p>\\n<p>x<sup>2&nbsp; &nbsp; &nbsp;</sup>x<sub>2&nbsp;&nbsp;</sub></p>\\n<p>&nbsp;</p>\\n<p>&nbsp;</p>\\n</div>\\n</div>\\n</div>`
const splitet = text.replaceAll('&nbsp;', ' ').split('\\n')

const tags = ['<div', '<p', '<strong', '<ol', '<ul', '<li', '<table', '<td', '<tr', '<tbody', '<span', '<em', '<i', '<u', '<sub', '<sup', '<blockquote']

/*
const joined = splitet.map((tag, i) => {
  if (tag.startsWith('</')) {
    return tag
  }

  const index = tag.indexOf('>')
  const b = tag.substring(0, index)
  return (b + ` id='id-${i}'>` + tag.substring(index + 1)).replaceAll(`\\\"`, `"`)
})*/

const joined = splitet.map((str, index) => {

  const replacement = (tag, tagIndex) => (_, indexOfReplacerInTag) => {
    return `${tag} id='node-${index}-${tagIndex}-${indexOfReplacerInTag}'`
  }

  if (!str.includes('id=')) {
    tags.forEach((tag, i) => {
      if (!str.includes(tag)) return

      str = str.replaceAll(tag, replacement(tag, i))
    })
  }

  return str.replaceAll(`\\"`, `"`)
})

document.addEventListener('mouseup', onSelectionchange)

modal.addEventListener('click', (e) => {
  changeData(e.target.dataset.color)
})


root.innerHTML = joined.join('')