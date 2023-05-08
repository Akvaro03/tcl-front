const resetTablet = (tablaName) => {
    searchReplaceText("No rows", tablaName)
    searchReplaceText("Rows per page:", "Fila por pagina:")
    searchReplaceText("of", "de")
}

const searchReplaceText = (textToSearch, newText) => {
    const elementWithNoRows = document.querySelector(":root"); // busca en todo el DOM
    const textNodes = getTextNodesIn(elementWithNoRows); // obtiene todos los nodos de texto del elemento

    for (const textNode of textNodes) {
        if (textNode.nodeValue.includes(textToSearch)) { // verifica si el texto se encuentra en algún nodo
            textNode.nodeValue = textNode.nodeValue.replace(textToSearch, newText); // reemplaza el texto
        }
    }
};

const getTextNodesIn = (element) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];

    let node = walker.nextNode();
    while (node) {
      textNodes.push(node);
      node = walker.nextNode();
    }
    
    return textNodes;
};

export default resetTablet;