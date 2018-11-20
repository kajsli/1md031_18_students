'use strict';
var socket = io();

function MenuItem(name, kcal, al, nuts, picture){
  this.name = name;
  this.kcal = kcal;
  this.allergies = al;
  this.nuts = nuts;
  this.picture = picture;
  this.namekcal = function(){
    return this.name
  };
  this.namekcal2 = function(){
    return this.name
  }
}

console.log("Hej");

var emp = new MenuItem('The worcestershire burger', '850 kcal', 'Innehåller gluten och laktos', 'Kan innehålla spår av nötter', 'https://www.readersdigest.ca/wp-content/uploads/sites/14/2015/11/gourmet-burger-1024x666.jpg');
var emp2 = new MenuItem('The beetroot burger', '780 kcal', 'Glutenfri och laktosfri', 'Kan innehålla spår av nötter', 'https://img.rasset.ie/000b76ef-800.jpg')
var emp3 = new MenuItem('The chickpea burger', '630 kcal', 'Innehåller gluten och laktos', 'Kan innehålla spår av nötter', 'https://realfood.tesco.com/media/images/RFO-1400x919-Spiced-chickpea-burgers-3d983a75-b6cf-4b53-92db-45a966a3f4d0-0-1400x919.jpg')
console.log(emp.namekcal());
console.log(emp2.namekcal2());

//menu = [emp, emp2, emp3]


var burgerOrdering = new Vue({
  el:'#contactDetails',
  data: {
    formDetails: [],
    pay: '',
    gender: '',
    burgerChoice: [],
    arbitraryVariableName: 'Välj en burgare',
    //items: menu,
    menu: food,
    orders: {},
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
      markDone: function() {
        console.log("Button clicked!")
          //Add some functionality
      },
      getNext: function () {
        var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
          return Math.max(last, next);
        }, 0);
        return lastOrder + 1;
      },
      addOrder: function (event) {
        console.log("clicked");
        var offset = {x: event.currentTarget.getBoundingClientRect().left,
                      y: event.currentTarget.getBoundingClientRect().top};
        socket.emit("addOrder", { orderId: this.getNext(),
                                  details: { x: event.clientX - 10 - offset.x,
                                             y: event.clientY - 10 - offset.y },
                                  orderItems: ["Beans", "Curry"]
                                });
      }
      //displayOrder: function (event) {
  //}
}
})
