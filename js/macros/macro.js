var _macro = (function () {

  var macroconfig;
  var macrofiltered;
  var macros = {};
  var _app = "";
  var _el = "";
  var modalContainer = document.createElement("div");
  var randomId = `data-v-${Date.now()}-${Math.round(Math.random() * 100000000)}`.slice(0, 15);

  // Style for htmls..
  const STYLE = function ({ randomId, width, height }) {
    return `.macro-modal[${randomId}] {
    display: block;
    width: ${width || 96}%;
    max-width: 100%;
    height: ${height || 91}%;
    max-height: 100%;
    position: fixed;
    z-index: 100000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    box-shadow: 0 0 60px 10px rgba(0, 0, 0, 0.9);
    overflow: hidden;
  }
  .modal-overlay[${randomId}] {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;  
    background: rgba(0, 0, 0, 0.6);
  }
  .macro-modal-content[${randomId}] {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .macro-modal-body[${randomId}]{
    flex: 1 1 auto;
    padding: 2rem;
    overflow: hidden;
    overflow-y: auto;
  }
  .macro-modal[${randomId}] .close-button[${randomId}] {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 20px;
    border: 0;
    background: black;
    color: white;
    padding: 5px 10px;
    font-size: 1.3rem;
    color:#fff;
  }
  .macro-modal-header[${randomId}] {
    background: #070f63;
    color: #fff;
    border-radius: 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }
  .macro-modal-dialog[${randomId}]{
    display: flex;
    flex-direction: column;
    height: calc(100% - 5rem);
  }
  .macro-modal-content[${randomId}] h1 {
    margin: 0px 0px 5px 0;
  }
  #table-grid{
    overflow: hidden;
    overflow-x: auto;
  }
  .myForm[${randomId}] {
          display: grid;
          grid-template-columns: [labels] auto [controls] 1fr;
          grid-auto-flow: row;
          grid-gap: .8em;
          padding-bottom:1.5rem;
        }
        .myForm[${randomId}] > label[${randomId}]  {
              grid-column: labels;
            color: #3F51B5 !important;
            grid-row: auto;
            align-self: flex-end;
        }
        .myForm[${randomId}] > input[${randomId}],
        .myForm[${randomId}] > button[${randomId}] {
          grid-column: controls;
          grid-row: auto;
          padding: 0.9em;
        }
        .myForm[${randomId}] > input[${randomId}]{
          border: none;
          border-bottom: 2px solid #9677de;
        }
        .myForm[${randomId}] :focus {
          outline: none;
        }
        
        table[${randomId}]{
          border-collapse: collapse;
          width: 100%;
        }
        table[${randomId}] th, table[${randomId}] td {
          padding: 0.25rem;
          min-width: 100px;
          text-align: left;
          border: 1px solid #ccc;
        }
        table[${randomId}] tbody tr:nth-child(even) {
          background: #eee; 
        }
        .btn-primary {
          background-color: #1d1d77;          
          border-color: #1d1d77;
        }
        .btn-primary:hover {
          color: #fff;
          background-color: #286090;
          border-color: #204d74;
        } 
        .btn[${randomId}] {
          font-size: 14px;
          padding: 6px 12px;
          margin-bottom: 0;

          display: inline-block;
          text-decoration: none;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          background-image: none;
          border: 1px solid transparent;
      }
      .btn[${randomId}]:focus,
      .btn[${randomId}]:active:focus {
          outline: thin dotted;
          outline: 5px auto -webkit-focus-ring-color;
          outline-offset: -2px;
      }
      .btn[${randomId}]:hover,
      .btn[${randomId}]:focus {
          color: #333;
          text-decoration: none;
      }
      .btn[${randomId}]:active {
          background-image: none;
          outline: 0;
          -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
      }
      .btn-default[${randomId}] {
        color: #fff;
        background-color: #337ab7;
        border-color: #2e6da4;
      }
      .btn-default[${randomId}]:focus {
          color: #333;
          background-color: #e6e6e6;
          border-color: #8c8c8c;
      }
      .btn-default[${randomId}]:hover {
          color: #333;
          background-color: #e6e6e6;
          border-color: #adadad;
      }
      .btn-default[${randomId}]:active {
          color: #333;
          background-color: #e6e6e6;
          border-color: #adadad;
    }
  `;
  }

  const DomTemplateCreation = function (uniqueId) {
    if (!uniqueId) throw new Error("Argument uniqueId cannot be blank")
    this.randomId = uniqueId;
    const _this = this;

    this.addStyleSheet = function (style) {
      var sheet = document.createElement("style");
      sheet.setAttribute('type', "text/css");
      sheet.innerHTML = style;
      document.head.appendChild(sheet);
      return sheet;
    };

    this.addAttributes = function (elem, atts) {
      atts.forEach(function (attribute) {
        if (attribute.att === 'class') {
          elem.className = attribute.value;
        } else if (attribute.att.slice(0, 5) === 'data-') {
          elem.setAttribute(attribute.att, attribute.value || '');
        } else {
          elem[attribute.att] = attribute.value || '';
        }
      });
    };

    this.removeAttributes = function (elem, atts) {
      atts.forEach(function (attribute) {
        if (attribute.att === 'class') {
          elem.className = '';
        } else {
          elem.removeAttribute(attribute.att);
        }
      });
    };

    this.getAttributes = function (attributes) {
      // assign defuult attribute , random id
      attributes = [...attributes, ...[{ name: _this.randomId, value: _this.randomId }]];
      return Array.from(attributes).map(function (attribute) {
        return {
          att: attribute.name,
          value: attribute.value
        };
      });
    };

    this.makeElem = function (elem) {
      // Create the element
      var node = elem.type === 'text' ? document.createTextNode(elem.content) : document.createElement(elem.type);
      // Add attributes
      _this.addAttributes(node, elem.atts);
      // If the element has child nodes, create them
      // Otherwise, add textContent
      if (elem.children.length > 0) {
        elem.children.forEach(function (childElem) {
          node.appendChild(_this.makeElem(childElem));
        });
      } else if (elem.type !== 'text') {
        node.textContent = elem.content;
      }
      return node;
    }

    this.createDOMMap = function (element) {
      var map = [];
      Array.from(element.childNodes).forEach(function (node) {
        map.push({
          content: node.childNodes && node.childNodes.length > 0 ? null : node.textContent,
          atts: node.nodeType === 3 ? [] : _this.getAttributes(node.attributes),
          type: node.nodeType === 3 ? 'text' : node.tagName.toLowerCase(),
          children: _this.createDOMMap(node),
          node: node
        });
      });
      return map;
    };

    this.stringToHTML = function (html) {
      html = html.replace(/(^|>)[ \n\t]+/g, ">");
      var wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        body: [0, "", ""],
        _default: [1, "<div>", "</div>"]
      };
      wrapMap.optgroup = wrapMap.option;
      wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
      wrapMap.th = wrapMap.td;
      var match = /<\s*\w.*?>/g.exec(html);
      var element = document.createElement('div'), body = document.createElement('body');
      if (match != null) {
        var tag = match[0].replace(/</g, '').replace(/>/g, '').split(' ')[0];
        var map = wrapMap[tag] || wrapMap._default, element;
        html = map[1] + html + map[2];
        element.innerHTML = html;
        // Descend through wrappers to the right content
        var j = map[0] + 1;
        while (j--) element = element.lastChild;
      } else {
        element.innerHTML = html;
        element = element.lastChild;
      }
      body.appendChild(element);
      return body;
    };

    this.diffAtts = function (template, existing) {
      // Get attributes to remove
      var remove = existing.atts.filter(function (att) {
        var getAtt = template.atts.find(function (newAtt) {
          return att.att === newAtt.att;
        });
        return getAtt === undefined;
      });
      // Get attributes to change
      var change = template.atts.filter(function (att) {
        var getAtt = existing.atts.find(function (existingAtt) {
          return att.att === existingAtt.att;
        });
        return getAtt === undefined || getAtt.value !== att.value;
      });
      // Add/remove any required attributes
      _this.addAttributes(existing.node, change);
      _this.removeAttributes(existing.node, remove);

    };

    this.diff = function (templateMap, domMap, elem) {
      // If extra elements in domMap than, remove them
      var count = domMap.length - templateMap.length;
      if (count > 0) {
        for (; count > 0; count--) {
          domMap[domMap.length - count].node.remove();
        }
      }
      // Diff each item in the templateMap
      templateMap.forEach(function (node, index) {
        // If element doesn't exist, create it
        if (!domMap[index]) {
          elem.appendChild(_this.makeElem(templateMap[index]));
          return;
        }
        // If element is not the same type, replace it with new element
        if (templateMap[index].type !== domMap[index].type) {
          domMap[index].node.parentNode.replaceChild(_this.makeElem(templateMap[index]), domMap[index].node);
          return;
        }
        // If attributes are different, update them
        _this.diffAtts(templateMap[index], domMap[index], domMap[index].node);
        // If content is different, update it
        if (templateMap[index].content !== domMap[index].content) {
          domMap[index].node.textContent = templateMap[index].content;
        }
        // Repeat for child elements
        if (node.children.length > 0) {
          _this.diff(node.children, domMap[index].children || [], domMap[index].node);
        }
      });
    };

    this.addElem = function (template, elem) {
      var templateMap = _this.createDOMMap(_this.stringToHTML(template));
      templateMap.forEach(function (node, index) {
        elem.appendChild(_this.makeElem(templateMap[index]));
        return;
      });
    };

    this.render = function (template, elem) {
      var templateMap = _this.createDOMMap(_this.stringToHTML(template));
      var domMap = _this.createDOMMap(elem);
      _this.diff(templateMap, domMap, elem);
      // Return the ele
      return elem;
    };
  };

  const templateCreator = new DomTemplateCreation(randomId);

  function closeModal() {
    if (modalContainer) modalContainer.remove();
  };

  function openModal(options = {}) {

    // Modal Creation Start
    if (!openModal.isStyleLoaded) templateCreator.addStyleSheet(STYLE({ randomId, width: options.width, height: options.height }));
    openModal.isStyleLoaded = true;

    modalContainer.classList.add("modale-mask", "modale-custom");
    const template = `
    <div>
      <div class="modal-overlay" id="modal-overlay"></div>
      <div class="macro-modal" id="modal">
        <div class="macro-modal-header">
          <h4>${options.header || ""}</h4>
          <button class="close-button" id="macro-close-button">Close</button>
        </div>
        <div class="macro-modal-dialog">
          <div class="macro-modal-content">
            <div id="macro-content-modal" class="macro-modal-body"></div>
          </div>
        </div>
      </div>
    </div>
    `;

    const outputTemplate = templateCreator.render(template, modalContainer);
    document.body.appendChild(outputTemplate);
    const closeButton = document.getElementById("macro-close-button");
    closeButton.addEventListener("click", closeModal, { once: true });
    // Modal Creation End
    (function createForm() {
      options.template = options.template || "<div><div>Template is missing</div></div>";
      const modalContainer = document.getElementById("macro-content-modal");
      templateCreator.render(options.template, modalContainer);
    })();

    return {
      template,
      modalContainer,
    };

  }

  function getFormParams(formId) {
    const Elements = document.querySelectorAll(`#${formId} [data-param]`), object = {};
    Elements.forEach(function (el) {
      object[el.dataset.param] = el.value
    });
    return object;
  };

  function convertUnderScoreToSpace(str) {
    return str
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/^(.)/, function ($1) { return $1.toUpperCase(); })
  };

  function showTableData(jsondata, elementId) {
    const modalContainer = document.getElementById(elementId);
    var keys = Object.keys(jsondata[0]), thead = "", tbody = "";
    thead += "<tr>";
    thead = keys.reduce(function (accumalator, currentvale) {
      accumalator += `<th>${convertUnderScoreToSpace(currentvale)}</th>`;
      return accumalator;
    }, thead);
    thead += "</tr>";
    tbody = jsondata.reduce((accumalator, currentvale) => {
      accumalator += `<tr>`
      keys.reduce(function (acc, key) {
        accumalator += `<td>${currentvale[key]}</td>`;
        return acc
      }, accumalator);
      accumalator += `</tr>`;
      return accumalator
    }, tbody);

    let template = `
    <table class="zebra" id="table-grid">
      <thead>
          ${thead}
      </thead>
      <tbody id="table-tbody-macro">
          ${tbody}
      </tbody>
    </table>`;
    templateCreator.render(template, modalContainer);
  };

  //init the apps
  const init = async function (app, el) {
    _app = app; _el = el
    try {
      return macroconfig = (async function () {
        let macroPath = window.app_process === 'development' ? 'js/macros/macro.config.json' : '/macros/macro.config.json'
        var response = await fetch(macroPath);
        return new Promise(function (resolve) {
          resolve(response.json())
        })
      })()
    } catch (error) {
      console.error(`[MACRO]Initialisation failed ${error}`)
    }
  }

  //set filtered macro list and load jsfile
  const promise = async function (el) {
    return macroconfig.then(
      function (response) {
        return new Promise(async function (resolve) {
          let macro
          // If macro is already loaded, than no need to load js or filter macros
          if (Array.isArray(macrofiltered) && macrofiltered.length > 0)
            return resolve(macrofiltered)

          macrofiltered = response.macros.filter(function (m) {
            return (m.app == "" || m.app == _app) ? true : false;
          })

          console.log(`[MACRO]Filtered macros to be loaded for this app `, macrofiltered);

          if (macrofiltered.length == 0)
            return console.info(`[MACRO]No macros available for ${_app}`);

          for (var len = 0; len < macrofiltered.length; len++) {
            macro = macrofiltered[len];
            console.info(`[MACRO]loading macro ${macro.name}`)
            await loadJS(window.app_process === 'development' ? 'js/' + macro.jsfile : macro.jsfile)
          };
          if (el) setel(el);
          resolve(macrofiltered)
        })
      }
    )
  }


  //registers macros
  const register = function (appname, callback) {
    macros[appname] = callback;
  }
  //calls the macro
  const call = function (macroname, refobj) {
    try {
      if (macros[macroname]) {
        macros[macroname].call(refobj);
      }
    } catch (error) {
      console.error(`[MACRO]Callback for ${macroname} failed `, error)
    }

  }

  //reset the macros
  const reset = function () {
    macros = []; macroconfig = null; macrofiltered = null;
    init(_app, _el)
  }

  //list macros loaded
  const list = function () {
    return promise(_el)
  }

  //set the menu to the element
  const setel = function (el) {
    var domel = document.getElementById(el);
    if (domel) domel.addEventListener("click", showmenu);
    else console.error(`[MACRO]dom element not present for attaching menu`);

  }

  //shows the menu based on the app
  var showmenu = function () {
    console.info(`[MACRO]show menu called`)
  }
  //loads JS file
  const loadJS = function (src) {
    return new Promise(function (resolve, reject) {
      // if (document.querySelector(`head > script[src="${src}"]`) !== null)
      //     return resolve()
      const script = document.createElement("script")
      script.src = src
      script.async = true
      document.head.appendChild(script)
      script.onload = resolve
      script.onerror = reject
    })
  }

  const request = function (defaults) {
    return function (options) {
      options = Object.assign({}, defaults, options)
      let isBlob = (options.blob || false) && delete options.blob;
      return fetch(options.url, options)
        .then(function (response) {
          if (response.status === 401) {
            (location.href = "/", sessionStorage.clear())
          }
          if (isBlob)
            return response.blob()
          return response.json()
        })
    }
  }

  const callrequest = request({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'sessionid': sessionStorage.getItem("_ticket")
    }
  })

  return {
    init: init,
    register: register,
    call: call,
    list: list,
    reset: reset,
    callrequest,
    templateCreator,
    openModal,
    getFormParams,
    showTableData
  };
}
)()

