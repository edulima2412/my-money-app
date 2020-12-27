export function selectTab(tabId) {
    return {
        type: 'TAB_SELECTED',
        payload: tabId
    }
}

// Transforma os parametros em um array
export function showTabs(...tabIds) {
    const tabsToShow = {}
    // Cria um atributo no obj para cada elemento
    tabIds.forEach(e => tabsToShow[e] = true)
    return {
        type: 'TAB_SHOWED',
        payload: tabsToShow
    }
}