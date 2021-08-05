window.addEventListener('DOMContentLoaded', () => {

  let pizzaOptions = {
    breadTypes: [
      {
        name: "Yupqa",
        price: 10000
      },
      {
        name: "Qalin",
        price: 10000
      },
      {
        name: "Buxanka",
        price: 7000
      }
    ],
    sizes: [
      {
        name: "Katta",
        size: 35,
        price: 45000
      },
      {
        name: "Kichik",
        size: 25,
        price: 25000
      },
      {
        name: "Oilaviy",
        size: 40,
        price: 50000
      },
      {
        name: "O'rtacha",
        size: 30,
        price: 30000
      }
    ],
    toppings: [
      {
        name: "Pomidor",
        price: 4000
      },
      {
        name: "Birnima",
        price: 1000
      },
      {
        name: "Tuzlangan bodring",
        price: 5000
      },
      {
        name: "Qazi",
        price: 15000
      },
      {
        name: "Kurka go'shti",
        price: 12000
      },
      {
        name: "Zaytun",
        price: 5000
      },
      {
        name: "Qo'ziqorin",
        price: 7000
      }
    ],
    addl: [
      {
        name: "Sosiska",
        price: 7000
      },
      {
        name: "qalampir",
        price: 5000
      },
      {
        name: "boshqa narsa",
        price: 4000
      }
    ]
  };
  let order = {};
  let price = 0;
  let breadPrice = 0;
  let sizePrice = 0;
  let addlPrice =0;

  var elPizzaSizeRadioTemplate = document.querySelector('.pizza-size-radio-template').content;
  var elPizzaToppingCheckboxTemplate = document.querySelector('.pizza-topping-checkbox-template').content;
  var toppingLi = document.querySelector('.toppings-li').content;

  var elPizzaForm = document.querySelector('.pizza-form');
  var elPizzaSizes = elPizzaForm.querySelector('.pizza-form__sizes');
  var elPizzaToppings = elPizzaForm.querySelector('.pizza-form__toppings');
  let select = document.querySelector('.pizza-form__field');
  let toppingsList = document.querySelector('.toppings')




  showPizzaToppings();
  showPizzaSizeRadios();



  function createSizeRadio(size) {
    var elSizeRadio = elPizzaSizeRadioTemplate.cloneNode(true);
    elSizeRadio.querySelector('.radio__input').value = size.size;
    elSizeRadio.querySelector('.radio__control').textContent = size.name + ' ' + size.size + ' ' + ' cm';
    return elSizeRadio;
  }

  function toppings(topping) {
    var elToppingClone = elPizzaToppingCheckboxTemplate.cloneNode(true);
    elToppingClone.querySelector(".checkbox__input").value = topping.name;
    elToppingClone.querySelector(".checkbox__control").textContent = topping.name;
    return elToppingClone;
  }




  function showPizzaSizeRadios() {
    var elSizeRadiosFragment = document.createDocumentFragment();
    pizzaOptions.sizes
      .slice()
      .sort(function (a, b) {
        return a.size - b.size;
      })
      .forEach(function (item) {
        elSizeRadiosFragment.appendChild(createSizeRadio(item))
      });
    elPizzaSizes.appendChild(elSizeRadiosFragment);
  }

  function showPizzaToppings() {
    var elShowPizza = document.createDocumentFragment();
    pizzaOptions.toppings
      .slice()
      .sort(function (a, b) {
        if (a.name > b.name) {
          return 1;

        }
        else if (a.name < b.name) {
          return -1;
        }
        return 0;
      })
      .forEach(function (item) {
        elShowPizza.appendChild(toppings(item))
      })
    elPizzaToppings.appendChild(elShowPizza)
  }

 



  var elsSizeRadio = document.querySelectorAll('.radio__input');
  if (elsSizeRadio.length > 0) {
    elsSizeRadio.forEach(function (radio) {
      radio.addEventListener('change', function () {
        order.size = pizzaOptions.sizes.find(size => size.size === Number(radio.value));
        document.querySelector('.pizza-form__size-result').textContent = `${order.size.name} ${order.size.size} cm`
        sizePrice=order.size.price
        document.querySelector('.pizza-form__all-costs').textContent=breadPrice+price+sizePrice+addlPrice
      });
    });
  }


  select.addEventListener('change', () => {

    order.breadTypes = pizzaOptions.breadTypes.find(breadTypes => breadTypes.name === select.value)
    document.querySelector('.pizza-form__bread-types-result').textContent = order.breadTypes.name;
    breadPrice=order.breadTypes.price
    document.querySelector('.pizza-form__all-costs').textContent=breadPrice+price+sizePrice+addlPrice
    
  })



  const arr = [];
  let elToppings = document.querySelectorAll('.checkbox__input');
  elToppings.forEach(item => {
    item.addEventListener('click', () => {
      if (item.checked) {
        order.topChecked = pizzaOptions.toppings.find(toppings => toppings.name === item.value)
        price += order.topChecked.price;
      }
      else if (!item.checked) {
        order.topChecked = pizzaOptions.toppings.find(toppings => toppings.name === item.value)
        price -= order.topChecked.price;
      }
      document.querySelector('.pizza-form__all-costs').textContent=breadPrice+price+sizePrice+addlPrice
    })
  })

  elToppings.forEach(item => {
    item.addEventListener('click', () => {

      if (arr.includes(item.value)) {
        const index = arr.findIndex(e => e === item.value)
        arr.splice(index, 1)
      }
      else {
        arr.push(item.value)
      }
      displayD(arr)
    })
  })
  function displayD(arry) {
    toppingsList.innerHTML = ""
    const frg = document.createDocumentFragment();

    arry.forEach(item => {
      let elT = toppingLi.cloneNode(true)
      elT.querySelector(`li`).textContent = item

      frg.appendChild(elT)
    })
    toppingsList.appendChild(frg);
  }
})







