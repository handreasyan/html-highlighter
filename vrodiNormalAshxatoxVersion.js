const root = document.getElementById('root')
const modal = document.getElementById('modal')

let timeoutId
let selectedValues = []
let betweenNodes = []

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

const removeBetweenNodesHighlight = () => {
  const firstItem = selectedValues[1]
  const lastItem = selectedValues[0]

  const node = document.getElementById(firstItem.id)

  const arr = []
  const findNodes = (node) => {
    if (node === null) {
      return
    }
    if (node.nextSibling === lastItem.obshi) {
      return
    }

    arr.push(node)
    findNodes(node.nextSibling)
  }
  findNodes(node.firstChild)

  arr.forEach((item) => {
    if (item?.dataset?.type === 'highlight') {
      node.innerHTML = node.innerHTML.replace(item.outerHTML, item.innerHTML)
    }
  })
}


const findBetweenNodes = (obj, lastId) => {
  const next = obj.nextElementSibling
  if (obj.id === 'node-0-0') {
    return;
  }
  if (obj.parentNode.id === lastId) {
    return;
  }
  if (next?.id === lastId) {
    return;
  }
  if (next) {
    if (Array.from(next.childNodes).some(node => node.id === lastId)) {
      return;
    }

    findBetweenNodes(next, lastId)
    betweenNodes.push(next)
    return;
  }
  if (next === null) {
    findBetweenNodes(obj.parentNode, lastId)
  }
}


const changeData = (selectedColor) => {

  let isHasBetweenHighlightedNodes = false

  if (selectedValues[0]?.id === selectedValues[1]?.id) {
    removeBetweenNodesHighlight()
    isHasBetweenHighlightedNodes = true
  }

  selectedValues.forEach((select, i) => {
    if (isHasBetweenHighlightedNodes) {
      let span = getSpanContainer(selectedColor, select.mejtex)
      if (i === 0) {
        const str = select.skizb + span.replace('</span>', '') + select.verj
        const item = document.getElementById(select.id)

        item.innerHTML = item.innerHTML.replace(select.obshi, str)
      } else {
        const str = select.skizb + select.mejtex + '</span>' + select.verj
        const item = document.getElementById(select.id)

        item.innerHTML = item.innerHTML.replace(select.obshi, str)
      }

    } else {

      const str = select.skizb + getSpanContainer(selectedColor, select.mejtex) + select.verj
      const item = document.getElementById(select.id)

      item.innerHTML = item.innerHTML.replace(select.obshi, str)
    }


  })

  if (selectedValues.length > 1) {
    findBetweenNodes(document.getElementById(selectedValues[0].id), selectedValues[1].id)

    betweenNodes.forEach((node) => {
      const item = document.getElementById(node.id)
      item.innerHTML = getSpanContainer(selectedColor, item.innerHTML)
    })
  }

  selectedValues = []
  modal.style.display = 'none'
}


const onSelectionchange = (e) => {
  clearTimeout(timeoutId)


  const selection = document.getSelection()
  console.log(selection)

  if (!selection.toString()?.trim()) return;


  if (selection.anchorNode.data === selection.focusNode.data) {
    // if selected string has a one parent

    const id1 = findId(selection.anchorNode)
    selectedValues.push({
      id: id1,
      obshi: selection.anchorNode?.data,
      skizb: selection.anchorNode?.data?.substring(0, Math.min(selection.anchorOffset, selection.focusOffset)),
      mejtex: selection.anchorNode?.data?.substring(selection.anchorOffset, selection.focusOffset),
      verj: selection.anchorNode?.data?.substring(Math.max(selection.anchorOffset, selection.focusOffset)),
    })

  } else {
    // if selected string has a two or more parents

    const position = selection.anchorNode.compareDocumentPosition(selection.focusNode)
    if (!position && selection.anchorOffset > selection.focusOffset || position === Node.DOCUMENT_POSITION_PRECEDING) {

      // hakarak qashelu depq  ==============================
      selectedValues.push({
        id: findId(selection.focusNode),
        obshi: selection.focusNode?.data,
        skizb: selection.focusNode?.data?.substring(0, selection.focusOffset),
        mejtex: selection.focusNode?.data?.substring(selection.focusOffset),
        verj: '',
      })
      selectedValues.push({
        id: findId(selection.anchorNode),
        obshi: selection.anchorNode?.data,
        skizb: '',
        mejtex: selection.anchorNode?.data?.substring(0, selection.anchorOffset),
        verj: selection.anchorNode?.data?.substring(selection.anchorOffset),
      })


    } else {
      // uxix qashelu depq  ==============================
      selectedValues.push({
        id: findId(selection.anchorNode),
        obshi: selection.anchorNode?.data,
        skizb: selection.anchorNode?.data?.substring(0, selection.anchorOffset),
        mejtex: selection.anchorNode?.data?.substring(selection.anchorOffset),
        verj: '',
      })

      selectedValues.push({
        id: findId(selection.focusNode),
        obshi: selection.focusNode?.data,
        skizb: '',
        mejtex: selection.focusNode?.data?.substring(0, selection.focusOffset),
        verj: selection.focusNode?.data?.substring(selection.focusOffset),
      })

    }
  }

  modal.style.display = 'flex'
  modal.style.left = e.pageX + 'px'
  modal.style.top = e.pageY + 'px'
}

const text = `<div id=\\"node-0-0\\">\\n<div id=\\"bannerR\\"></div>\\n<div id=\\"Panes\\">\\n<div>\\n<h2>What is Lorem Ipsum?</h2>\\n<p><strong>Lorem Ipsum</strong> is <strong>simply</strong> <strong>dummy</strong> text of the printing and typesetting industry. Lorem Ipsum has been the</p>\\n<ol>\\n<li>industry's standard</li>\\n<li>dummy text ever since the</li>\\n<li><span style=\\"text-decoration: underline;\\">1500s, when an unknown </span></li>\\n<li><strong>printer took a galley of </strong></li>\\n<li>type and scrambled it to make a type specimen book.</li>\\n</ol>\\n<p>&nbsp;</p>\\n<p>Effective learning requires quality curriculum and instruction designed to meet students where they are.  Pop-Up School offers instructional content designed to facilitate the learning process by matching students’ learning styles with instructional content aligned with how students learn.  Each lesson is designed to support a specific subject area, (i.e., English Language Arts, Mathematics, Science, and Social Studies), meet state standards, reinforce learner outcomes, and match the learning style that works best for the individual student.  And, as students’ explore lessons, they will find PopUp School an effective way to learn, practice, and reinforce the concepts and skills they need to master.The purpose of this document is to outline expectations that contribute to quality instructional content in an online environment.  </p>\\n<div>\\n<div>\\n<h2>&nbsp;</h2>\\n<table style=\\"border-collapse: collapse; width: 100.041%;\\" border=\\"1\\">\\n<tbody>\\n<tr>\\n<td style=\\"width: 17.086%;\\">sadas dasd as</td>\\n<td style=\\"width: 17.086%;\\">as asdas dasd as</td>\\n<td style=\\"width: 17.086%;\\">qw eqe</td>\\n<td style=\\"width: 17.086%;\\">123 123 1</td>\\n<td style=\\"width: 17.0968%;\\">2ewd</td>\\n</tr>\\n<tr>\\n<td style=\\"width: 17.086%;\\">d asd asdas</td>\\n<td style=\\"width: 17.086%;\\">eqe</td>\\n<td style=\\"width: 17.086%;\\">&nbsp;asqeqwe q</td>\\n<td style=\\"width: 17.086%;\\">dsad as</td>\\n<td style=\\"width: 17.0968%;\\">asd as</td>\\n</tr>\\n<tr>\\n<td style=\\"width: 17.086%;\\">d as dsa</td>\\n<td style=\\"width: 17.086%;\\">d asd asd</td>\\n<td style=\\"width: 17.086%;\\">d as d</td>\\n<td style=\\"width: 17.086%;\\">as dasd&nbsp;</td>\\n<td style=\\"width: 17.0968%;\\">asd as&nbsp;</td>\\n</tr>\\n</tbody>\\n</table>\\n<p>&nbsp;😁😘🧐😌&nbsp;</p>\\n<p>₨&trade;₢&weierp;₩₺</p>\\n</div>\\n</div>\\n</div>\\n<div>\\n<h2>Why do we use it?</h2>\\n<p>It is a long established fact that a reader will be distracted by the readab<span style=\\"background-color: #843fa1;\\">le content of a p</span>age wh<span style=\\"background-color: #b96ad9;\\">en looking at its layout. T</span>he point of using Lorem Ipsum is that it has a more-or-less normal distribution of lett<span style=\\"color: #843fa1;\\">ers, as opposed to using '</span>Content here, content here', making it look like readable English. M<em><span style=\\"text-decoration: underline;\\">any desktop publishing package</span></em>s and web pag<span style=\\"text-decoration: underline;\\"><em><strong>e editors now use Lorem Ipsum as their default model text, and a search for&nbsp;</strong></em></span></p>\\n<p>&nbsp;</p>\\n<p>x<sup>2&nbsp; &nbsp; &nbsp;</sup>x<sub>2&nbsp;&nbsp;</sub></p>\\n<p>&nbsp;</p>\\n<p>&nbsp;</p>\\n</div>\\n</div>\\n</div>`
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

document.addEventListener('dblclick', (e) => {
  modal.style.display = 'none'
  selectedValues = []

  if (e.target.dataset.type === 'highlight') {
    document.getElementById(e.target.id)
    root.innerHTML = root.innerHTML.replace(e.target.outerHTML, e.target.innerHTML)
  }
})

root.innerHTML = joined.join('')