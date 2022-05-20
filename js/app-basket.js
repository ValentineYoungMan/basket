function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();

function ibg() {

    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();

//----------------------------------------------


//menu burger
const iconMenu = document.querySelector('.menu-icon');
const menuBody = document.querySelector('.menu-body');

let unlock = true;


if (iconMenu) {
    
    iconMenu.addEventListener("click", function(e) {
        // document.body.classList.toggle('_lock')
        // iconMenu.classList.toggle('_active');
        // menuBody.classList.toggle('_active');
        

        if (unlock===true && !iconMenu.classList.contains('_active')){                         //menuBody.classList.contains('_active') && 
            menuBody.classList.add('top-active');
            document.body.classList.add('_lock')
            iconMenu.classList.add('_active');
            menuBody.classList.add('_active');
            animStart()
            unlock=false;
        } else if(unlock===false && iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock')
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
            animEnd()
            setTimeout(()=>{
            
                unlock=true;
                menuBody.classList.remove('top-active');
                
            }, 1200);
            
        }

    });
}

//------------------------------



const animItems = document.querySelectorAll('._anim-items');

function animStart() {
    if (animItems.length > 0) {
        for (let i = 0; i < animItems.length; i++) {
            let animItem = animItems[i];
            
            animItem.classList.add('_active2')
        }
    }
}

function animEnd() {
    if (animItems.length > 0) {
        for (let i = 0; i < animItems.length; i++) {
            let animItem = animItems[i];
            animItem.classList.remove('_active2')
        }
    }
}

//---------------------------------------------------------

const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

window.addEventListener("DOMContentLoaded", () => {
    if (animItems.length > 0) {
        for (let i = 0; i < animItems.length; i++) {
            let animItem = animItems[i];
            
            if (viewport_width > 767) {
                animItem.classList.add('_anim-initial')
            } else{
                animItem.classList.remove('_anim-initial')
            }
        }
    }
})

//------------------------------

let header = document.querySelector('.header');
let block2 = document.querySelector('.block2');
let body = document.querySelector('.body');

let scrollY1 = 0;

window.addEventListener('scroll', ()=>{

    let scrollY2 = window.pageYOffset;

     if(document.documentElement.scrollTop===0) {
            
        setTimeout(()=>{
            header.classList.remove('blackBackground')
        }, 300);

        scrollY1 = scrollY2    
    } else if (scrollY2 < scrollY1){
        header.classList.add('blackBackground')
        header.classList.remove('hide')
        scrollY1 = scrollY2 
    }else if(document.documentElement.scrollTop!==0){
        header.classList.add('hide')
        scrollY1 = scrollY2
    }
})
//------------------------------------

const stepperBtnUp = document.querySelectorAll('.plus');
const stepperBtnDown = document.querySelectorAll('.minus');
let stepperInput = document.querySelectorAll('.stepper-field-input');

function allowNumbersOnly(e) {
	var code = (e.which) ? e.which : e.keyCode;
	if (code > 31 && (code < 48 || code > 57)) {
			e.preventDefault();
	}
}

stepperInput.forEach(el => {
	let count = el.value;

    // заміна 0 на 1
	 el.addEventListener('keyup', (e) => {
		let self = e.currentTarget;

		if (self.value == '0') {
			self.value = 1;
		}
        disabledButton (count, el)
	});

     // заборона вводити букви і символи
	 el.addEventListener('keypress', (e) => {
		allowNumbersOnly(e);
	});

    //зміна ' ' на 1
	el.addEventListener('change', (e) => {
		let self = e.currentTarget;
	
		if (!self.value) {
			self.value = 1;
		}
	
		count = el.value;

        disabledButton (count, el)
	}); 
    el.addEventListener('blur', (e) => {
		let self = e.currentTarget;

		count = el.value;

		disabledButton (count, el)

	});

    el.closest('.block1-stepper-border').querySelector('.plus').addEventListener('click', (e) => {
		//e.preventDefault();
		 count = el.value;
		let self = e.currentTarget;
		count++;
		el.value = count;	
	
		disabledButton (count, el)
	});
    el.closest('.block1-stepper-border').querySelector('.minus').addEventListener('click', (e) => {
		//e.preventDefault();
		 count = el.value;
		let self = e.currentTarget;
		count--;
		el.value = count;

		disabledButton (count, el)
	
	});

})

function disabledButton (count, el) {
    if (count == 1) {
        el.closest('.block1-stepper-border').querySelector('.minus').classList.add('stepper-button--disabled');
    } else {
        el.closest('.block1-stepper-border').querySelector('.minus').classList.remove('stepper-button--disabled');
    }
}

//------------------------------------

let block1Item = document.querySelectorAll('.block1-item')

let stepperButton = document.querySelectorAll('.stepper-button');
let itemPrice = document.querySelector('block1-item-price span');

stepperButton.forEach(button => {
    button.addEventListener('click', (e) => {
        let item = e.target;

        let thisDataPrice = item.closest('.block1-item').dataset.price;
        let thisTotalPriceContainer = item.closest('.block1-item').querySelector('.block1-item-price>span')
        let thisTotalPrice = item.closest('.block1-item').querySelector('.block1-item-price>span').innerHTML
        let thisInputValue = item.closest('.block1-item-stepper').querySelector('.stepper-field-input').value

        thisTotalPrice = thisTotalPrice.slice(1)

        let newTotalPrice = (thisDataPrice * thisInputValue).toFixed(2);
    
        thisTotalPriceContainer.innerHTML = newTotalPrice + ' ' + 'грн.';
        createTotalPrice()
    })
})

//------------------------------------

let block2Sum = document.querySelector('.block2-sum')
let block1ItemPrices = document.querySelectorAll('.block1-item-price>span')


function createTotalPrice() {

    let calculateCount = 0;

    for(let i = 0; i < block1ItemPrices.length; i++) {
        let  block1ItemPrice = block1ItemPrices[i].innerHTML
        block1ItemPrice = Number.parseInt(block1ItemPrice).toFixed(2)

        block1ItemPrice = +block1ItemPrice
        block1ItemPrice = block1ItemPrice.toFixed(2)
        block1ItemPrice = +block1ItemPrice

        calculateCount += block1ItemPrice
        
    }
    calculateCount = calculateCount.toFixed(2)
    block2Sum.innerHTML =  calculateCount + ' ' + 'грн.'
}


createTotalPrice()

//-----------------------

let stepperFieldInput = document.querySelectorAll('.stepper-field-input')

stepperFieldInput.forEach( input => {

    input.addEventListener('keyup', (e) => {

        let thisDataPrice = input.closest('.block1-item').dataset.price;
        let thisTotalPriceContainer = input.closest('.block1-item').querySelector('.block1-item-price span')
        let self = e.target;
        let newTotalPrice = (thisDataPrice * self.value).toFixed(2);
        thisTotalPriceContainer.innerHTML = newTotalPrice + ' ' + 'грн.';
        createTotalPrice()
    })

    input.addEventListener('change', (e) => {

        let thisDataPrice = input.closest('.block1-item').dataset.price;
        let thisTotalPriceContainer = input.closest('.block1-item').querySelector('.block1-item-price span')
        let self = e.target;
        let newTotalPrice = (thisDataPrice * self.value).toFixed(2);
        thisTotalPriceContainer.innerHTML = newTotalPrice + ' ' + 'грн.';
        createTotalPrice()
    })
})
