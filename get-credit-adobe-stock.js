// https://en.wikipedia.org/wiki/Bookmarklet
// https://skalman.github.io/UglifyJS-online/
// https://caiorss.github.io/bookmarklet-maker/
(async () => {

  var win = window.open('')
  if (!win) {
    window.alert('Veuillez désactiver le bloqueur de popup.')
    return
  }

  var title = `Crédit photo ${document.querySelector('#titleRenameContainer > p:nth-child(1)').innerText}`
  win.document.write(`<title>${title}</title><style>body{font-family:"TrebuchetMS",Arial,Helvetica,sans-serif;}table{border-collapse:collapse;width:100%;}td{border:1px solid #ddd;padding:8px;}tr:nth-child(even){background-color:#f2f2f2;}tr:hover{background-color:#ddd;}</style><h1>${title}</h1>`)

  var items = Array
    .from(document.querySelectorAll('div.search-result-cell:not([style*="none"])'))
    .map(e => ({ id: e.dataset.contentId, img: e.querySelector('a > img').src }))

  win.document.write(`<p>${items.length} images</p>`)

  var response = await fetch('/fr/Ajax/Library/getContents', {
    body: items.map(i => `content_ids[]=${i.id}`).join('&'),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest'
    },
    method: 'POST',
  })

  var data = await response.json()

  win.document.write('<table>')

  items.forEach((item, index) => {
    var file = data.files[item.id]
    win.document.write(`<tr><td>${index + 1}</td><td width="175"><img width="150"src="${item.img}"></td><td width="300">${file.author}/Adobestock</td><td>${file.title}</td></tr>`)
  })

  win.document.write('</table>')
})()
