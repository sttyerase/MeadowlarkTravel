/**
 * 
 */

var fortuneCookies = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
    "A friend asks only for your time not your money.",
    "Love thy neighbor, but don't get caught.",
    "A good way to stay healthy is to eat more Chinese food.",
    "To build a better world, start in your community.",
    "Your shoes will make you happy today.",
    "If you refuse to accept anything but the best, you very often get it.",
];

exports.getFortune = function() {
   var idx = Math.floor(Math.random() * fortuneCookies.length);
   return fortuneCookies[idx];
}

