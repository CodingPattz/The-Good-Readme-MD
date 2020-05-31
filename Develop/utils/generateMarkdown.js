const generateMarkdown = data => {
  // return JSON.stringify(data)
  return `
<a href="${data.link}" style="float:right"><img src="${data.avatar}" alt="${data.name}" title="${data.name}" width="120" height="120"></a>

# ${data.title.toUpperCase()}

![License: ${(data.lic) ? data.lic : 'None'}](https://img.shields.io/badge/License-${(data.lic) ? data.lic : 'None'}-orange)

_Repo by ${data.name}_

__${data.desc}__

---

__Project:__
${data.title}

__Description:__
${data.rmDesc}

#Installation
${data.inst}

__Usage:__
${data.use}

__License:__
${data.lic}

__Contributors:__
${data.con}

__Tests:__
${data.test}

__Questions:__
${data.qs}
`
}

module.exports = generateMarkdown