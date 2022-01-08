// normal ashxatuma , harkavora fixel ete ka ` <p> strrng ,span .... u text  </p>` , haskanal texty innerHTML ic

const root = document.getElementById('root')
const modal = document.getElementById('modal')

const spanClosingTagLength = '</span>'.length

let timeoutId

let changeableId1
let changeableId2

let innerNode1
let innerNode2

const getSpanContainer = (color, text) => {
  return `<span data-type='highlight' data-color=${color}
            id='node-${root.innerHTML.length}' style='background-color: ${color};'>${text}</span>`
}

const findId = (node) => {
  if (node.id) {
    return node.id
  }
  return findId(node.parentElement)
}

const changeData = (selectedColor) => {
  if (changeableId1 && innerNode1) {
    const elem = document.getElementById(changeableId1)
    const h = elem.innerHTML
    const t = elem.innerText
    console.log('innerNode1', innerNode1)
    console.log('item1', h)

    debugger
    const item1 = document.getElementById(changeableId1)
    item1.innerHTML = item1.innerHTML.replace(innerNode1, getSpanContainer(selectedColor, innerNode1))
  }

  if (changeableId2 && innerNode2) {
    console.log('innerNode2', innerNode2)
    console.log('item2', document.getElementById(changeableId2).innerHTML)


    const item2 = document.getElementById(changeableId2)
    item2.innerHTML = item2.innerHTML.replace(innerNode2, getSpanContainer(selectedColor, innerNode1))
  }


  innerNode1 = undefined
  changeableId1 = undefined
  innerNode2 = undefined
  changeableId2 = undefined

  modal.style.display = 'none'
}


const onSelectionchange = (e) => {
  clearTimeout(timeoutId)

  const selection = document.getSelection()
  console.log(selection)

  if (!selection.toString()?.trim()) return;

  if (selection.anchorNode.data === selection.focusNode.data) {

    const anchorNode = selection.anchorNode?.data?.substring(selection.anchorOffset, selection.focusOffset)
    const id1 = findId(selection.anchorNode)

    innerNode1 = anchorNode
    changeableId1 = id1


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


    innerNode1 = anchorNode
    innerNode2 = focusNode

    changeableId1 = id1
    changeableId2 = id2

  }

  modal.style.display = 'flex'
  modal.style.left = e.pageX + 'px'
  modal.style.top = e.pageY + 'px'
}

const text = `<div id=\\"node-0-0\\">\\n<div id=\\"bannerR\\"></div>\\n<div id=\\"Panes\\">\\n<div>\\n<h2>What is Lorem Ipsum?</h2>\\n<p><strong>Lorem Ipsum</strong> is <strong>simply</strong> <strong>dummy</strong> text of the printing and typesetting industry. Lorem Ipsum has been the</p>\\n<ol>\\n<li>industry's standard</li>\\n<li>dummy text ever since the</li>\\n<li><span style=\\"text-decoration: underline;\\">1500s, when an unknown </span></li>\\n<li><strong>printer took a galley of </strong></li>\\n<li>type and scrambled it to make a type specimen book.</li>\\n</ol>\\n<p>&nbsp;</p>\\n<p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\\n<div>\\n<div>\\n<h2>&nbsp;</h2>\\n<table style=\\"border-collapse: collapse; width: 100.041%;\\" border=\\"1\\">\\n<tbody>\\n<tr>\\n<td style=\\"width: 17.086%;\\">sadas dasd as</td>\\n<td style=\\"width: 17.086%;\\">as asdas dasd as</td>\\n<td style=\\"width: 17.086%;\\">qw eqe</td>\\n<td style=\\"width: 17.086%;\\">123 123 1</td>\\n<td style=\\"width: 17.0968%;\\">2ewd</td>\\n</tr>\\n<tr>\\n<td style=\\"width: 17.086%;\\">d asd asdas</td>\\n<td style=\\"width: 17.086%;\\">eqe</td>\\n<td style=\\"width: 17.086%;\\">&nbsp;asqeqwe q</td>\\n<td style=\\"width: 17.086%;\\">dsad as</td>\\n<td style=\\"width: 17.0968%;\\">asd as</td>\\n</tr>\\n<tr>\\n<td style=\\"width: 17.086%;\\">d as dsa</td>\\n<td style=\\"width: 17.086%;\\">d asd asd</td>\\n<td style=\\"width: 17.086%;\\">d as d</td>\\n<td style=\\"width: 17.086%;\\">as dasd&nbsp;</td>\\n<td style=\\"width: 17.0968%;\\">asd as&nbsp;</td>\\n</tr>\\n</tbody>\\n</table>\\n<p>&nbsp;😁😘🧐😌&nbsp;</p>\\n<p>₨&trade;₢&weierp;₩₺</p>\\n</div>\\n</div>\\n</div>\\n<div>\\n<h2>Why do we use it?</h2>\\n<p>It is a long established fact that a reader will be distracted by the readab<span style=\\"background-color: #843fa1;\\">le content of a p</span>age wh<span style=\\"background-color: #b96ad9;\\">en looking at its layout. T</span>he point of using Lorem Ipsum is that it has a more-or-less normal distribution of lett<span style=\\"color: #843fa1;\\">ers, as opposed to using '</span>Content here, content here', making it look like readable English. M<em><span style=\\"text-decoration: underline;\\">any desktop publishing package</span></em>s and web pag<span style=\\"text-decoration: underline;\\"><em><strong>e editors now use Lorem Ipsum as their default model text, and a search for&nbsp;</strong></em></span></p>\\n<p>&nbsp;</p>\\n<p>x<sup>2&nbsp; &nbsp; &nbsp;</sup>x<sub>2&nbsp;&nbsp;</sub></p>\\n<p>&nbsp;</p>\\n<p>&nbsp;</p>\\n</div>\\n</div>\\n</div>`
const splitet = text.replaceAll('&nbsp;', ' ').split('\\n')

const tags = ['<div', '<p', '<strong', '<ol', '<ul', '<li', '<table', '<td', '<tr', '<tbody', '<span', '<em', '<i', '<u', '<sub', '<sup', '<blockquote']

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