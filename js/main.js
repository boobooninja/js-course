var itemTemplate = $('#templates .item').html();

var newItemHtml = Robin.render(itemTemplate, {name: 'Dewberry', price: 0.15});
$('#store').append(newItemHtml);

var items = [
  { name: 'Coffee', price: 2.25 },
  { name: 'Juice', price: 3.50 },
  { name: 'Tea', price: 1.80 },
];

for (var i = 0; i < items.length; i++) {
  var newItemHtml = Robin.render(itemTemplate, items[i]);
  $('#store').append(newItemHtml);
}
