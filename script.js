// for navbar items
function generateAndAssignIds() {
    // let tabItems = $(".tab-item");
    let navItems = $(".nav-item");
    for (let i = 0; i < navItems.length; i++) {
        let id = "Element-"+Math.round(Math.random() * 100000000);
        // tabItems.eq(i).attr("id", id);
        navItems.eq(i).attr("id", id);
    }
}
generateAndAssignIds();

// create tab items
function createTabItems() {
    let navItems = $(".nav-item");
    let tabItemsContainer = $(".tab-items");

    for (let i = 0; i < navItems.length; i++) {
        let tabItem = $(`<li id="${navItems[i].id}" class="tab-item">${navItems[i].textContent.trim()}</li>`);
        tabItemsContainer.append(tabItem);
    }

    $(".tab-item").first().addClass("active")
}
createTabItems();

function getTabItemIndex(elementId) {
    let elementIndex;
    $(".tab-item").each((index, element) => {
        if (elementId === element.id) {
            elementIndex = index;
        }
    })

    return elementIndex;
}

$(".tab-items").sortable({
    stop : function (event, ui) {
        let minIndex = 0;
        let maxIndex = $(".tab-item").length-1;

        let elementId = ui.item.attr("id");
        let curNavItemIndex = $(`.nav-item#${elementId}`).index();
        let tabElementIndex = getTabItemIndex(elementId);

        // let navElement = document.querySelector(`.nav-item#${elementId}`);
        // Or
        let navElement = $(`.nav-item#${elementId}`);
        let $newNavElement = navElement.clone();

        if (tabElementIndex == minIndex) {
            // document.querySelector(".nav-items").prepend(navElement);
            // Or
            $(".nav-items").prepend($newNavElement);
            navElement.remove();
            
        }
        else if (tabElementIndex == maxIndex) {
            // document.querySelector(".nav-items").append(navElement);
            // Or
            $(".nav-items").append($newNavElement);           
            navElement.remove();
        }
        else {
            // let offsetElement = document.querySelector(`.nav-item:nth-child(${tabElementIndex+1})`);
            // offsetElement.before(navElement);
            // Or
            let offsetElement;
            if (curNavItemIndex > tabElementIndex) {
                offsetElement = $(`.nav-item:nth-child(${tabElementIndex+1})`);
            } else if (curNavItemIndex <= tabElementIndex){
                offsetElement = $(`.nav-item:nth-child(${tabElementIndex+2})`);
            }
            offsetElement.before($newNavElement);
            navElement.remove();
        }
    }
})