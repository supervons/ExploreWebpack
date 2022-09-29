module.exports = function (source) {
    const template = source.split('vons-tmp')
    let script = (`
            let rootView = document.createElement("div");
            let parser=new DOMParser();//创建文档对象
            let XMLDoc=parser.parseFromString(${JSON.stringify(source)},'application/xml')
            rootView.innerHTML = XMLDoc.childNodes[0].textContent;
            setTimeout(()=>{document.body.appendChild(rootView)})
        `);
    return  script
}
