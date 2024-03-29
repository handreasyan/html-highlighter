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

  if (selection.anchorOffset === selection.focusOffset) return
  if (!selection.anchorNode.data.trim()) return;

  if (selection.anchorNode.data === selection.focusNode.data) {

    const anchorNode = selection.anchorNode.data.substring(Math.min(selection.anchorOffset, selection.focusOffset), Math.max(selection.anchorOffset, selection.focusOffset))

    const id1 = findId(selection.anchorNode)
    const item1 = document.getElementById(id1)
    changeableId1 = id1
    innerNode1 = item1.innerHTML
      .replace(anchorNode, `<span data-type='highlight' id='node-${root.innerHTML.length}' 
        data-color='mediumaquamarine' style='background-color: mediumaquamarine;'>${anchorNode}</span>`)


    /*
        timeoutId = setTimeout(() => {
          const item1 = document.getElementById(id1)
          item1.innerHTML = item1.innerHTML.replace(anchorNode, `<span id='node-${root.innerHTML.length}' style='background-color: yellowgreen;'>${anchorNode}</span>`)
        }, 300)*/

  } else {
    let anchorNode = selection.anchorNode.data.substring(selection.anchorOffset)

    let id1 = findId(selection.anchorNode)
    let id2 = findId(selection.focusNode)

    let focusNode = selection.focusNode.data.substring(0, selection.focusOffset).trim()

    if (selection.toString().length - (selection.anchorNode.length - selection.anchorOffset) < 0) {
      anchorNode = selection.focusNode.data.substring(selection.focusOffset)

      id1 = findId(selection.focusNode)
      id2 = findId(selection.anchorNode)

      focusNode = selection.anchorNode.data.substring(0, half).trim()
    }


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
      .replace(anchorNode, `<span data-type='highlight' data-color='mediumaquamarine'  
        id='node-${root.innerHTML.length}' style='background-color: mediumaquamarine;'>${anchorNode}</span>`)


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

const text = `<div id=\\"node-0-0\\">\\n<p id=\\"node-1-1\\"><strong id=\\"node-1-2\\">Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has</p>\\n<ol id=\\"node-2-3\\">\\n<li id=\\"node-3-5\\">been the industry's</li>\\n<li id=\\"node-4-5\\"><strong id=\\"node-4-2\\">standard dummy</strong></li>\\n<li id=\\"node-5-5\\">t<span id=\\"node-5-10\\">ext ever since the 1500s,</span></li>\\n<li id=\\"node-6-5\\"><span id=\\"node-6-10\\"><em id=\\"node-6-11\\"><strong id=\\"node-6-2\\">when an unknown printer took a</strong></em></span></li>\\n</ol>\\n<p id=\\"node-8-1\\">galley of type and scrambled it to make a type specimen book. It has survived not only</p>\\n<blockquote id=\\"node-9-16\\">\\n<p id=\\"node-10-1\\"><span id=\\"node-10-10\\"><em id=\\"node-10-11\\"><strong id=\\"node-10-2\\">#1 .</strong></em></span>&nbsp;<em>five c<span style="background-color: #f1c40f;">enturie</span>s, but also the leap into ele<span style=\\"color: #b96ad9;\\">ctronic</span></em></p>\\n<p id=\\"node-11-1\\"><span id=\\"node-11-10\\"><em id=\\"node-11-11\\"><span style=\\"color: #b96ad9;\\">typesetting, remaining essentially unchange</span>d. I</em></span></p>\\n</blockquote>\\n<p id=\\"node-13-1\\">t <span style=\\"background-color: #e03e2d; color: #ecf0f1;\\">was popularised i</span>n the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\\n<table id=\\"node-14-6\\" style=\\"width: 98.1888%;\\" border=\\"1\\">\\n<tbody id=\\"node-15-9\\">\\n<tr id=\\"node-16-8\\">\\n<td id=\\"node-17-7\\" style=\\"width: 35.1161%;\\">Table text 1</td>\\n<td id=\\"node-17-7\\" style=\\"width: 39.9265%;\\">Table text 2</td>\\n<td id=\\"node-17-7\\" style=\\"width: 24.5332%;\\">Table text 3</td>\\n</tr>\\n<tr id=\\"node-21-8\\">\\n<td id=\\"node-17-7\\" style=\\"width: 35.1161%;\\">Table text 4</td>\\n<td id=\\"node-17-7\\" style=\\"width: 39.9265%;\\">\\n<p>Table text 55555555</p>\\n<p>55555</p>\\n<p>555555</p>\\n<p>5555555</p>\\n</td>\\n<td id=\\"node-17-7\\" style=\\"width: 24.5332%;\\">Text 6</td>\\n</tr>\\n</tbody>\\n</table>\\n</div>\\n<div id=\\"node-29-0\\"></div>\\n<div id=\\"node-30-0\\">₳&permil;&para; &nbsp;😝😝🙂</div>\\n<div id=\\"node-31-0\\"></div>\\n<div id=\\"node-32-0\\"></div>\\n<div id=\\"node-33-0\\"><sup id=\\"node-33-15\\">x2&nbsp; y</sup><sub id=\\"node-33-14\\">2</sub></div>\\n<div id=\\"node-34-0\\">\\n<p>Mnemonic <strong>devices</strong> ar<strong>e one of the b</strong>est techn<em><span style=\\"text-decoration: line-through;\\">iques to en</span>g</em>age Kinesthetic Learners.</p>\\n</div>`
const splitet = text.split('\\n')

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

  tags.forEach((tag, i) => {

    if (str.includes(tag)) {
      str = str.replace(tag, `${tag} id='node-${index}-${i}'`).replaceAll(`\\"`, `"`)
    }

  })

  return str

})

document.addEventListener('mouseup', onSelectionchange)

modal.addEventListener('click', (e) => {
  changeData(e.target.dataset.color)
})


root.innerHTML = joined.join('')